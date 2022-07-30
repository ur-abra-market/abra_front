import React from "react";
import "./Subscribe.css";

const Subscribe = () => {
  return (
    <div className="Subscribe">
      <h2>Do you want to be the first</h2>
      <h3>to know about new products and hype products?</h3>
      <div className="Subscribe__form">
        <input
          className="Subscribe__form_email"
          type="text"
          placeholder="Enter your email address"
        />
        <button className="Subscribe__form_submit">Subscribe</button>
        <input type="submit" hidden />
      </div>
      <p>We never share your data with third parties</p>
    </div>
  );
};

export default Subscribe;
