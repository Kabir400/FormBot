import React from "react";

//css-
import style from "../css/dashboard.module.css";

//assets-
import plus from "../assets/plus.png";
import remove from "../assets/delete.png";

function DashboardForm() {
  return (
    <div className={style.formContainer}>
      <div className={style.createFormBox}>
        <img src={plus} className={style.plusImg} />
        <p className={style.createFormText}>Create a typebot</p>
      </div>
      {new Array(3).fill(0).map((_, index) => (
        <div className={style.formBox} key={index}>
          <p className={style.formText}>Form Name</p>
          <img src={remove} className={style.removeImg} />
        </div>
      ))}
    </div>
  );
}

export default DashboardForm;
