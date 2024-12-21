import React from "react";

//css-
import style from "../css/dashboard.module.css";

//assets-
import bottomArrow from "../assets/bottomarrow.png";

//imports-
import Theme from "./Theme.jsx";

function DashboardNav() {
  return (
    <div className={style.nav}>
      <div className={style.navBox}>
        <div className={style.dropdown}>
          <p className={style.dropdownText}>Dewank Rastogi's workspace</p>
          <img src={bottomArrow} className={style.dropdownArrow} />
        </div>
        <div className={style.navBoxRight}>
          <Theme />
          <div className={style.share}>Share</div>
        </div>
      </div>
    </div>
  );
}

export default DashboardNav;
