import React from "react";
import { useNavigate } from "react-router-dom";

//assets-
import logo from "../assets/logo.png";

//css-
import style from "../css/home.module.css";

function HomeNav() {
  const navigate = useNavigate();

  return (
    <div className={style.navContainer}>
      <div className={style.logoContainer}>
        <img src={logo} alt="logo" className={style.logo} />
        <p className={style.logoText}>FormBot</p>
      </div>

      <div className={style.navBtnContainer}>
        <div
          className={style.signin}
          onClick={() => {
            navigate("/login");
          }}
        >
          Sign In
        </div>
        <div
          className={style.createForm}
          onClick={() => navigate("/dashboard")}
        >
          Create a FormBot
        </div>
      </div>
    </div>
  );
}

export default HomeNav;
