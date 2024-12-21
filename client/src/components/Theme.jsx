import React, { useState } from "react";

//css-
import style from "../css/dashboard.module.css";

function BlueSwitch() {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn((prev) => !prev);
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

export default BlueSwitch;
