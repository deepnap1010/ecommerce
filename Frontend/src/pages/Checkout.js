import React ,{useState,useEffect}from "react";
import { Link ,NavLink,useNavigate } from "react-router-dom";
import {BiArrowBack} from "react-icons/bi"
import watch from "../images/watch.jpg";
import CustomInput from "../components/CustomInput";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { address } from "../features/auth/authSlice";
import { getcart } from "../features/product cart/cartSlice";

const Checkout = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
      initialValues: {
        firstname:"",
        lastname:"",
        Address: "",
        Appartment:"",
        City: "",
        zipcode:""
      },

      onSubmit: (values) => {
        console.log(formik.values)
        let user=values;
        console.log(address.address(values))
        address.address(user)
     
      },
    }); 
    
    const authState = useSelector((state) => state);
  
    const { user, isError, isSuccess, isLoading, message } = authState.auth;

   
  
    useEffect(() => {
      if (isSuccess) {
        navigate("/app/checkout");
      } else {
        navigate("");
      }
    }, [user, isError, isSuccess, isLoading]);


    //
   

    useEffect(() => {
        dispatch(getcart());
      }, [dispatch]);
      
      const Items = useSelector((state) => state.cart.cart);

 
      const cart= Items.map(item => {
        return {
          cartTotal: item.cartTotal,
          count: item.products[0].count,
          price: item.products[0].price,
          brand: item.products[0].product.brand,
          title:item.products[0].product.title,
          url: item.products[0].product.images[0].url
        };
      });
      
      console.log(cart);
const size=Items.length
const cart_size={
cart_size:size
}
 //

  return (
    <>
      <div className="checkout-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-md-7 mb-5 mb-sm-0">
              <div className="chekcout-left-data">
                <h2 className="website-name">Deepnap</h2>
                <nav
                  style={{ "--bs-breadcrumb-divider": ">" }}
                  aria-label="breadcrumb"
                >
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link className="text-dark total-price" to="/cart">
                        Cart
                      </Link>
                    </li>
                    &nbsp; /&nbsp;
                    <li
                      className="breadcrumb-ite total-price active"
                      aria-current="page"
                    >
                      Information
                    </li>
                    &nbsp; /
                    <li className="breadcrumb-item total-price active">
                      Shipping
                    </li>
                    &nbsp; /
                    <li
                      className="breadcrumb-item total-price active"
                      aria-current="page"
                    >
                      Payment
                    </li>
                  </ol>
                </nav>
                <h4 className="title">Contact Information</h4>
                <p className="user-details">
                  Navdeep Dahiya (monud0123@gmail.com)
                </p>
                <div>
                <form
                  action=""
                  className="d-flex gap-15 flex-wrap justify-content-between"
                  onSubmit={formik.handleSubmit}>
                <div className="w-100">
               

                </div>
                
                  <div className="flex-grow-1">
                  <CustomInput
                 type="text"
                 label="firstname"
                 id="namew"
                 name="firstname"
                 onChng={formik.handleChange("firstname")}
                 onBlr={formik.handleBlur("firstname")}
                 val={formik.values.firstname}
          />
                  </div>
                  <div className="flex-grow-1">
                  <CustomInput
            type="text"
            label="lastname"
            id="namew"
            name="lastname"
            onChng={formik.handleChange("lastname")}
            onBlr={formik.handleBlur("lastname")}
            val={formik.values.lastname}
          />
                  </div>
                  <div className="w-100">
                  <CustomInput
            type="text"
            label="Address"
            id="Address"
            name="Address"
            onChng={formik.handleChange("Address")}
            onBlr={formik.handleBlur("Address")}
            val={formik.values.Address}
          />
                  </div>
                  <div className="w-100">
                  <CustomInput
            type="text"
            label="Appartment"
            id="Appartment"
            name="Appartment"
            onChng={formik.handleChange("Appartment")}
            onBlr={formik.handleBlur("Appartment")}
            val={formik.values.Appartment}
          />
                  </div>
                  <div className="flex-grow-1">
                  <CustomInput
            type="text"
            label="City"
            id="City"
            name="City"
            onChng={formik.handleChange("City")}
            onBlr={formik.handleBlur("City")}
            val={formik.values.City}
          />
                  </div>
                  
                  <div className="flex-grow-1">
                  <CustomInput
            type="number"
            label="zipcode"
            id="zipcode"
            name="zipcode"
            onChng={formik.handleChange("zipcode")}
            onBlr={formik.handleBlur("zipcode")}
            val={formik.values.zipcode}
          />
                  </div>
                  <div className="w-100">
                    <div className="d-flex align-items-center justify-content-between">
                    <Link className="text-dark total-price" to="/app/cart">
                        <BiArrowBack className="me-2"/>Return to Cart
                      </Link>
                      <div className=" button" type="submit" onClick={()=>{
           console.log(formik.values)
                           dispatch(address(formik.values));
           address(formik.values)
      }
    
            
            }>
                            <NavLink className="menu-links text-white p-2" to="/app/payments">Continue to Shopping</NavLink> 
                      </div>
                    </div>
                  </div>
                </form>
                </div>
            
              </div>
            </div>
            {  cart.map((items,i)=>(
            <div className="col-md-5">
                    <div className="border-bottom py-4">
              <div className="d-flex gap-10 mb-2 align-align-items-center">
                <div className="w-75 d-flex gap-10">
                  <div className="w-25 position-relative">
                    <span
                      style={{ top: "-10px", right: "2px" }}
                      className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                    >
                      {items.count}
                    </span>
                    <img className="img-fluid" src={items.url} alt="product" />
                  </div>
                  <div>
                    <h5 className="total-price">{items.brand}</h5>
                    {/* <p className="total-price">s / #agfgfd</p> */}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h5 className="total">{items.price}</h5>
                </div>
              </div>
            </div>
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Subtotal</p>
                <p className="total-price">{items.cartTotal}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Shipping</p>
                <p className="mb-0 total-price">{items.cartTotal}</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bootom py-4">
              <h4 className="total">Total</h4>
              <h5 className="total-price">{items.cartTotal}</h5>
            </div>
            </div>
            ))}
            
          </div>
            </div>
          </div>
   
    </>
  );
};

export default Checkout;
