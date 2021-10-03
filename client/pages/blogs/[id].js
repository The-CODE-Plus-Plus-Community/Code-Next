import React, { useEffect, useState } from "react";
import DUMMY_DATA from "../../assets/dummy_data.json";
import Image from "next/image";

function Blog() {
  const [blog, setBlog] = useState(DUMMY_DATA[0].blogs[0]);
  return (
    <div>
      {blog ? (
        <>
          <Image src={blog.cover_photo} alt="" width={1900} height={600} />
          <h1>{blog.title}</h1>
          <h2>{blog.subtitle}</h2>
          <p>by - {blog.username}</p>
          <p>{blog.story}</p>
          {/* can also provide tags! */}
        </>
      ) : (
        <p>not found</p>
      )}
    </div>
  );
}

export default Blog;
