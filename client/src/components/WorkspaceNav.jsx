//base url-
const base_url = import.meta.env.VITE_BASE_URL;

import React, { useContext } from "react";

//css-
import style from "../css/workspace.module.css";

//imports-
import Theme from "./Theme.jsx";
import { dataContext, utilityContext } from "./Store.jsx";
import postRequest from "../utils/postRequest.js";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

//img-
import close from "../assets/close.png";

function WorkspaceNav() {
  const navigate = useNavigate();
  const [data, setData] = useContext(dataContext);
  const [utility, setUtility] = useContext(utilityContext);

  const { id } = useParams();

  //handle save-------------------------------------------
  const handleSave = async () => {
    //client validaton--
    const errors = {};

    data.formContent.forEach((item, index) => {
      if (
        item.type === "bubble" ||
        (item.type === "input" && item.value === "button")
      ) {
        if (!item.placeholder || item.placeholder.trim() === "") {
          errors[index] = "Required Field";
        }
      }
    });

    if (Object.keys(errors).length > 0) {
      setUtility({
        ...utility,
        validationError: errors,
      });
      return;
    }

    //..............................................

    const toastId = toast.loading("Saving changes...", {
      position: "top-right",
      autoClose: false, // Prevent auto-closing while loading
    });
    try {
      const result = await postRequest(
        `${base_url}/update/form`,
        {
          content: data.formContent,
          title: data.formTitle,
          formId: id,
          theme: utility.theme,
        },
        "json"
      );

      if (result.suceess === true) {
        setData({
          ...data,
          formContent: result.data.content,
          formTitle: result.data.title,
        });
        setUtility({ ...utility, isDisabledShare: false, validationError: {} });
        toast.update(toastId, {
          render: result.message,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        if (result.status === 401) {
          navigate("/login");
        }

        toast.update(toastId, {
          render: result.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.update(toastId, {
        render: "An error occurred while saving.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };
  //..........................................................
  //handle share
  const handleShare = () => {
    if (!utility.isDisabledShare) {
      navigator.clipboard
        .writeText(`${window.location.origin}/fill/form/${id}`)
        .then(() => {
          setUtility({ ...utility, isCopied: true });
          setTimeout(() => setUtility({ ...utility, isCopied: false }), 2000);
        });
    }
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
        value={data.formTitle}
        onChange={(e) => setData({ ...data, formTitle: e.target.value })}
        className={`${style.navInput} ${
          utility.theme === "light" && "lightInput"
        }`}
      />
      <div className={style.navMiddle}>
        <div className={`${style.navMiddleText} ${style.navSelected}`}>
          Flow
        </div>
        <div
          className={style.navMiddleText}
          onClick={() => navigate(`/responses/${id}`)}
        >
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
            onClick={handleShare}
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
          <img
            src={close}
            alt="close"
            className={style.close}
            onClick={() => navigate("/dashboard")}
          />
        </div>
      </div>
    </div>
  );
}

export default WorkspaceNav;
