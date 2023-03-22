import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link, useLocation } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import { deletefromwishlist, getwishlist } from "../features/Wishlist/wishSlice";

export default function Wishlist() {
  let location = useLocation();
  const dispatch = useDispatch();
  const [product, setProduct] = useState([])

  // Use the useEffect hook to get the wishlist items on mount
  useEffect(() => {
    dispatch(getwishlist());
  }, [dispatch]);

  // Use the useSelector hook to get the wishlist items from the store
  const items = useSelector((state) => state.wishlist);

  // Use the useEffect hook to set the product state with the wishlist items
  useEffect(() => {
    setProduct(items);
  }, [items]);

  return (
    <>
      <Meta title="Wishlist" />
      <BreadCrumb title="Wishlist" />
      <div className="wishlist-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          {product.length === 0 ? (
            <p>Wishlist is empty.</p>
          ) : (
            // Wrap the map function inside a div tag
            <div>
              {/* {product.map((item, i) => (
                <div className="row" key={item._id}>
                  <div className="col-md-3">
                    <Link
                      to={`/product/${item._id}`}
                      className="card position-relative"
                      style={{ width: "100%" }}
                    >
                      <div className="row d-flex">
                        <div className="col-4 col-sm-6 col-md-12 ">
                          <Link to="#">
                            <RxCross2
                              className="heart-icon position-absolute"
                              onClick={(e) => {
                                dispatch(deletefromwishlist(item._id));
                              }}
                            />
                          </Link>
                          <img
                            src={item.images[0].url}
                            className="card-img-top img-fluid product-image"
                            alt="product image"
                          />
                        </div>
                        <div className="col-8 col-sm-6 col-md-12  ">
                          <div className="card-body px-4 ">
                            <h6>{item.title}</h6>
                            <p className="price mb-3">₹{item.price}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))} */}
            </div>
          )}
        </div>
      </div>
    </>
  );
}


{/* {hide &&  <div className="col-md-3">
              <Link
                className="card  position-relative "
                style={{ width: "100%" }}
              >
                <div className="row d-flex">
                  <div className="col-4 col-sm-6 col-md-12 ">
                    <Link>
                      <RxCross2 className="heart-icon position-absolute" onClick={(e)=>{
                        e.preventDefault();
                        setHide(!hide)
                      }} />
                    </Link>
                    <img
  src={images?.[0]?.url}
  className="card-img-top img-fluid product-image"
  alt="product image"
/>

                  </div>
                  <div className="col-8 col-sm-6 col-md-12  ">
                    <div className="card-body px-4 ">
                      <h6>
                        Honor T1 7.0 1 GB RAM 8 GB ROM 7 Inch With Wi-Fi+3G
                        Tablet
                      </h6>
                      <p className="price mb-3">₹150.00</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            } */}
            // {show && (
            //   <div className="col-md-3">
            //     <Link
            //       className="card  position-relative "
            //       style={{ width: "100%" }}
            //     >
            //       <div className="row d-flex">
            //         <div className="col-4 col-sm-6 col-md-12 ">
            //           <Link>
            //             <RxCross2
            //               className="heart-icon position-absolute"
            //               onClick={(e) => {
            //                 e.preventDefault();
            //                 setTimeout(()=>{
            //                   dispatch(deletefromwishlist('63f09ebde8df14163dc3d442'))
            //                 },10000)
                          
            //                 setShow(!show);
            //               }}
            //             />
            //           </Link>
            //           <img
            //             src={watch}
            //             className="card-img-top img-fluid product-image"
            //             alt="product image"
            //           />
            //         </div>
            //         <div className="col-8 col-sm-6 col-md-12  ">
            //           <div className="card-body px-4 ">
            //             <h6>{item[i].title}</h6>
            //             <p className="price mb-3">₹1000</p>
            //           </div>
            //         </div>
            //       </div>
            //     </Link>
            //   </div>
            // )}