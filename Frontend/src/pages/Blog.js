import React,{useState,useEffect} from 'react'
import { Button, Card } from 'antd';

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { getBlogs } from '../features/blogs/blogSlice';

export default function Blog() {

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
    <Meta title="Blogs"></Meta>
    <BreadCrumb title="Blogs" />
  
    <div className="blog-wrapper home-wrapper-2 py-5">
      <div className="container-xxl">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {blogs.length === 0 ? (
            <p>there is no blog.</p>
          ) : (
            <>
              {blogs.map((blog) => (
                <div className="col">
                  <Card>
                    <Card.Img variant="top" src={blog.image} />
                    <Card.Body>
                      <Card.Title>{blog.title}</Card.Title>
                      <Card.Text>{blog.description}</Card.Text>
                      <Button variant="primary" onClick={() => handleBlogClick(blog)}>
                        Read More
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  </>
  )
}
