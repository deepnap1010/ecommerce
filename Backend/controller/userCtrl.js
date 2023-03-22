const User = require("../models/userModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");
const uniqid = require("uniqid");
const Address = require("../models/AddressModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const validateMongoDbId = require("../utils/validateMongodbId");
const { generateRefreshToken } = require("../config/refreshtoken");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("./emailCtrl");

// Create a User ----------------------------------------------

const createUser = asyncHandler(async (req, res) => {
  /**
   * TODO:Get the email from req.body
   */
  console.log(req.body)
  const email = req.body.email;
  /**
   * TODO:With the help of email find the user exists or not
   */
  const findUser = await User.findOne({ email: email });

  if (!findUser) {
    /**
     * TODO:if user not found user create a new user
     */
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    /**
     * TODO:if user found then thow an error: User already exists
     */
    throw new Error("User Already Exists");
  }
});

// Login a user
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateuser = await User.findByIdAndUpdate(
      findUser.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
      role:findUser?.role
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

// admin login

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findAdmin = await User.findOne({ email });
  if (findAdmin.role !== "admin") throw new Error("Not Authorised");
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    const updateuser = await User.findByIdAndUpdate(
      findAdmin.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findAdmin?._id,
      firstname: findAdmin?.firstname,
      lastname: findAdmin?.lastname,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      token: generateToken(findAdmin?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

// handle refresh token

const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error(" No Refresh token present in db or not matched");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
});

// logout functionality

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); // forbidden
  }
  await User.findOneAndUpdate(refreshToken, {
    refreshToken: "",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204); // forbidden
});

// Update a user

const updatedUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

// save user Address

const saveAddress = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  console.log(req.body)
  console.log(_id)
  validateMongoDbId(_id);

  try {
    // Check if address already exists in Address schema
    const existingAddress = await Address.findOne(req.body);

    if (existingAddress) {
      // If address already exists, return error response
      return res
        .status(400)
        .json({ success: false, message: "Address already exists" });
    }

    // If address does not exist, create and save new address
    const newAddress = await Address.create(req.body);
    console.log(newAddress);

    // Check if address already exists in User's address array
    const user = await User.findById(_id);
    const existingUserAddress = user.address.find(
      (address) => address.toString() === newAddress._id.toString()
    );

    if (existingUserAddress) {
      // If address already exists in User's address array, return success response
      return res.json({ success: true, message: "Address saved successfully" });
    }

    // If address does not exist in User's address array, push it to the array
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        $push: { address: newAddress._id },
      },
      {
        new: true,
      }
    );
    res.json({ success: true, message: "Address saved successfully", user: updatedUser });
  } catch (error) {
    throw new Error(error);
  }
});


// Get all users
const getallUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find().populate("wishlist");
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

// Get a single user

const getaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const getaUser = await User.findById(id);
    res.json({
      getaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Get a single user

const deleteaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deleteaUser = await User.findByIdAndDelete(id);
    res.json({
      deleteaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const blockusr = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json(blockusr);
  } catch (error) {
    throw new Error(error);
  }
});

const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User UnBlocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongoDbId(_id);
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  } else {
    res.json(user);
  }
});

//Reset The Password
const forgetPasswordToken=asyncHandler(async(req,res)=>{
  const {email}=req.body;
  const user=await User.findOne({email});
  if(!user) throw new Error('User Not find with this Email');
  try{
   const token=await user.createPasswordResetToken()
   await user.save();
  const resetUrl=`Hi the link for reset password is valid for 10 minutes only<a href='http://localhost:3000/reset-password/${token}'>link</a>`
  const data={
      to:email,
      sunject:'password reset Link',
      text:'password reset link',
      html:resetUrl,

  }   
  sendEmail(data);
  res.json(token)

}catch(err){

  }
})



const resetPassword=asyncHandler(async(req,res)=>{
  const {password}=req.body;

  const token=req.params.token
  
  const hashToken=crypto.createHash("sha256").update(token).digest("hex");
  console.log(hashToken)
  const user=await User.findOne({
      passwordResetToken:hashToken,
      passwordResetExpire:{
          $gt:Date.now()
      },
  })

  if(!user) throw new Error('Token  Expired Please Try again')
  user.password=password;
  user.passwordResetToken=undefined
  user.passwordResetExpire=undefined
  await user.save();
  res.json(user);

})





// const resetPassword = asyncHandler(async (req, res) => {
//   const { password }=req.body;
//     const {token } = req.params;
//     console.log(typeof password,typeof token)
//   const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
//   const user = await User.findOne({
//     passwordResetToken: hashedToken,
//     passwordResetExpires: { $gt: Date.now() },
//   });
//   console.log(user)
//   if (!user) throw new Error(" Token Expired, Please try again later");
//   user.password = password;
//   user.passwordResetToken = undefined;
//   user.passwordResetExpires = undefined;
//   await user.save();
//   res.json(user);
// });

const getWishlist = asyncHandler(async (req, res, next) => {
  try {
    const { _id } = req.user;
    console.log(_id);
    const findUser = await User.findById(_id).populate("wishlist")
    console.log(findUser.wishlist)
    res.json(findUser.wishlist);
  } catch (error) {
    next(error);
  }
});


//delete the product frrom wishlist
const removeFromWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const  prodId= req.params.id;
try {
    const user = await User.findById(_id);
    const productIndex = user.wishlist.indexOf(prodId);
    if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found in wishlist" });
    }
     user.wishlist.splice(productIndex, 1);
    await user.save();
     res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});



const userCart = asyncHandler(async (req, res) => {
  
  const {cart}=req.body;

   console.log(cart)
  const { _id } = req.user;
  console.log(_id)
  validateMongoDbId(_id);
  const carta = new Cart({
    products: [
      {
        product:cart[0]._id,
        count: 1,
        color: "blue",
        price: 10.99,
      },
    ],
    cartTotal: 1.99,
    totalAfterDiscount: 9.99,
    orderby: _id,
  });
  
  // save the cart to the database
  carta.save((err, cart) => {
    if (err) {
      console.log("Error creating cart:", err);
    } else {
      console.log("Cart created successfully:", cart);
    }
 
  });
  const data =await User.findById(_id).select("cart").populate("Cart")
  console.log(data)
  
  // add products to an existing cart
  // Cart.findById(cart._id, (err, cart) => {
  //   if (err) {
  //     console.log("Error finding cart:", err);
  //   } else {
  //     console.log(cart.products)
  //     cart.cartTotal += 9.99;
  //     cart.totalAfterDiscount += 8.99;
  //     cart.save((err, cart) => {
  //       if (err) {
  //         console.log("Error adding products to cart:", err);
  //       } else {
  //         console.log("Products added to cart successfully:", cart);
  //       }
  //     });
  //   }
  // });
});

const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const cart = await Cart.find({ orderby: _id }).populate(
      "products.product"
    );
    console.log(cart)
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

const emptyCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const user = await User.findOne({ _id });
    const cart = await Cart.findOneAndRemove({ orderby: user._id });
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

const applyCoupon = asyncHandler(async (req, res) => {
  const { coupon } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  const validCoupon = await Coupon.findOne({ name: coupon });
  if (validCoupon === null) {
    throw new Error("Invalid Coupon");
  }
  const user = await User.findOne({ _id });
  let { cartTotal } = await Cart.findOne({
    orderby: user._id,
  }).populate("products.product");
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2);
  await Cart.findOneAndUpdate(
    { orderby: user._id },
    { totalAfterDiscount },
    { new: true }
  );
  res.json(totalAfterDiscount);
});

const createOrder = asyncHandler(async (req, res) => {
  const { COD, couponApplied } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    if (!COD) throw new Error("Create cash order failed");
    const user = await User.findById(_id);
    let userCart = await Cart.findOne({ orderby: user._id });
    let finalAmout = 0;
    if (couponApplied && userCart.totalAfterDiscount) {
      finalAmout = userCart.totalAfterDiscount;
    } else {
      finalAmout = userCart.cartTotal;
    }

    let newOrder = await new Order({
      products: userCart.products,
      paymentIntent: {
        id: uniqid(),
        method: "COD",
        amount: finalAmout,
        status: "Cash on Delivery",
        created: Date.now(),
        currency: "usd",
      },
      orderby: user._id,
      orderStatus: "Cash on Delivery",
    }).save();
    let update = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });
    const updated = await Product.bulkWrite(update, {});
    res.json({ message: "success" });
  } catch (error) {
    throw new Error(error);
  }
});

const getOrders = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const userorders = await Order.findOne({ orderby: _id })
      .populate("products.product")
      .populate("orderby")
      .exec();
    res.json(userorders);
  } catch (error) {
    throw new Error(error);
  }
});
const cartdeletebyId = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  validateMongoDbId(_id);
  try {
    const user = await User.findOne({ _id });
    const cart = await Cart.findById(req.params.id);
    console.log(cart)
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const alluserorders = await Order.find()
      .populate("products.product")
      .populate("orderby")
      .exec();
    res.json(alluserorders);
  } catch (error) {
    throw new Error(error);
  }
});
const getOrderByUserId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const userorders = await Order.findOne({ orderby: id })
      .populate("products.product")
      .populate("orderby")
      .exec();
    res.json(userorders);
  } catch (error) {
    throw new Error(error);
  }
});
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateOrderStatus = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
        paymentIntent: {
          status: status,
        },
      },
      { new: true }
    );
    res.json(updateOrderStatus);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgetPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus,
  getAllOrders,
  getOrderByUserId,
  cartdeletebyId,
  removeFromWishlist
};
