import React from "react";

//css-
import style from "../css/dashboard.module.css";

//assets-
import bottomArrow from "../assets/bottomarrow.png";

//imports-
import Theme from "./Theme.jsx";
import { utilityContext } from "./Store.jsx";
import { useContext } from "react";

function DashboardNav() {
  const [utility, setUtility] = useContext(utilityContext);

  return (
    <div
      className={`${style.nav} ${
        utility.theme === "light" && "darkBottomBorder"
      }`}
    >
      <div className={style.navBox}>
        <div
          className={`${style.dropdown} ${
            utility.theme === "light" && "darkBorder"
          }`}
        >
          <p
            className={`${style.dropdownText} ${
              utility.theme === "light" && "darkText"
            }`}
          >
            Dewank Rastogi's workspace
          </p>
          <img
            src={bottomArrow}
            className={`${style.dropdownArrow} ${
              utility.theme === "light" && "convertDark"
            }`}
          />
        </div>
        <div className={style.navBoxRight}>
          <Theme />
          <div
            className={`${style.share} ${
              utility.theme === "light" && "whiteText"
            }`}
          >
            Share
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardNav;
