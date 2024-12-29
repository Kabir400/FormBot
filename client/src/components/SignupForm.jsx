//base url
const base_url = import.meta.env.VITE_BASE_URL;

//imports-
import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import postRequest from "../utils/postRequest.js";

//css-
import style from "../css/auth.module.css";

//assets-
import google from "../assets/google.png";

function SignupForm() {
  const [isPending, setIsPending] = React.useState(false);
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();

  //submit handler...........................
  const submitHandler = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setError(false);

    const formData = new FormData(e.target);

    // Get values from formData
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    // Check if password and confirm password correct
    if (password !== confirmPassword) {
      setIsPending(false);
      setError(true);
      return;
    }

    // Remove confirmPassword from formData
    formData.delete("confirmPassword");

    const data = new URLSearchParams(formData).toString();

    const result = await postRequest(`${base_url}/signup`, data);

    if (result.suceess === true) {
      toast.success("Your account created successfully!", {
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

  //.........................................

  return (
    <div className={style.authBox}>
      <form className={style.authForm} onSubmit={submitHandler}>
        <div className={style.authFormBox}>
          <label htmlFor="userName" className={style.label}>
            Username
          </label>
          <input
            name="name"
            type="text"
            id="userName"
            className={style.input}
            placeholder="Enter your email"
          />
        </div>

        <div className={style.authFormBox}>
          <label htmlFor="email" className={style.label}>
            Email
          </label>
          <input
            type="text"
            name="email"
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

        <div className={style.authFormBox}>
          <label
            htmlFor="confirmPassword"
            className={`${style.label} ${error && style.dangerText}`}
          >
            Confirm Password
          </label>
          <input
            name="confirmPassword"
            type="password"
            id="confirmPassword"
            placeholder="Enter confirm password"
            className={`${style.input} ${error && style.dangerInput}`}
          />
          <p
            className={style.errorPlaceHolder}
            style={{ display: error ? "block" : "none" }}
          >
            enter same password in both fields
          </p>
        </div>

        <button type="submit" className={style.authBtn}>
          {isPending ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div className={style.authFooter}>
        <p className={style.or}>OR</p>
        <div className={style.authGoogleBtn}>
          <img src={google} alt="google" className={style.googleImg} />
          <p className={style.googleBtnText}>Sign in with Google</p>
        </div>
        <div className={style.footerText} onClick={() => navigate("/login")}>
          Already have an account ? <span className={style.span}>Login</span>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
