import React from "react";
import style from "../css/Loader.module.css";

const Loader = () => {
  return (
    <div className={style.loaderContainer}>
      <div className={style.loader}></div>
    </div>
  );
};

export default Loader;
