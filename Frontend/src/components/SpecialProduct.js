import React from "react";
import { Link } from "react-router-dom";
import { BsHeart } from "react-icons/bs";
import ReactStars from "react-rating-stars-component";
import tab1 from "../images/tab1.jpg"
import Countdown from 'react-countdown';
export default function SpecialProduct() {
  const endTime = new Date('December 31, 2023 23:59:59').getTime();
  const currentDate=new Date();
  return (
    <>
    

      <div className="card" style={{ width: "auto" }}>
        <div className="row no-gutters">
          <div className="col-md-5 position-relative d-flex align-items-center justify-content-center">
            <span className="badge rounded-pill bg-warning position-absolute">
              -20
            </span>
            <Link>
              <BsHeart className="heart-icon position-absolute" />
            </Link>
            <img
              className="img-responsive"
              src={tab1}
              alt="Suresh Dasari Card"
            />
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <h6>Havels</h6>
              <h5 className="card-title">
                Samsung Galaxy Note10+ Mobile Phone Sim...
              </h5>
              <ReactStars
                classNames="w-100 stars"
                count={5}
                size={25}
                value={3}
                edit={false}
                activeColor="#ffd700"
              />
              <span className="price">₹150.00</span> &nbsp;
              <strike>₹350.00</strike>
              <div className="d-flex align-items-center justify-content-center gap-10 my-3 ">
              <Countdown
      date={endTime}
      intervalDelay={0}
      precision={3}
      renderer={({ hours, minutes, seconds, milliseconds }) => (
        <span>
          {hours.toString().padStart(2, '0')}:
          {minutes.toString().padStart(2, '0')}:
          {seconds.toString().padStart(2, '0')}.
         
        </span>
      )}
    />
              </div>
              <div className="progress" style={{
                height: "8px",
                marginBottom: "10px",
              }}>
  <div className="progress-bar" style={{width: "30%",}} role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
</div>
<Link to="/app/product" class="button ">
             Buy
            </Link>
            </div>
            
          </div>
        </div>
       
      </div>
    </>
  );
}
