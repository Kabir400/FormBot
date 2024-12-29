//base url-
const base_url = import.meta.env.VITE_BASE_URL;

import React, { useContext, useState } from "react";

//css-
import style from "../css/sharePopup.module.css";

//imports-
import { utilityContext } from "./Store.jsx";
import postRequest from "../utils/postRequest.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

//assets-
import dropdownArrow from "../assets/dropdownarrow.png";
import close from "../assets/close.png";

function SharePopup() {
  const [utility, setUtility] = useContext(utilityContext);
  const [dropdownText, setDropdownText] = useState("View");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailPending, setIsEmailPending] = useState(false);
  const [isLinkPending, setIsLinkPending] = useState(false);
  const navigate = useNavigate();

  const closePopup = () => {
    setUtility({ ...utility, sharePopup: false });
  };

  if (utility.sharePopup === false) {
    return null;
  }

  //----------------------------------------------
  const shareByEmail = async () => {
    const isEditable = dropdownText === "Edit";
    setIsEmailPending(true);
    const result = await postRequest(
      `${base_url}//assign`,
      {
        email: email,
        isEditable: isEditable,
      },
      "json"
    );
    if (result.suceess === true) {
      closePopup();
      setIsEmailPending(false);
      toast.success(result.message, {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      if (result.status === 401) {
        navigate("/login");
      }

      setIsEmailPending(false);
      toast.error(result.message, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  //----------------------------------------------

  const shareByLink = async () => {
    const isEditable = dropdownText === "Edit";
    setIsLinkPending(true);

    const result = await postRequest(
      `${base_url}/assign/token`,
      {
        isEditable: isEditable,
      },
      "json"
    );

    if (result.suceess === true) {
      closePopup();
      setIsLinkPending(false);
      const textToCopy = `${window.location.origin}/grant/access/${result.data}`;
      navigator.clipboard.writeText(textToCopy);
      toast.success("Link Copied Sucessfully", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      if (result.status === 401) {
        navigate("/login");
      }
      setIsLinkPending(false);
      toast.error(result.message, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={style.input}
            placeholder="Enter email id"
          />
          <div className={style.btn} onClick={shareByEmail}>
            {isEmailPending ? "Loading..." : "Send Invite"}
          </div>

          <p className={style.text}>Invite by link</p>
          <div className={style.btn} onClick={shareByLink}>
            {isLinkPending ? "Loading..." : "Copy link"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SharePopup;
