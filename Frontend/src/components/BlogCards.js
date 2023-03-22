import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getBlogs } from "../features/blogs/blogSlice";
import blogImage from "../images/blog-1.jpg";

export default function BlogCards() {
  const dispatch = useDispatch();
const navigate=useNavigate();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  const blogState = useSelector((state) => state.blogs.blogs);
  console.log(blogState);

  useEffect(() => {
    setBlogs(blogState);
  }, [blogState]);
  const handleBlogClick = (blog) => {
    navigate(`/app/blogs/${blog.id}`, { state: { blog } });
  };
  return (
    <>
{blogs.length === 0 ? (
  <p>there is no blog.</p>
) : (
  <>
    {blogs.slice(0,1).map((blog) => (
      <div className="card blog-content" style={{ width: "100%" }} key={blog.id}>
        <img src={blog.image} className="card-img-top img-fluid" alt="..." />
        <div className="card-body">
          <p className="data">{blog.title}</p>
          <h5 className="card-title">{blog.category}</h5>
          <p className="card-text desc">{blog.description}</p>
          <button className="button" onClick={() => handleBlogClick(blog)}>
            Read More
          </button>
        </div>
      </div>
    ))}
  </>
)}
    </>
  );
}
