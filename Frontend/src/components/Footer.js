import React from "react";
import { BsGithub, BsInstagram, BsLinkedin, BsYoutube } from "react-icons/bs";
import { Link } from "react-router-dom";
import newsletter from "../images/newsletter.png";
const Footer = () => {
  return (
    <>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row d-flex align-items-center p-2 justify-content-between">
            <div className="col-md-5 col-sm-6 d-flex flex-md-row justify-content-center align-items-center mb-3">
              <div className="footer-top-data d-flex gap-30 align-items-center">
                <img
                  src={newsletter}
                  alt="newsletter"
                  className="mr-3"
                />
                <h3 className="mb-0 text-white">Sign Up for Now</h3>
              </div>
            </div>
            <div className="col-md-7  col-sm-6 d-flex flex-md-row justify-content-center align-items-center mb-3">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Your Email Address"
                  aria-label="Your Email Address"
                  aria-describedby="basic-addon2"
                />
                 <span className="input-group-text p-2" id="basic-addon2">
                  Subscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <footer className=" pt-4">
        <div className="container-xxl">
          <div className="row d-flex flex-md-row">
            <div className="col-sm-4 mb-4"> 
              <h5 className="text-white mb-3">Contact Us</h5>
              <div>
                <address className="text-white fs-6 lh-3">
                5E/12BP, Block E, New Industrial Twp 5 <br /> New Industrial Twp, Faridabad <br /> Haryana 121001
                </address>
                <a href="tel:+91 8264954234" className="mt-3 d-block mb-3 text-white">
                +91 8264954234
                </a>
                <a href="mailto:dssharma@gmail.com" className="mt-2 d-block mb-3 text-white" >
                  Deepnapsoftech@gmail.com
                </a>
                <div className="social-icons d-flex align-items-center gap-30 mt-4">
                  <a className="text-white" href="#">
                    <BsLinkedin className="fs-4"/>
                  </a>
                  <a className="text-white" href="#">
                    <BsInstagram className="fs-4"/>
                  </a>
                  <a className="text-white" href="#">
                    <BsGithub className="fs-4"/>
                  </a>
                  <a className="text-white" href="#">
                   <BsYoutube className="fs-4"/>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-sm-3 mb-4">
              <h5 className="text-white mb-3">Information </h5>
              <div className="footer-links d-flex flex-column">
                <Link to="/app/privacy-policy" className="text-white py-sm-2  mb-1">Privacy Policy</Link>
                <Link to="/app/refund-policy" className="text-white py-sm-2  mb-1">Refund Policy</Link>
                <Link to="/app/shipping-policy" className="text-white py-sm-2  mb-1">Shipping policy</Link>
                <Link to="/app/term-conditions" className="text-white py-sm-2  mb-1">Terms & Conditions</Link>
                <Link to="/app/blogs" className="text-white py-sm-2  mb-1">Blogs</Link>
              </div>
            </div>
            <div className="col-sm-3 mb-3">
              <h5 className="text-white mb-4">Account</h5>
              <div className="footer-links d-flex flex-column">
                <Link to="" className="text-white py-sm-2  mb-1">About us</Link>
                <Link to="" className="text-white py-sm-2  mb-1">FAQ</Link>
                <Link to="" className="text-white py-sm-2  mb-1">Contact us</Link>
              </div>
            </div>
            <div className="col-sm-2 mb-3">
              <h5 className="text-white mb-4">Account Links</h5>
              <div className="footer-links d-flex flex-column">
                <Link className="text-white py-sm-2  mb-1">Laptops</Link>
                <Link className="text-white py-sm-2  mb-1">Headphones</Link>
                <Link className="text-white py-sm-2  mb-1">Tablets</Link>
                <Link className="text-white py-sm-2  mb-1">Watch</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="text-center mb-0 text-white">
                &copy; {new Date().getFullYear()}; Powered by Deepnap Softech
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
