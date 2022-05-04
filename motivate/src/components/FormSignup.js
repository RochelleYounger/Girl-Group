import React from "react";
import useForm from "./useForm";

const FormSignup = () => {
  const { handleChange, values } = useForm();
  return (
    <div className="form-content-right">
      <form className="form">
        <h1>Start Your Jouney Today</h1>
        <div className="form-inputs">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            className="form-input"
            placeholder="Enter you username"
            value={values.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-inputs">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="form-input"
            placeholder="Enter you email"
            value={values.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-inputs">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="form-input"
            placeholder="Enter you password"
            value={values.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-inputs">
          <label htmlFor="password2" className="form-label">
            Email
          </label>
          <input
            id="password2"
            type="password"
            name="password2"
            className="form-input"
            placeholder="Confirm password"
            value={values.password2}
            onChange={handleChange}
          />
        </div>
        <button className="form-input-btn" type="submit">
          Join now
        </button>
        <span className="form-input-login">
          Have an account? Login <a href="#">here</a>
        </span>
      </form>
    </div>
  );
};

export default FormSignup;
