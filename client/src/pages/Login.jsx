import React from "react";
import style from "../css/auth.module.css";

//imports
import LoginForm from "../components/LoginForm";

//img
import triangle from "../assets/triangle.png";
import rightcircle from "../assets/rightcircle.png";
import topcircle from "../assets/topcircle.png";

function Login() {
  return (
    <div className={style.authContainer}>
      <LoginForm />

      <img src={triangle} alt="triangle" className={style.triangle} />
      <img src={rightcircle} alt="rightcircle" className={style.rightcircle} />
      <img src={topcircle} alt="topcircle" className={style.topcircle} />
    </div>
  );
}

export default Login;
