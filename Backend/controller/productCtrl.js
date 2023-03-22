const Product = require("../models/productModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const validateMongoDbId = require("../utils/validateMongodbId");

const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const id = req.params;
  validateMongoDbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updateProduct = await Product.findOneAndUpdate({ id }, req.body, {
      new: true,
    });
    res.json(updateProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params;
  validateMongoDbId(id);
  try {
    const deleteProduct = await Product.findOneAndDelete(id);
    res.json(deleteProduct);
  } catch (error) {
    throw new Error(error);
  }
});

//get a single product
const getaProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id)
  validateMongoDbId(id);
  try {
    const findProduct = await Product.findById(id)
      .populate("color") // populate the 'color' field
      .populate("size"); // populate the 'size' field
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});
const getAllProduct = asyncHandler(async (req, res) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));
     
    // Search
    if (req.query.search) {
      const searchQuery = req.query.search.trim(); // remove any leading or trailing whitespace
      const searchRegex = new RegExp(searchQuery, 'i');
      query = query.or([
        { brand: searchRegex },

     
         // add additional fields if necessary
        
      ]);
    }
    //filtering product between range \
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    if (minPrice && maxPrice) {
      query = query.where("price").gte(minPrice).lte(maxPrice);
    } else if (minPrice) {
      query = query.where("price").gte(minPrice);
    } else if (maxPrice) {
      query = query.where("price").lte(maxPrice);
    }


    if (req.query.stock && req.query.stock === 'available') {
      query = query.where('quantity').gt(0);
    } else if (req.query.stock && req.query.stock === 'outOfStock') {
      query = query.where('quantity').lte(0);
    }


    if (req.query.category) {
      const searchQuery = req.query.category.trim(); // remove any leading or trailing whitespace
      const searchRegex = new RegExp(searchQuery, 'i');
      query = query.or([
        { category: searchRegex },
      ]);
    }

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-rating");
    }

    // Limiting the fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // Pagination
    let page = req.query.page ? parseInt(req.query.page) : 1;
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let skip = (page - 1) * limit;
    
    // Apply pagination only when both page and limit are present
if (req.query.page && req.query.limit) {
  query = query.skip(skip).limit(limit);
}

    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) throw new Error("This Page does not exists");
     
    }
    let totalDocs = await Product.countDocuments();
    let totalPages = Math.ceil(totalDocs / limit);
    const products = await query
    res.json({products,pages:totalPages});
  } catch (error) {
    throw new Error(error);
  }
});

const addToWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.body;
  console.log(prodId)
  try {
    const user = await User.findById(_id);
    const alreadyadded = user.wishlist.find((id) => id.toString() === prodId);
    console.log(alreadyadded)
    if (alreadyadded) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      user.save();
      res.json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      user.save(); 
  res.json(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});





const rating = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, prodId, comment } = req.body;

  try {
    const product = await Product.findById(prodId);
    let alreadyRated = product.ratings.find(
      (userId) => userId.postedby.toString() === _id.toString()

    );
    if (alreadyRated) {
      const updateRating = await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { "ratings.$.star": star, "ratings.$.comment": comment },
        },
        {
          new: true,
        }
      );
    } else {
      const rateProduct = await Product.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedby: _id,
            },
          },
        },
        {
          new: true,
        }
      );
    }



    const getallratings = await Product.findById(prodId);
    let totalRating = getallratings.ratings.length;
    let ratingsum = getallratings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingsum / totalRating);
    let finalproduct = await Product.findByIdAndUpdate(
      prodId,
      {
        totalrating: actualRating,
      },
      { new: true }
    );
    res.json(finalproduct);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,

};
