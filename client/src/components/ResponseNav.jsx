//base url-
const base_url = import.meta.env.VITE_BASE_URL;

import React, { useContext } from "react";
//css-
import style from "../css/workspace.module.css";

//imports-
import Theme from "./Theme.jsx";
import { utilityContext } from "./Store.jsx";

//img-
import close from "../assets/close.png";

function ResponseNav() {
  const [utility] = useContext(utilityContext);
  return (
    <div
      className={`${style.nav}  ${
        utility.theme === "light" && "whiteBg darkText darkBottomBorder"
      }`}
    >
      <div style={{ width: "158px" }}></div>
      <div className={style.navMiddle}>
        <div className={`${style.navMiddleText}`}>Flow</div>
        <div className={`${style.navMiddleText} ${style.navSelected}`}>
          Response
        </div>
      </div>

      <div className={style.navEnd}>
        <Theme />
        <div className={style.navEndRight}>
          <div
            className={`${style.share} ${
              utility.theme === "light" && "whiteText"
            }`}
            style={
              !utility.isDisabledShare ? { backgroundColor: "#1A5FFF" } : {}
            }
          >
            Share
          </div>
          <div
            className={`${style.save} ${
              utility.theme === "light" && "whiteText"
            }`}
          >
            Save
          </div>
          <img src={close} alt="close" className={style.close} />
        </div>
      </div>
    </div>
  );
}

export default ResponseNav;