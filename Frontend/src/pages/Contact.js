import React from "react";
import { Link } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import {ImHome} from "react-icons/im"
import { BsTelephoneFill } from "react-icons/bs";
import {MdEmail} from "react-icons/md"
import {BsInfoLg} from "react-icons/bs"
const Contact = () => {
  return (
    <>
      <Meta title="Contact"></Meta>
      <BreadCrumb title="Contacts" />
      <div className="contact-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row mb-5">
            <div className="col-12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.850307736681!2d77.30221421524634!3d28.393588882512635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdd9d6a8c4dc9%3A0x749fc733a5c15f59!2sDeepnap%20Softech!5e0!3m2!1sen!2sin!4v1676034171392!5m2!1sen!2sin"
                width="600"
                height="450"
                className="border-0 w-100"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          <div className="row bg-white">
            <div className="col-md-6 p-4">
              <h3 className="mb-3">Contact </h3>
              <form action="" className="d-flex flex-column justify-content-around gap-15 mb-4">
                <div className="form-floating">
                <input
                  type="text"
                  className="form-control bg-light border-0 text-dark"
                  placeholder="Name"
                  aria-label="Name"
                  id="name"
                ></input>
                  <label for="name">Name</label>
                </div>
               
                <div className="form-floating">
                <input
                  type="text"
                  className="form-control bg-light border-0 text-dark"
                  placeholder="Email"
                  aria-label="Email"
                  id="Email"
                ></input>
                  <label for="Email">Email</label>
                </div>
                <div className="form-floating">
                <input
                  type="text"
                  className="form-control bg-light border-0 text-dark"
                  placeholder="Contact Number"
                  aria-label="Contact Number"
                  id="Contact Number"
                ></input>
                  <label for="Contact Number">Contact Number</label>
                </div>
                <div className="form-floating">
                <textarea className="form-control bg-light border-0 text-dark" id="Address"  placeholder="Address" rows="5">
                </textarea>
                <label for="Address">Address</label>
                </div>
              
              
              </form>
              <Link to="/" className="button ">
              SUBMIT
            </Link>
            </div>

            <div className="col-md-6 p-4 ">

            <h3 className="mb-3">Get In Touch  With Us</h3>
            <div className="d-flex flex-column  gap-15">



            <div className="d-flex gap-30">
            <ImHome className="fs-4 "/>
            <div className="text-wrap">
            <p className="ml-2 " >
            5E/12BP, Block E, New Industrial <br />   Twp 5,  New Industrial Twp, <br />Faridabad, Haryana 121001
            </p>
            </div>
           
            </div>
            <div className="d-flex gap-30 ">
            <BsTelephoneFill className="fs-4 "/>
            <span className="ml-2">
            +91 8264954234
            </span>
            </div>
            <div className="d-flex gap-30 ">
            <MdEmail className="fs-4 "/>
            <span className="ml-2">
            Deepnapsoftech@gmail.com
            </span>
            </div>
            <div className="d-flex gap-30 ">
            <BsInfoLg className="fs-4 "/>
            <span className="ml-2">
           Monday-Saturday, 10AM - 8PM
            </span>
            </div>
            </div>
            

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
