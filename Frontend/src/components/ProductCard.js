import React,{useState} from "react";
import ReactStars from  "react-rating-stars-component";
import { Link } from "react-router-dom";
import { BsHeart , BsHeartFill, BsWatch} from "react-icons/bs";
import { useLocation } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import addcart from "../images/add-cart.svg";
import { createcart} from '../features/product cart/cartSlice'
import view from "../images/view.svg";
import CompareProduct from "../pages/CompareProduct";
import { createwishlist } from "../features/Wishlist/wishSlice";
import { useDispatch, useSelector } from "react-redux";
import { addItems } from "../features/compare/compareSlice";

export default function ProductCard(props) {
  const { grid } = props;
  const [isLiked, setIsLiked] = useState(false);
   const dispatch=useDispatch()
   const product=useSelector((state=>state.product))
   console.log(product)
   const [count, setCount] = useState(1);
  const handleClick = () => {
    setIsLiked(!isLiked);
  
  };
  const{ brand,category,color,description,images,price,quantity,ratings,slug,sold,tags,title,totalrating,}=grid
   let location = useLocation();
    const [mySet1, setMySet1] = useState(new Set());
    const handleAddToSet = (grid) => {
    setMySet1(new Set([...mySet1, grid]));
  };
  const handleAddToCart = () => {
    dispatch(createcart({...grid,count}));
    window.location.reload();
  };
return (
    <>
      <div
        className={` ${
          location.pathname === "/product"
            ? `gr-${grid}  product-card `
            : "col-md-3 col-sm-6 product-card "
        } `}
      >
   
        <div className="card  position-relative card-style" style={{ width: "100%" }}>
        <div className="row d-flex">

        <div className="col-4 col-sm-12 ">
        <button className="border-0 bg-transparent" onClick={() => {
            handleClick();
            dispatch(createwishlist({prodId:grid._id}))
          
        }}
        >
      {isLiked ? (
        <BsHeartFill className="heart-icon position-absolute  " style={{color:"red"}}  />
      ) : (
        <BsHeart className="heart-icon position-absolute" />
      )}
    </button>
    {/* <Link to={`/app/products/${grid._id}`}  className=" fs-3 text-danger"> */}
    <Link to="/app/products"state={grid}  >
       
  <img
    src={images[0].url}
    className="card-img-top img-fluid product-image"
    alt="product"
    style={{ width: "150px", height: "140px" }}
  />
</Link>
        </div>
        
        <div className="col-8 col-sm-12 ">
        <div className="card-body px-4 ">
            <h6>{brand}</h6>
            <h5 className="card-title">
             {title}
            </h5>

            <ReactStars
              count={5}
              size={30}
              value={3}
              edit={false}
              activeColor="#ffd700"
            />
            <p className="price">₹{price}</p>
          </div>
        </div>
           
        </div>
          
          <div className="action-bar position-absolute">
            <div className="d-flex flex-column">
            <button className="border-0 bg-transparent" onClick={() =>{ handleAddToSet
              (grid)
              
                dispatch(addItems(grid))
              
              }}>
        <img src={prodcompare} alt="addcart" />
        {false ? <CompareProduct mySet={mySet1}/> : ""}
      </button>
              {/* <button className="border-0 bg-transparent">
                <img src={view} alt="addcart" />
              </button> */}
              <button className="border-0 bg-transparent" >
                <img src={addcart} alt="addcart"  onClick={handleAddToCart}       />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
