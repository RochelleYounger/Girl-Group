import { useState, useEffect } from "react";

const useForm = () => {
  const [vaalues, setValues] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  cont[(errors, setErrors)] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    //set values:
    setValues({
      ...values,
      [name]: value,
    });
  };

  return { handleChange };
};

export default useForm;
