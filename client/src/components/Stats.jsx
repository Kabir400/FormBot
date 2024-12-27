import React from "react";

//css-
import style from "../css/response.module.css";

function Stats({ title, value }) {
  return (
    <div className={style.stats}>
      <p className={style.statsTitle}>{title}</p>
      <p className={style.statsValue}>{value}</p>
    </div>
  );
}

export default Stats;
