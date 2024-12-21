import React from "react";

//assets-
import logo from "../assets/logo.png";

//css-
import style from "../css/home.module.css";

function HomeNav() {
  return (
    <div className={style.navContainer}>
      <div className={style.logoContainer}>
        <img src={logo} alt="logo" className={style.logo} />
        <p className={style.logoText}>FormBot</p>
      </div>

      <div className={style.navBtnContainer}>
        <div className={style.signin}>Sign In</div>
        <div className={style.createForm}>Create a FormBot</div>
      </div>
    </div>
  );
}

export default HomeNav;
