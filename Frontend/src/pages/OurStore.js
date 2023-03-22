import React, { useState,useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import tab from "../images/tab.jpg"
import headphone from "../images/headphone.jpg"
import gr4 from "../images/gr4.svg"
import gr3 from "../images/gr3.svg"
import { useDispatch, useSelector } from "react-redux";
import { getProducts,setQueryParams } from "../features/product/productSlice";




export default function OurStore() {
  const [grid,setGrid]=useState(4)
  const [open, setOpen] = useState(false);
  const [productId, setproductId] = useState("");
  const [select, setSelect] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  const handleCheck1 = () => {
   
    setChecked1(!checked1);
    if(checked1){
      dispatch(setQueryParams({ param: "stock", value: 'outOfStock'}));
    }
    setChecked2(false);
    if(checked2){
      dispatch(setQueryParams({ param: "stock", value:"available"}));
    }
  }

  const handleCheck2 = () => {
    setChecked2(!checked2);
    setChecked1(false);
  }
  const pagelimit = useSelector((state) => state?.product?.pages);
  const handleItemClick = (item) => {
    setSelectedItem(item);
    dispatch(setQueryParams({ param: "category", value:item }));
  };

  const  handlenextPageClick=async()=> {
if(currentPage<pagelimit){
  setCurrentPage((prev)=>prev+1);
  dispatch(setQueryParams({ param: "page", value: currentPage }));
 await dispatch(setQueryParams({ param: "limit", value: 8 }));
}
   

  }
  const handlePriceFilterChange = (minPrice, maxPrice) => {
    if(minPrice){
      dispatch(setQueryParams({
        param: "minPrice",
        value: `${minPrice}`
      }));
    }
    if(maxPrice){
      dispatch(setQueryParams({
        param:"maxPrice",
        value:`${maxPrice}`
      }))
    }
   
   
  };
  const handlePriceChange = (event) => {
    const { name, value } = event.target;

    if (name === "minPrice") {
      setMinPrice(value);
    } else {
      setMaxPrice(value);
    }

    if (minPrice !== ""|| maxPrice !== "") {
      handlePriceFilterChange(minPrice, maxPrice);
    }
  };

  const handlePrevPageClick = async() => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      await dispatch(setQueryParams({ param: "page", value: currentPage }));
      await dispatch(setQueryParams({ param: "limit", value: 8 }));
    }
  };
  const handleSelect = (event) => {
    setSelect(event.target.value);
  };

  const showModal = (e) => {
    setOpen(true);
    setproductId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const query=useSelector(state=>state?.product.query)
  useEffect(() => {
    dispatch(setQueryParams({ param: "page", value: 1 }));
    dispatch(setQueryParams({ param: "limit", value: 8 }))
  
  }, [])
  useEffect(() => {
    
    dispatch(getProducts(query));
  }, [dispatch,query])

  const productState = useSelector((state) => state.product.products);


  let sortedProducts = [...productState];
  
 if (select === "AtoZ") {
    sortedProducts.sort((a,b)=> a.brand.localeCompare(b.brand));
  } else if (select === "ZtoA") {
    sortedProducts.sort((a,b)=> b.brand.localeCompare(a.brand));
  } else if (select === "lowtohigh") {
    sortedProducts.sort((a,b)=> a.price - b.price);
  } else if (select === "hightolow") {
    sortedProducts.sort((a,b)=> b.price - a.price);
  } 

  console.log(sortedProducts);



  return (
    <>
      <Meta title="Our Store"></Meta>
      <BreadCrumb title="Our Store" />
      <div className="store-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row d-flex flex-md-row">
            <div className="col-md-3 d-none d-md-block ">
              <div className="filter-card mb-3">
                <h3 className="filter-title">Shop by Category</h3>
                <div><ul>
                <li onClick={() => handleItemClick("Watch")}>Watch</li>
        <li onClick={() => handleItemClick("Tv")}>Tv</li>
        <li onClick={() => handleItemClick("Camera")}>Camera</li>
        <li onClick={() => handleItemClick("Laptop")}>Laptop</li>
                  </ul>
                  {selectedItem}
                </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Filter By</h3>
                <div>
                  <h5 className="sub-title">Availability</h5>
                  <div>
                    <div className="form-check">
                    <input 
        type="checkbox" 
        checked={checked1} 
        onChange={handleCheck1} 
      />
                      <label
                        className="form-check-label"
                        htmlFor="defaultCheck1"
                      >
                        In Stock
                      </label>
                    </div>
                    <div className="form-check">
                    <input 
        type="checkbox" 
        checked={checked2} 
        onChange={handleCheck2} 
        disabled={checked1}
      />
                      <label
                        className="form-check-label"
                        htmlFor="defaultCheck1"
                      >
                        Out of Stock
                      </label>
                    </div>
                  </div>

                  <h5 className="sub-title">Price</h5>
                  <div className="d-flex justify-content-center ">
                    <div className="form-floating ">
                    <input
        type="number"
        className="form-control"
        id="floatingInput"
        name="minPrice"
        placeholder="From"
        value={minPrice}
        onChange={handlePriceChange}
      />
                      <label htmlFor="floatingInput">From</label>
                    </div>
                    <div className="form-floating ">
                    <input
        type="number"
        className="form-control"
        id="floatingInput"
        name="maxPrice"
        placeholder="To"
        value={maxPrice}
        onChange={handlePriceChange}
      />
                      <label htmlFor="floatingInput">To</label>
                    </div>
                  </div>

                  {/* <h5 className="sub-title">Colors</h5>
                  <div>
                    <ul className="colors ps-0">
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                  </div> */}

                  {/* <h5 className="sub-title">Size</h5>
                  <div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="defaultCheck1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="defaultCheck1"
                      >
                        S(2)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="defaultCheck1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="defaultCheck1"
                      >
                        M(2)
                      </label>
                    </div>
                  </div> */}
                </div>
              </div>
              {/* <div className="filter-card mb-3">
                <h3 className="filter-title">Product Tags</h3>
                <div>
                  <div className="product-tags flex-wrap d-flex align-items-center gap-10">
                    <span className="badge rounded-3 bg-light text-secondary py-1 px-3">
                      HeadPhone
                    </span>
                    <span className="badge rounded-3 bg-light text-secondary py-1 px-3">
                      Laptop
                    </span>
                    <span className="badge rounded-3 bg-light text-secondary py-1 px-3">
                      Mobile
                    </span>
                    <span className="badge rounded-3 bg-light text-secondary py-1 px-3">
                      More
                    </span>
                  </div>
                </div>
              </div> */}
              {/* <div className="filter-card mb-3">
                <h3 className="filter-title">Random Product</h3>
                <div className="random-products ">
                  <div className="card mb-3 " style={{ maxWidth: "auto" }}>
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={headphone}
                          className="img-fluid rounded-start"
                          alt="Watch"
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">
                            Kids Headphone Bulk 10 Pack Multi Colored for
                            students
                          </h5>
                          <ReactStars
                            classNames="w-100 stars"
                            count={5}
                            size={25}
                            value={3}
                            edit={false}
                            activeColor="#ffd700"
                          />
                          <p className="price">₹150.00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card mb-3 " style={{ maxWidth: "auto" }}>
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={tab}
                          className="img-fluid rounded-start"
                          alt="Watch"
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">
                            Kids Headphone Bulk 10 Pack Multi Colored for
                            students
                          </h5>
                          <ReactStars
                            classNames="w-100 stars"
                            count={5}
                            size={25}
                            value={3}
                            edit={false}
                            activeColor="#ffd700"
                          />
                          <p className="price">₹150.00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
            <div className=" col--12 col-md-9 d-block">
              <div className="filter-sort-grid mb-3">
                <div className="row px- d-flex justify-content-between align-items-center">
                  <div className="col-md-4 d-flex flex-start justify-content-between align-items-center align-content-start mx-4 mx-md-2"  >
                  <p className="my-0">Sort By </p>
                  <select name="" value={select} onChange={handleSelect}  className="form-control form-select bg-light " id="" style={{width:"auto", border: "none"}} >
                    <option value="manual">Featured</option>
                    <option value="best-selling" selected>Best Selling</option>
                    <option value="AtoZ">Alphabatically, A-Z</option>
                    <option value="ZtoA">Alphabatically, Z-A</option>
                    <option value="lowtohigh">Price, Low to High</option>
                    <option value="hightolow">Price, High to Low</option>
                   
                  </select>
                  </div>
                
                </div>
              </div>

              <div className="product-list pb-5 d-flex flex-wrap flex-sm-nowrap ">
              
            <div className="row">  
    {sortedProducts.map((item, i) => {
      return (
   
          <ProductCard grid={item} className="col-3" />
      
      );
    })}
  
  </div>
                     
                     {/* // if(item.tags==='special'){return ( */}
{/* //   <ProductCard key={i} grid={item}/> */}
{/* // )}                    */}
                
                    
              </div>
            </div>
          </div>
        </div>
      </div>
     <div className="d-grid place-items-center justify-content-center m-4" >   

      <div className="d-flex align-items-center justify-content-between text-center" style={{width: "300px"}}> 
      <button onClick={handlePrevPageClick} className="button">prev</button>
<p style={{color:"blue", margin:0,}}>{currentPage}</p>
<button onClick={handlenextPageClick} className="button">next</button>

    </div>
</div>
    </>
  );
}
