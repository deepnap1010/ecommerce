import React from "react";
import famous1 from "../images/famous-1.webp";

export default function FamousProduct() {
  return (
    <>
      <div className="col-12 col-md-3 col-sm-6 px-1">
        <div className="card  bg-dark rounded shadow text-white famous-product" style={{width: "auto"}}>
          <img src={famous1} className="card-img" alt="famous product" />
          <div className="card-img-overlay">
          <h6 >studio display</h6>
            <h5 className="card-title">Smart Watch Series 7</h5>
            <p className="card-text">
              27-inch 5K Retina Display
            </p>
           
          </div>
        </div>
      </div>
    </>
  );
}
