import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "../../axios";

function Blog() {
  const router = useRouter();
  const { id } = router.query;

  const [blog, setBlog] = useState(null);
  useEffect(() => {
    async function getAllBlogs() {
      try {
        const res = await axios.get(`/blogs/${id}`);
        console.log(res.data);
        setBlog(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getAllBlogs();
  }, [id]);
  return <div>{blog ? <p>{blog.description}</p> : <p>not found</p>}</div>;
}

export default Blog;
