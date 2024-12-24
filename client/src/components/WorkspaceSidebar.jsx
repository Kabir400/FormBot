import React, { useContext } from "react";

//css-
import style from "../css/workspace.module.css";

//imports-
import { bubbles, inputs } from "../utils/sidebarData.js";
import { dataContext, utilityContext } from "./Store.jsx";

function WorkspaceSidebar() {
  const [data, setData] = useContext(dataContext);
  const [utility, setUtility] = useContext(utilityContext);

  return (
    <div
      className={`${style.sidebarContainer} ${
        utility.theme === "light" && "whiteBg darkText lightShadow"
      }`}
    >
      <div className={style.sidebarBox}>
        <h4 className={style.sidebarText}>Bubbles</h4>
        <div className={style.sidebarBtnBox}>
          {bubbles.map((item, index) => {
            return (
              <div
                className={`${style.sidebarBtn} ${
                  utility.theme === "light" && "whiteBg darkText darkBorder"
                }`}
                key={index}
                onClick={() => {
                  setData({
                    ...data,
                    formContent: [
                      ...data.formContent,
                      { type: "bubble", value: item.name, placeholder: "" },
                    ],
                  });
                  setUtility({ ...utility, isDisabledShare: true });
                }}
              >
                <img
                  src={item.img}
                  className={style.sidebarBtnImg}
                  style={
                    item.name === "gif"
                      ? { height: "10px", marginTop: "5px" }
                      : {}
                  }
                />
                <p className={style.sidebarBtnText}>
                  {item.name[0].toUpperCase() + item.name.slice(1)}
                </p>
              </div>
            );
          })}
        </div>
        <h4 className={style.sidebarText}>Inputs</h4>
        <div className={style.sidebarBtnBox}>
          {inputs.map((item, index) => {
            return (
              <div
                className={`${style.sidebarBtn} ${
                  utility.theme === "light" && "whiteBg darkText darkBorder"
                }`}
                key={index}
                onClick={() => {
                  setData({
                    ...data,
                    formContent: [
                      ...data.formContent,
                      { type: "input", value: item.name, placeholder: "" },
                    ],
                  });
                  setUtility({ ...utility, isDisabledShare: true });
                }}
              >
                <img src={item.img} className={style.sidebarBtnImg} />
                <p className={style.sidebarBtnText}>{item.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default WorkspaceSidebar;
