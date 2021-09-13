import React, { useEffect, useState } from "react";
import axios from "../../axios";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    async function getAllBlogs() {
      const res = await axios.get("/blogs");
      console.log(res.data);
      setBlogs(res.data);
    }
    getAllBlogs();
  }, []);
  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog._id}>
          <p>{blog.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Blogs;
