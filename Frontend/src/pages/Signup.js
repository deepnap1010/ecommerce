
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb"
import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import  registration from "../features/auth/authServices"

  let schema = yup.object().shape({
    name: yup
    .string()
    .email("Name should be valid")
    .required("Name is Required"),
    email: yup
      .string()
      .email("Email should be valid")
      .required("Email is Required"),
      mobile: yup
      .string()
      .email("Mobile should be valid")
      .required("Mobile is Required"),
     password: yup.string().required("Password is Required"),
  });
  export default function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
      initialValues: {
        firstname:"",
        lastname:"",
        email: "",
        mobile:"",
        password: "",
      },
      validationSchema: schema,
      onSubmit: (values) => {

           dispatch(registration.registration(values))
      },
    });
    
    const authState = useSelector((state) => state);
  
    const { user, isError, isSuccess, isLoading, message } = authState.auth;
 
   console.log(isSuccess)
  
    useEffect(() => {
      if (isSuccess) {
        navigate("/");
      } else {
        navigate("");
      }
    }, [user, isError, isSuccess, isLoading]);

  return (
 <>
     <Meta title="Signup"></Meta>
      <BreadCrumb title="Signup" />
      <div className="Forget-password-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div class="row d-flex align-items-center justify-content-center">
          <div className=" card rounded-5 col-12 col-sm-6 col-md-4 mx-auto  p-4 mx-5">
              <h4 className='mb-3 mt-2 text-center'>Sign Up</h4>
              <form action="" onSubmit={formik.handleSubmit}>
               
              <div className="form-floating">
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
                <div className="form-floating">
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
               
                <div className="form-floating">
                <CustomInput
            type="email"
            label="email"
            id="email"
            name="email"
            onChng={formik.handleChange("email")}
            onBlr={formik.handleBlur("email")}
            val={formik.values.email}
          />
                </div>

                <div className="form-floating">
                <CustomInput
            type="number"
            label="mobile"
            id="mobile"
            name="mobile"
            onChng={formik.handleChange("mobile")}
            onBlr={formik.handleBlur("mobile")}
            val={formik.values.mobile}
          />
                </div>
               
                <div className="form-floating">
                <CustomInput
            type="password"
            label="password"
            id="pass"
            name="password"
            onChng={formik.handleChange("password")}
            onBlr={formik.handleBlur("password")}
            val={formik.values.password}
          />
                </div>
                <div className=' d-flex justify-content-center gap-30'>
            
                <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            style={{ background: "#ffd333" }}
            type="button"
            onClick={()=>{

           dispatch(registration.registration(formik.values));
         
      }
    
            
            }
          >
            Login
          </button>
        

          
            </div>
              </form>
             
            
             

          </div>
          </div>
        </div>
      </div>
 </>
  )
}

