import React ,{useEffect}from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch, BsArrowRepeat, BsHeart, BsCart3 } from "react-icons/bs";
import { HiOutlineUser } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import menu from "../images/menu.svg"
import { setQueryParams,getProducts } from "../features/product/productSlice";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const query= useSelector((state) => state?.product?.query);
  console.log(query)
  

  const handleSearchClick = () => {
   
    const inputValue = document.getElementById("search-input").value;
    if(inputValue.trim()!==''){
      navigate('/app/product');
      dispatch(setQueryParams({ param: "search", value: inputValue }));
      document.getElementById("search-input").value="";
    }
   
  };


  const handleKeyDown=(event)=>{
    if(event.keyCode===13){
      navigate('/app/product');
      handleSearchClick();
    }
  };
  // Call getProducts whenever the query parameter changes
  useEffect(() => {
    dispatch(getProducts(query));
  }, [dispatch,query]);

  










  const handleLoginClick = () => {
    navigate('/');
  };
  return (
    <>
      <header className="header-top-strip py-3 bg-primary">
        <div className="container-xxl">
          <div className="row p-2">
            <div className="col">
              <p className="text-white mb-0">
                Free Shipping Over ₹100 & Free Returns
              </p>
            </div>
            <div className="col">
              <p className="text-end text-white mb-0">
                Mobile No:
                <a className="text-white" href="tel:+91 8264954234">
                  +91 8264954234
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3 bg-warning">
        <div className="container-xxl ">
          <div className="row d-flex align-items-center p-2 justify-content-between">
            <div className="col-md-2 col-sm-4 d-flex flex-md-row justify-content-center align-items-center">
              <h4>
                <Link className="text-dark">Deepmart Shop</Link>
              </h4>
            </div>
            <div className="col-md-5 col-sm-8 mb-1">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Search Product Here..."
                  aria-label="Search Product Here..."
                  aria-describedby="basic-addon2"
                  id="search-input"
                  onKeyDown={handleKeyDown}
                
                />
              <span
  className="input-group-text p-3 bg-dark text-white"
  id="basic-addon2"
  onClick={handleSearchClick}
>
  <BsSearch className="fs-5" />
</span>
              </div>
            </div>
            <div className="col-md-5 d-flex justify-content-end">
              <div className="row d-flex align-items-center">
                <div className="col-6 col-sm-3 pt-2">
                  <Link to="/app/compare-products" className="header-link">
                    <BsArrowRepeat className="fs-2" />
                    <p className="mb-0">Compare Products</p>
                  </Link>
                </div>
                <div className="col-6 col-sm-3 pt-2">
                  <Link className="header-link" to="/app/wishlist">
                    <BsHeart className="fs-2" />
                    <p className="mb-0">Favorite Wishlist</p>
                  </Link>
                </div>
                <div className="col-6 col-sm-3 pt-2">
                  <div className="header-link">
                    <HiOutlineUser className="fs-2" />
                    <p className="mb-0" onClick={handleLoginClick} >Login My Account</p>
                  </div>
                </div>
                <div className="col-6 col-sm-3 pt-2 d-flex justify-content-center">
                  <Link className="d-flex align-items-center gap-10 text-white" to="/app/cart">
                    <BsCart3 className="fs-1 text-dark" />
                    <div className="d-flex flex-column gap-10 ">
                      {/* <span className="badge bg-dark text-white">0</span> */}
                 
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <header className="header-bottom py-3 ">
        <div className="container-xxl">
          <div className="row d-flex align-items-center">
            <div className="col-md-3">
              {/* <div className="dropdown ">
                <button
                  className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img src={menu} alt="" />
                  <span className="me-4  d-inline-block">Show Category</span>
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <Link className="dropdown-item text-white" href="#">
                      Action
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item text-white" href="#">
                      Another action
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item text-white" href="#">
                      Something else here
                    </Link>
                  </li>
                </ul>
              </div> */}
            </div>
            <div className="col-md-5 d-flex align-items-center justify-content-between  ">
              <NavLink className="menu-links text-white p-2" to="/app">
                Home
              </NavLink>
              <NavLink className="menu-links text-white p-2" to="/app/product">
                Our Stores
              </NavLink>
              <NavLink className="menu-links text-white p-2" to="/app/blogs">
                Blogs
              </NavLink>
              <NavLink className="menu-links text-white p-2" to="/app/contact">
                Contacts
              </NavLink>
            </div>
          </div>
        </div>
      </header>



    </>
  );
};

export default Header;
