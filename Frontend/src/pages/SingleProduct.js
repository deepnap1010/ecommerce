import React, { useState ,useEffect} from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link ,useLocation, useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { BsHeart } from "react-icons/bs";
import { TbChevronDownLeft, TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import prodcompare from "../images/prodcompare.svg";
import { useDispatch, useSelector } from "react-redux";
import watch from "../images/watch.jpg";
import addcart from "../images/add-cart.svg";
import tv1 from "../images/tv1.jpg";
import tv2 from "../images/tv2.jpg";
import tv3 from "../images/tv3.jpg";
import tv4 from "../images/tv4.webp";
import convert from 'color-convert';


import view from "../images/view.svg";
import { config } from "../utils/axiosconfig";
import axios from 'axios'
import { createcart} from '../features/product cart/cartSlice'
import { Rate } from 'antd';
import CustomInput from "../components/CustomInput";
import * as yup from "yup";
import { useFormik } from "formik";
import { getAproduct, rating } from "../features/product/productSlice";
import ProductCard from "../components/ProductCard";



const SingleProduct = () => {
  const location=useLocation();
  const dispatch=useDispatch();
 const navigate=useNavigate();

  const [value, setValue] = useState(3);
  const id= location.pathname.split("/")[3];

  const [copied, setCopied] = useState(false);
  const product=useSelector((state=>state.product))
  console.log(product)
 
   console.log(id)
console.log(value);
  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

  const { brand, category, color, description, images, price, quantity, ratings, slug, sold, tags, title, totalrating, size 
  } = location.state ;
  // const comment = location.state.ratings[1].comment; 
// console.log(comment); 
 
 const[image,setImage]=useState(images[0].url);
  console.log(location.state)
  const [count, setCount] = useState(1);

  const handleCountChange = (event) => {
    setCount(Number(event.target.value));
  };
  const handleAddToCart = () => {
    dispatch(createcart({...location.state,count}));
    window.location.reload();
  };
  const handleAddToCarts = () => {
    dispatch(createcart({...location.state,count}));
    navigate("/app/cart")
    window.location.reload();
 
  };
  
  const props = {
   width: 200,
   height: 400,
    zoomWidth: 1000, 
    img: "https://img.tatacliq.com/images/i8/437Wx649H/MP000000013257278_437Wx649H_202205261842581.jpeg"};

    const copyToClipboard = (text) => {
      console.log("text", text);
      var textField = document.createElement("textarea");
      textField.innerText = text;
      document.body.appendChild(textField);
      textField.select();
      document.execCommand("copy");
      textField.remove();
    };
  const  [orderProduct, setOrderProduct] = useState(true)
  const formik = useFormik({
    initialValues: {
      review:"",
    
    },
  });

  const colorCode = color;
  const [r, g, b] = convert.hex.rgb(colorCode);
  const colorName = convert.rgb.keyword([r, g, b]);
  
  console.log(colorName); // "red"
  
  const style = {
    backgroundColor:  colorName,
    width: "30px",
    height: "30px"
  };

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(`http://localhost:3000/#${location.pathname}`);
      setCopied(true);
    } catch (error) {
      console.error("Copy failed: ", error);
    }
  };

  return (
    <>
    
  <Meta title="Product Name"></Meta>
      <BreadCrumb title="Product Name" />
      <div className="compare-product-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div class="row d-flex align-items-center justify-content-center">

          <div className="col-12 card bg-white mb-5 p-3">
         
			
				<div class="wrapper row">
					<div class="preview col-md-6">
						
						<div class="preview-pic tab-content">
             <div class="tab-pane active" id="pic-1"><img style={{  width: "500px", height: "500px"}} src={`${image}`}/></div>
             
						 
			
						 
						  
						</div>
						<ul class="preview-thumbnail nav nav-tabs">
						  <li class="active"><a data-target="#pic-1" data-toggle="tab"><img src={`${images[0].url}`} 
                onClick={(e)=>{
                  e.preventDefault();
                  setImage(images[0].url)
                }
  
                }
               /></a></li>
					<li>
  {images.length > 0 ? (
    <a data-target="#pic-2" data-toggle="tab">
      <img src={`${images[images.length > 1 ? 1 : 0]?.url}`} onClick={(e) => {
        e.preventDefault();
        setImage(images[images.length > 1 ? 1 : 0]?.url);
      }} />
    </a>
  ) : (
    <img src={`${images[0]?.url}`} />
  )}
</li>
<li>
  {images.length > 0 ? (
    <a data-target="#pic-2" data-toggle="tab">
      <img src={`${images[images.length > 2 ? 2 : 0]?.url}`} onClick={(e) => {
        e.preventDefault();
        setImage(images[images.length > 2 ? 2 : 0]?.url);
      }} />
    </a>
  ) : (
    <img src={`${images[0]?.url}`} />
  )}
</li>
<li>
  {images.length > 0 ? (
    <a data-target="#pic-2" data-toggle="tab">
      <img src={`${images[images.length > 3 ? 3 : 0]?.url}`} onClick={(e) => {
        e.preventDefault();
        setImage(images[images.length > 3 ? 3 : 0]?.url);
      }} />
    </a>
  ) : (
    <img src={`${images[0]?.url}`} />
  )}
</li>
						</ul>
						
					</div>




					<div class="details col-md-6 gap-10">
						<h3 class="product-title">{title}</h3>
						<div class="rating">
							<div class="stars">
              <ReactStars
                    count={5}
                    size={30}
                    value={5}
                    edit={false}
                    activeColor="#ffd700"
                  />
							</div>

							<span class="review-no">41 reviews</span>
						</div>
						<p class="product-description">{description.replace(/(<([^>]+)>)/gi, "")
}</p>
						<h5 class="price">current price: <span>₹{price}</span></h5>
						<p class="vote"><strong>91%</strong> of buyers enjoyed this product! <strong>(87 votes)</strong></p>
						<h6 class="sizes">sizes:
							<span class="size" data-toggle="tooltip" title="small">{size}</span>
							{/* <span class="size" data-toggle="tooltip" title="medium">{size}</span>
							<span class="size" data-toggle="tooltip" title="large">{size}</span>
							<span class="size" data-toggle="tooltip" title="xtra large">{size}</span> */}
						</h6>
						<h6 class="colors d-flex;
    align-items-center">colors:
							{/* <span class="color orange not-available" data-toggle="tooltip" title="Not In store"></span> */}
							<span style={style}></span>
							{/* <span class="color blue"></span> */}
						</h6>
						<div class="action row d-flex  gap-30 justify-content-between mb-2">
             <div className="col-sm-4 d-flex gap-10 align-items-center justify-content-md-center">
             <h5 className="mb-0">Quantity : </h5>
             <input
        type="number"
        max={5}
        min={1}
        style={{ width: "50px", height: "30px" }}
        value={count}
        onChange={handleCountChange}
      />
             </div>

             <div className="col-sm-7 d-flex gap-30">
             <button  className="button " onClick={handleAddToCart}>
           Add to Cart
            </button>
            <button className="button" onClick={handleAddToCarts}    >
           Buy Now
            </button>
             </div>
             
						</div>
          

            <div className="d-flex gap-10 flex-column  mt-3">
                  <h5 className="product-heading">Shipping & Returns :</h5>
                  <p className="product-data">
                    Free shipping and returns available on all orders! <br /> We
                    ship all US domestic orders within
                    <b>5-10 business days!</b>
                  </p>
                </div>
                <button onClick={handleCopyClick} className="button">
        {copied ? "Copied!" : "Copy and share this product link:"}
      </button>


              

					</div>
				</div>
			
	
      


          </div>



            <div className="col-12 card mx-auto p-4 mb-4">
              <h4>Description</h4>
              <p>
              {description.replace(/(<([^>]+)>)/gi, "")
}
              </p>
            </div>

            <h4>Customer Reviews</h4>
            <div className="col-12 card mx-auto p-4 mb-4">
              <div className="row mx-2 border-bottom border-primary mb-3 pb-3">
                <div className="col-4 col-sm-1 ">
                  <div className="review-logo text-white mb-5">
                    <p>R</p>
                  </div>
              
                </div>
                <div className="col-8 d-flex justify-content-between">
                <div className="row">
                   <div className="">
                <ReactStars
                    count={5}
                    size={30}
                    value={5}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <h6>Good Product</h6>
                  <p>by Ravi on Nov. 09.2022</p>
                </div>

                  {
                  orderProduct && (
                    <div className="">
                      <a >Write a Review</a>
                    </div>
                  )
                  }
                </div>
               

             
                </div>

                
               
              </div>
              <form action="">
                  <div className="review-font mb-0">

              <h5 >Write a Review</h5> 
                 
              <span>
      <Rate tooltips={desc} onChange={setValue} value={value} allowHalf defaultValue={2.5}/>
      {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
    </span>
                  </div>

              <div className="row mb-2" >
             
              
                <CustomInput
            type="textarea"
            label="Leave a comment here"
            id="review"
            name="review"
            rows={5}
            onChng={
            
               formik.handleChange("review")}
            
             
            onBlr={formik.handleBlur("review")}
            val={formik.values.review}
            
          />
               
               <div className="col-md-2 mt-2 ">
               <div  className="button"   onClick={(e)=>{
                e.preventDefault()
                let val={
                  prodId:location?.state?._id,
                  comment:formik?.values?.review,
                  star:value
                }

                dispatch(rating(val))
 
      }
    
            
            }>
              Submit Review
            </div>
               </div>
              </div>
              </form>



              {ratings && ratings.length > 0 && ratings.map((rating) => (
              <div className="row mt-2 border border-secondary shadow-none">
                <div className="d-flex align-items-center mb-4">
                  <h5 className="mb-0 mx-2">Umakant</h5>
                
                 


                  <ReactStars
  count={rating.star}
  size={rating.size}
  value={rating.star}
  edit={false}
  activeColor="#ffd700"
/>


                </div>
               
  <div key={rating._id}>
    <p>{rating.comment}</p>
  </div>

              </div>
           ))}
       
            </div>
           

          
          </div>
        </div>
      </div> 
   
           
          
    </>
  );
};

export default SingleProduct;
{/* <div class="tab-pane" id="pic-4"><img src="http://placekitten.com/400/252" /></div>
						  <div class="tab-pane" id="pic-5"><img src="http://placekitten.com/400/252" /></div> */}
  {/* <div className="row d-flex mt-2 compare-wishlist">
            <div className="col-md-4 mb-2 mb-sm-0">

                <a href="" className="text-dark"><TbGitCompare className="fs-2 gap-15"/> Add to Compare</a>
            </div>
            <div className="col-md-4 mb-2 mb-sm-0">

               <a href="" className="text-dark"><AiOutlineHeart className="fs-2 gap-15"/>Add to wishlist</a>
            </div>
            </div> */}

						  {/* <li><a data-target="#pic-5" data-toggle="tab"><img src="http://placekitten.com/200/126" 
               onClick={(e)=>{
                e.preventDefault();
                setImage("http://placekitten.com/200/126")
              }

              }/></a></li> */}
    
          {/* <div className="row">
          <div className="col-6" style={{objectFit: "cover", }}>
            <ReactImageMagnify {...{
    smallImage: {
        alt: 'Wristwatch by Ted Baker London',
        isFluidWidth: true,
        src: watchImg300,
      
    },
    largeImage: {
        src: watchImg1200,
        width: 1200,
        height: 1800
    }
}} />
          
       
            </div>
            <div className="col-6">
              
            </div>
          </div>
             */}
       
                {/* <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea" rows={5}></textarea> */}
  {/* <ReactStars
                    
                    count={5}
                    size={30}
                    value={3}
                    edit={true}
                    activeColor="#ffd700"
                  />  */}

              {/* <div className="row mx-2">
                <div className="col-4 col-sm-1 ">
                  <div className="review-logo text-white mb-5">
                    <p>R</p>
                  </div>
                
                </div>
                <div className="col-8 d-flex justify-content-between">
                <div>
                <ReactStars
                    count={5}
                    size={30}
                    value={5}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <h6>Good Product</h6>
                  <p>by Ravi on Nov. 09.2022</p>
                </div>

                  {
                  orderProduct && (
                    <div>
                      <a href="">Write a Review</a>
                    </div>
                  )
                  }

             
                </div>

                
               
               </div> */}
  {/* <div className="col-12">
              <h3>Our Popular Products</h3>
                <div className="row d-sm-flex">
                <div
        className=
          "col-md-3 col-sm-6 product-card "
      >
             
        



        </div>
       
                </div>
            
            </div> */}





































