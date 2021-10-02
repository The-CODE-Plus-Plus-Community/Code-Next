import React from "react";

const WriteArticle = () => {
  return (
    <div>
      <input type="text" placeholder="title" />
      <input type="text" placeholder="subtitle" />
      <input type="text" placeholder="background image" />
      <textarea type="text" placeholder="write your story here..." />
      <button>post</button>
    </div>
  );
};

export default WriteArticle;
