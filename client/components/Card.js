import React from "react";

const Card = ({ children }) => {
  return (
    <div style={{ border: "1px solid black", margin: "20px" }}>{children}</div>
  );
};

export default Card;
