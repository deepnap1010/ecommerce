// import statements
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import blog from "../images/blog-1.jpg";

const SingleBlog = () => {
  const location = useLocation();

  const { blog
  } = location.state;
const {category, description, image }=blog
console.log(location.state);
console.log(category);
console.log(blog);
  return (
    <>
      <Meta title={category} />
      <BreadCrumb title={category} />
      <div className="blog-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="single-blog-card">
                <h3 className="title">{category}</h3>
                <img src={image} alt="blog" className="img-fluid w-100 my-4" />
                <p>{description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
