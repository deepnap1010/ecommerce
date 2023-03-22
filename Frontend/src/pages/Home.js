import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { TbTruckDelivery } from "react-icons/tb";
import { FiGift } from "react-icons/fi";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { CiDiscount1 } from "react-icons/ci";
import { BsFillCreditCardFill } from "react-icons/bs";
import BlogCards from "../components/BlogCards";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";
import FamousProduct from "../components/FamousProduct";
import mainbanner1 from "../images/main-banner-1.jpg";
import mainbanner from "../images/main-banner.jpg";
import catbanner1 from "../images/catbanner-01.jpg";
import catbanner2 from "../images/catbanner-02.jpg";
import catbanner3 from "../images/catbanner-03.jpg";
import catbanner4 from "../images/catbanner-04.jpg";
import camera from "../images/camera.jpg";
import tv from "../images/tv.jpg";
import headphone from "../images/headphone.jpg";
import brand1 from "../images/brand-01.png";
import brand2 from "../images/brand-02.png";
import brand3 from "../images/brand-03.png";
import brand4 from "../images/brand-04.png";
import brand5 from "../images/brand-05.png";
import brand6 from "../images/brand-06.png";
import brand7 from "../images/brand-07.png";
import brand8 from "../images/brand-08.png";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";

import { getProducts } from "../features/product/productSlice";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [productId, setproductId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setproductId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const productState = useSelector((state) => state.product.products);


  const settings = {
    dots: false,
    infinite: true,
    lazyLoad: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1000,
    autoplaySpeed: 2000,
    
  };

 
  return (
    <>
      <Container class1="home-wrapper-1 py-5">
        <div className="row ">
          <div className="col-12 col-md-6 col-sm-12 mb-2 position-relative">
        
  <Slider {...settings} autoplay={true}>
    <div>
<Link to="/app/product" className="position-relative">
        <img
          src={mainbanner1}
          className="img-fluid position-relative"
          alt="main-banner"
        />
        <div className="position-relative banner-data">
        <h4>SUPERCHARGED FOR PROS.</h4>
        <h1>iPad S13+ Pro</h1>
        <p>From ₹12000 or ₹1000/mo.</p>
        <Link className="button">BUY NOW</Link>
        </div>
        
        </Link>
    </div>
  
   <div>
     <Link to="/app/product" className="position-relative">
        <img
          src={mainbanner}
          className="img-fluid position-relative"
          alt="main-banner"
        />
        <div className="position-absolute banner-data">
        <h4>SUPERCHARGED FOR PROS.</h4>
        <h1>iPad S13+ Pro</h1>
        <p>From ₹12000 or ₹1000/mo.</p>
        <Link className="button">BUY NOW</Link>
        </div>
        
      </Link>
   </div>
 
  
  </Slider>


          </div>

          <div className="col-12 col-md-6">
            <div className="row d-flex flex-md-row">
              <div className="col-md-6 mb-2">
                <div className="small-banner position-relative ">
                  <Link to="/app/product">
                    
                    <img
                      src={catbanner1}
                      className="img-fluid "
                      alt="main-banner"
                    />
                  </Link>
                  <div className="small-banner-content position-absolute">
                    <h4>NEW ARRIVAL</h4>
                    <h5>By iPad Air</h5>
                    <p>
                      From ₹12000 <br /> or ₹2000/mo.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-2">
                <div className="small-banner position-relative ">
                  <Link to="product">
                    
                    <img
                      src={catbanner2}
                      className="img-fluid "
                      alt="main-banner"
                    />
                  </Link>
                  <div className="small-banner-content position-absolute">
                    <h4>NEW ARRIVAL</h4>
                    <h5>By iPad Air</h5>
                    <p>
                      From ₹12000 <br /> or ₹2000/mo.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row d-flex flex-md-row">
              <div className="col-md-6 mt-2">
                <div className="small-banner position-relative ">
                  <Link to="/app/product">
                    
                    <img
                      src={catbanner3}
                      className="img-fluid "
                      alt="main-banner"
                    />
                  </Link>
                  <div className="small-banner-content position-absolute">
                    <h4>NEW ARRIVAL</h4>
                    <h5>By Ipad air</h5>
                    <p>
                      From ₹12000 <br /> or ₹2000/mo.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mt-2">
                <div className="small-banner position-relative ">
                  <Link to="/app/product">
                    
                    <img
                      src={catbanner4}
                      className="img-fluid "
                      alt="main-banner"
                    />
                  </Link>
                  <div className="small-banner-content position-absolute">
                    <h4>NEW ARRIVAL</h4>
                    <h5>By iPad Air</h5>
                    <p>
                      From ₹12000 <br /> or ₹2000/mo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <section className="home-wrapper-2 py-4">
        <div className="container-xxl">
          <div className="row d-flex alilgn-items-center justify-content-between">
            <div className="col-6 col-md-2 col-sm-5 d-flex flex-column align-items-center mb-2">
              <TbTruckDelivery className="fs-1 " />
              <h6 className="text-center">Free Shipping</h6>
              <p className="mb-0 text-center">From ALl Orders Over ₹150</p>
            </div>
            <div className="col-6 col-md-2 col-sm-5 d-flex flex-column align-items-center mb-2">
              <FiGift className="fs-1 " />
              <h6>Daily Surprise Offers</h6>
              <p className="mb-0">Save upto 25% off</p>
            </div>
            <div className="col-6 col-md-2 col-sm-5 d-flex flex-column align-items-center mb-2">
              <TfiHeadphoneAlt className="fs-1" />
              <h6>Support 24/7</h6>
              <p className="mb-0">Shop with an expert</p>
            </div>
            <div className="col-6 col-md-2 col-sm-5 d-flex flex-column align-items-center mb-2">
              <CiDiscount1 className="fs-1" />
              <h6>Affordable Prices </h6>
              <p className="mb-0">Get Factory Default Price</p>
            </div>
            <div className="col-6 col-md-2 col-sm-5 d-flex flex-column align-items-center mb-2">
              <BsFillCreditCardFill className="fs-1" />
              <h6>Secure Payments </h6>
              <p className="mb-0">100% Protected Payment</p>
            </div>
          </div>
        </div>
      </section>

      <section className="home-wrapper-2 py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 bg-white shadow-sm">
              <div className="row d-flex alilgn-items-center justify-content-center">
                <div className="col-12  col-md-3 col-sm-6">
                  <div
                    className="card"
                    style={{
                      width: "auto",
                      border: "none",
                    }}
                  >
                    <div className="row">
                      <div className="col-7">
                        <div class="card-body">
                          <h6 class="card-title">Music & Gamings</h6>
                          <p class="card-text">10 Items</p>
                        </div>
                      </div>
                      <div className="col-5 ">
                        <img src={camera} alt="camera" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12  col-md-3 col-sm-6">
                  <div
                    className="card"
                    style={{
                      width: "auto",
                      border: "none",
                    }}
                  >
                    <div className="row">
                      <div className="col-7">
                        <div class="card-body">
                          <h6 class="card-title">Camera</h6>
                          <p class="card-text">10 Items</p>
                        </div>
                      </div>
                      <div className="col-5">
                        <img src={camera} alt="camera" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12  col-md-3 col-sm-6">
                  <div
                    className="card"
                    style={{
                      width: "auto",
                      border: "none",
                    }}
                  >
                    <div className="row">
                      <div className="col-7">
                        <div class="card-body">
                          <h6 class="card-title">Smart Tv</h6>
                          <p class="card-text">10 Items</p>
                        </div>
                      </div>
                      <div className="col-5">
                        <img src={tv} alt="camera" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12  col-md-3 col-sm-6">
                  <div
                    className="card"
                    style={{
                      width: "auto",
                      border: "none",
                    }}
                  >
                    <div className="row">
                      <div className="col-7">
                        <div class="card-body">
                          <h6 class="card-title">Headphones</h6>
                          <p class="card-text">10 Items</p>
                        </div>
                      </div>
                      <div className="col-5">
                        <img src={headphone} alt="camera" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 bg-white shadow-sm">
              <div className="row d-flex alilgn-items-center justify-content-center">
                <div className="col-12  col-md-3 col-sm-6">
                  <div
                    className="card"
                    style={{
                      width: "auto",
                      border: "none",
                    }}
                  >
                    <div className="row">
                      <div className="col-7">
                        <div class="card-body">
                          <h6 class="card-title">Music & Gamings</h6>
                          <p class="card-text">10 Items</p>
                        </div>
                      </div>
                      <div className="col-5 ">
                        <img src={camera} alt="camera" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12  col-md-3 col-sm-6">
                  <div
                    className="card"
                    style={{
                      width: "auto",
                      border: "none",
                    }}
                  >
                    <div className="row">
                      <div className="col-7">
                        <div class="card-body">
                          <h6 class="card-title">Camera</h6>
                          <p class="card-text">10 Items</p>
                        </div>
                      </div>
                      <div className="col-5">
                        <img src={camera} alt="camera" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12  col-md-3 col-sm-6">
                  <div
                    className="card"
                    style={{
                      width: "auto",
                      border: "none",
                    }}
                  >
                    <div className="row">
                      <div className="col-7">
                        <div class="card-body">
                          <h6 class="card-title">Smart Tv</h6>
                          <p class="card-text">10 Items</p>
                        </div>
                      </div>
                      <div className="col-5">
                        <img src={tv} alt="camera" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12  col-md-3 col-sm-6">
                  <div
                    className="card"
                    style={{
                      width: "auto",
                      border: "none",
                    }}
                  >
                    <div className="row">
                      <div className="col-7">
                        <div class="card-body">
                          <h6 class="card-title">Headphones</h6>
                          <p class="card-text">10 Items</p>
                        </div>
                      </div>
                      <div className="col-5">
                        <img src={headphone} alt="camera" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <h3>Featured Collection</h3>

        
            <div className="row d-flex align-items center justify-content-center ">
            
              {productState.map((item, i) => {
                if (item.tags === "special") {
                  return <ProductCard key={i} grid={item} />;
                }
              })}
            </div>
         
        </div>
      </section>

      <section className="famous-wrapper py-3 home-wrapper-2">
        <div className="container-xxl">
          <AwesomeSlider>
            <div className="row d-flex align-items center justify-content-center">
              <FamousProduct />
              <FamousProduct />
              <FamousProduct />
              <FamousProduct />
            </div>
          </AwesomeSlider>
        </div>
      </section>

      <section className="special-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row d-flex align-items center justify-content-center">
            <div className="col-12">
              <h3>Special Products</h3>
            </div>
            <div className="row special-product-card">
              <div className="col-md-4 col-sm-6 g-2">
                <SpecialProduct />
              </div>
              <div className="col-md-4 col-sm-6 g-2">
                <SpecialProduct />
              </div>
              <div className="col-md-4 col-sm-6 g-2">
                <SpecialProduct />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="popular-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row d-flex align-items center justify-content-center">
            <div className="col-12">
              <h3>Our Popular Products</h3>
            </div>
            <div className="row">
              {productState.map((item, i) => {
                if (item.tags === "popular") {
                  return <ProductCard key={i} grid={item} />;
                }
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="marquee-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="marquee-inner-wrapper card-wrapper bg-white p-3">
                <Marquee className="d-flex" speed={50}>
                  <div className="mx-4 w-25">
                    <img src={brand1} alt="" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src={brand2} alt="" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src={brand3} alt="" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src={brand4} alt="" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src={brand5} alt="" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src={brand6} alt="" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src={brand7} alt="" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src={brand8} alt="" />
                  </div>
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row d-flex align-items center justify-content-center">
            <div className="col-12">
              <h3>Our Latest Blogs</h3>
            </div>
          </div>
          <div className="row d-flex">
            <div className="col-sm-6 col-md-3">
              <BlogCards />
            </div>
            <div className="col-sm-6 col-md-3">
              <BlogCards />
            </div>
            <div className="col-sm-6 col-md-3">
              <BlogCards />
            </div>
            <div className="col-sm-6 col-md-3">
              <BlogCards />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
