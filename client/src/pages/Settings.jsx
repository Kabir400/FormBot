//base url-
const base_url = import.meta.env.VITE_BASE_URL;

import React, { useState, useContext } from "react";
import postRequest from "../utils/postRequest.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { utilityContext } from "../components/Store.jsx";

//css-
import style from "../css/settings.module.css";

//img-
import key from "../assets/key.png";
import name from "../assets/name.png";
import logout from "../assets/logout.png";

function Settings() {
  const [data, setData] = useState({
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });
  const [utility, setUtility] = useContext(utilityContext);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  //submit handler--------------
  const submitHandler = async () => {
    setIsPending(true);
    const result = await postRequest(`${base_url}/update/user`, data, "json");

    if (result.suceess === true) {
      setIsPending(false);
      toast.success(result.message, {
        position: "top-right",
        autoClose: 3000,
      });
      setData({
        name: "",
        email: "",
        oldPassword: "",
        newPassword: "",
      });
    } else {
      setIsPending(false);
      if (result.status === 401) {
        navigate("/login");
      }
      toast.error(result.message, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  //------------------------------------------------

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
    toast.success("Logout Successfully", {
      position: "top-right",
      autoClose: 3000,
    });
  };
  return (
    <div
      className={`${style.container} ${
        utility.theme === "light" && "whiteBg darkText"
      }`}
    >
      <div className={style.box}>
        <p className={style.heading}>Settings</p>
        <div className={style.body}>
          <div className={style.inputBox}>
            <img src={name} className={style.profile} />
            <input
              type="text"
              placeholder="Name"
              className={`${style.input} ${
                utility.theme === "light" && "lightInput"
              }`}
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div className={style.inputBox}>
            <img src={key} className={style.profile} />
            <input
              type="text"
              placeholder="Update Email"
              className={`${style.input} ${
                utility.theme === "light" && "lightInput"
              }`}
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>{" "}
          <div className={style.inputBox}>
            <img src={key} className={style.profile} />
            <input
              type="text"
              placeholder="Old Password"
              className={`${style.input} ${
                utility.theme === "light" && "lightInput"
              }`}
              value={data.oldPassword}
              onChange={(e) =>
                setData({ ...data, oldPassword: e.target.value })
              }
            />
          </div>{" "}
          <div className={style.inputBox}>
            <img src={key} className={style.profile} />
            <input
              type="text"
              placeholder="New Password"
              className={`${style.input} ${
                utility.theme === "light" && "lightInput"
              }`}
              value={data.newPassword}
              onChange={(e) =>
                setData({ ...data, newPassword: e.target.value })
              }
            />
          </div>
        </div>

        <div
          className={`${style.btn} ${utility.theme === "light" && "whiteText"}`}
          onClick={submitHandler}
        >
          {isPending ? "Loading..." : "Update"}
        </div>
      </div>

      <div className={style.logoutContainer} onClick={logoutHandler}>
        <img src={logout} className={style.logoutIcon} />
        <p className={style.logoutText}>Logout</p>
      </div>
    </div>
  );
}

export default Settings;
