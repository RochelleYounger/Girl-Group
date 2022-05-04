import React from "react";

const FormSignup = () => {
  return (
    <div className="form-content-right">
      <form className="form">
        <h1>Get Started!</h1>
        <div className="form-inputs">
          <label htmlFor="usernaame" className="form-label"></label>
          <input
            type="text"
            name="username"
            className="form-input"
            placeholder="Enter your username"
          />
        </div>
        <div className="form-inputs">
          <label htmlFor="email" className="form-label"></label>
          <input
            type="text"
            name="email"
            className="form-input"
            placeholder="Enter your email "
          />
        </div>
      </form>
    </div>
  );
};

export default FormSignup;
