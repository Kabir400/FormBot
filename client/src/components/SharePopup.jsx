import React, { useContext, useState } from "react";

//css-
import style from "../css/sharePopup.module.css";

//imports-
import { utilityContext } from "./Store.jsx";

//assets-
import dropdownArrow from "../assets/dropdownarrow.png";
import close from "../assets/close.png";

function SharePopup() {
  const [utility, setUtility] = useContext(utilityContext);
  const [dropdownText, setDropdownText] = useState("View");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const closePopup = () => {
    setUtility({ ...utility, sharePopup: false });
  };

  if (utility.sharePopup === false) {
    return null;
  }

  return (
    <div onClick={closePopup} className={style.container}>
      <div className={style.box} onClick={(e) => e.stopPropagation()}>
        <div className={style.middleBox}>
          <div className={style.textContainer}>
            <p className={style.text}>Invite by Email</p>
            <div
              className={style.dropdownContainer}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <p className={style.dropdownText}>{dropdownText}</p>
              <img src={dropdownArrow} alt="dropdownArrow" />

              {isDropdownOpen && (
                <div className={style.dropdown}>
                  <p
                    className={style.dropdownText2}
                    onClick={() => {
                      setDropdownText("View");
                      setIsDropdownOpen(false);
                    }}
                    style={{ borderBottom: "0.2px solid #ffffff80" }}
                  >
                    View
                  </p>
                  <p
                    className={style.dropdownText2}
                    onClick={() => {
                      setDropdownText("Edit");
                      setIsDropdownOpen(false);
                    }}
                  >
                    Edit
                  </p>
                </div>
              )}
            </div>
          </div>
          <input
            type="text"
            className={style.input}
            placeholder="Enter email id"
          />
          <div className={style.btn}>Send Invite</div>

          <p className={style.text}>Invite by link</p>
          <div className={style.btn}>Copy link</div>
        </div>
      </div>
    </div>
  );
}

export default SharePopup;
