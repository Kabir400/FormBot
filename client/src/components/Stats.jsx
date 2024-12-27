import React, { useContext } from "react";

//css-
import style from "../css/response.module.css";
import { utilityContext } from "../components/Store.jsx";

function Stats({ title, value }) {
  const [utility, setUtility] = useContext(utilityContext);
  return (
    <div
      className={`${style.stats} ${
        utility.theme === "light" && "grayBg whiteText"
      }`}
    >
      <p className={style.statsTitle}>{title}</p>
      <p className={style.statsValue}>{value}</p>
    </div>
  );
}

export default Stats;
