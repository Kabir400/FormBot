//base url
const base_url = import.meta.env.VITE_BASE_URL;

//imports-
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import postRequest from "../utils/postRequest.js";

//css-
import style from "../css/auth.module.css";

//assets-
import google from "../assets/google.png";

function LoginForm() {
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  //submitHandler........................
  const submitHandler = async (e) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.target);

    const data = new URLSearchParams(formData).toString();

    const result = await postRequest(`${base_url}/login`, data);

    if (result.suceess === true) {
      toast.success(result.message, {
        position: "top-right",
        autoClose: 3000,
      });
      setIsPending(false);
      localStorage.setItem("authToken", result.data.Token);
      navigate("/dashboard");
    } else {
      setIsPending(false);
      toast.error(result.message, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  //.................................

  return (
    <div className={style.authBox}>
      <form className={style.authForm} onSubmit={submitHandler}>
        <div className={style.authFormBox}>
          <label htmlFor="email" className={style.label}>
            Email
          </label>
          <input
            name="email"
            type="text"
            id="email"
            className={style.input}
            placeholder="Enter your email"
          />
        </div>

        <div className={style.authFormBox}>
          <label htmlFor="password" className={style.label}>
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            className={style.input}
          />
        </div>

        <button type="submit" className={style.authBtn}>
          {isPending ? "Loading..." : "Log In"}
        </button>
      </form>
      <div className={style.authFooter}>
        <p className={style.or}>OR</p>
        <div className={style.authGoogleBtn}>
          <img src={google} alt="google" className={style.googleImg} />
          <p className={style.googleBtnText}>Sign in with Google</p>
        </div>
        <div className={style.footerText} onClick={() => navigate("/signup")}>
          Don’t have an account?{" "}
          <span className={style.span}>Register now</span>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
