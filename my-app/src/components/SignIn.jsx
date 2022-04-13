import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignIn = () => {
  const [data, setData] = useState("");
  const [icon, setIcon] = useState(false);
  const { setUser, setIsSignin } = useContext(UserContext);

  useEffect(() => {
    axios.get("http://localhost:3001/profile").then((res) => setData(res.data));
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      values.email = values.email.toLowerCase();

      data.map((item) => {
        if (values.email == item.email && values.password == item.password) {
          setUser(item);
          setIsSignin(true);
        }
      });
    },
  });

  return (
    <div className="box">
      <h1>خوش آمدید</h1>
      <form className="formHolder" onSubmit={formik.handleSubmit}>
        <input
          className="email"
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          placeholder="ایمیل"
        />
        <input
          id="password"
          name="password"
          type={icon ? "text" : "password"}
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="رمزعبور"
        />
        <div className="iconHolder">
          {icon ? (
            <AiOutlineEyeInvisible
              className="icons"
              onClick={() => setIcon(false)}
            />
          ) : (
            <AiOutlineEye className="icons" onClick={() => setIcon(true)} />
          )}
        </div>

        <button type="submit" className="mainBut">
          ورود
        </button>
      </form>
    </div>
  );
};

export default SignIn;
