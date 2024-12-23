import React, { useState, useContext, useEffect } from "react";
import { utilityContext } from "./Store.jsx";

//css-
import style from "../css/dashboard.module.css";

function Switch() {
  const [utility, setUtility] = useContext(utilityContext);
  const [isOn, setIsOn] = useState(utility.theme === "dark");

  useEffect(() => {
    setIsOn(utility.theme === "dark");
  }, [utility.theme]);

  const handleToggle = () => {
    const newTheme = isOn ? "light" : "dark";
    setIsOn(!isOn);
    setUtility({ ...utility, theme: newTheme });
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className={style.themeContainer}>
      <p className={style.themeText}>Light</p>

      <div
        onClick={handleToggle}
        className={style.themeSwitch}
        style={{
          backgroundColor: isOn ? "#007BFF" : "#ccc",
        }}
      >
        <div
          className={style.themeSwitchBtn}
          style={{
            left: isOn ? "30px" : "3px",
          }}
        ></div>
      </div>
      <p className={style.themeText}>Dark</p>
    </div>
  );
}

export default Switch;
