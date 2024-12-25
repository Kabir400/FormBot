//base url-
const base_url = import.meta.env.VITE_BASE_URL;

import React, { useContext, useState } from "react";

//css-
import style from "../css/createPopup.module.css";

//import
import { utilityContext, dataContext } from "../components/Store.jsx";
import postRequest from "../utils/postRequest.js";
import { toast } from "react-toastify";

function CreateFormPopup() {
  const [utility, setUtility] = useContext(utilityContext);
  const [data, setData] = useContext(dataContext);
  const [text, setText] = useState("");
  const [isPending, setIsPending] = useState(false);

  const closePopup = () => {
    setUtility({ ...utility, createFormPopup: false });
  };

  const createForm = async () => {
    setIsPending(true);
    const result = await postRequest(
      `${base_url}/create/form`,
      {
        title: text,
        folderId: data.selectedFolderId,
      },
      "json"
    );

    if (result.suceess) {
      setIsPending(false);
      setUtility({ ...utility, createFormPopup: false });
      setData({ ...data, forms: [...data.forms, result.data] });
      toast.success(result.message, {
        position: "top-right",
        autoClose: 3000,
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

  if (utility.createFormPopup === false) {
    return null;
  }

  return (
    <div className={style.popupContainer} onClick={closePopup}>
      <div
        className={`${style.popupBox} ${
          utility.theme === "light" && "popupLightBox"
        }`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h4 className={style.popupHeading}>Create New Form</h4>
        <input
          type="text"
          placeholder="Enter form name"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={`${style.popupInput} ${
            utility.theme === "light" && "popupLightInput"
          }`}
        />
        <div className={style.popupBtnBox}>
          <div className={style.doneBtn} onClick={createForm}>
            {isPending ? "Loading..." : "Done"}
          </div>
          <div className={style.cancelBtn} onClick={closePopup}>
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateFormPopup;
