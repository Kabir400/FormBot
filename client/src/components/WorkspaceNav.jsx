import React, { useContext } from "react";

//css-
import style from "../css/workspace.module.css";

//imports-
import Theme from "./Theme.jsx";
import { dataContext, utilityContext } from "./Store.jsx";

//img-
import close from "../assets/close.png";

function WorkspaceNav() {
  const [data, setData] = useContext(dataContext);
  const [utility, setUtility] = useContext(utilityContext);
  const handleSave = () => {
    console.log(data.formContent);
  };

  return (
    <div
      className={`${style.nav}  ${
        utility.theme === "light" && "whiteBg darkText darkBottomBorder"
      }`}
    >
      <input
        type="text"
        placeholder="Enter Form Name"
        className={`${style.navInput} ${
          utility.theme === "light" && "lightInput"
        }`}
      />
      <div className={style.navMiddle}>
        <div className={`${style.navMiddleText} ${style.navSelected}`}>
          Flow
        </div>
        <div className={style.navMiddleText}>Response</div>
      </div>

      <div className={style.navEnd}>
        <Theme />
        <div className={style.navEndRight}>
          <div
            className={`${style.share} ${
              utility.theme === "light" && "whiteText"
            }`}
          >
            Share
          </div>
          <div
            className={`${style.save} ${
              utility.theme === "light" && "whiteText"
            }`}
            onClick={handleSave}
          >
            Save
          </div>
          <img src={close} alt="close" className={style.close} />
        </div>
      </div>
    </div>
  );
}

export default WorkspaceNav;
