import React from "react";
import style from "../css/auth.module.css";
import { useNavigate } from "react-router-dom";

//imports
import LoginForm from "../components/LoginForm";

//img
import triangle from "../assets/triangle.png";
import rightcircle from "../assets/rightcircle.png";
import topcircle from "../assets/topcircle.png";
import backarrow from "../assets/backarrow.png";

function Login() {
  const navigate = useNavigate();
  return (
    <div className={style.authContainer}>
      <LoginForm />

      <img src={triangle} alt="triangle" className={style.triangle} />
      <img src={rightcircle} alt="rightcircle" className={style.rightcircle} />
      <img src={topcircle} alt="topcircle" className={style.topcircle} />
      <img
        src={backarrow}
        alt="back"
        className={style.backarrow}
        onClick={() => navigate(-1)}
      />
    </div>
  );
}

export default Login;
