//base url-
const base_url = import.meta.env.VITE_BASE_URL;

import React, { useContext, useState } from "react";

//css-
import style from "../css/createPopup.module.css";

//import
import { utilityContext, dataContext } from "../components/Store.jsx";
import postRequest from "../utils/postRequest.js";
import { toast } from "react-toastify";

function CreateFolderPopup() {
  const [utility, setUtility] = useContext(utilityContext);
  const [data, setData] = useContext(dataContext);
  const [text, setText] = useState("");
  const [isPending, setIsPending] = useState(false);

  const closePopup = () => {
    setUtility({ ...utility, createFolderPopup: false });
  };

  const createFolder = async () => {
    setIsPending(true);
    const result = await postRequest(
      `${base_url}/create/folder`,
      {
        title: text,
      },
      "json"
    );

    if (result.suceess) {
      setIsPending(false);
      setUtility({ ...utility, createFolderPopup: false });
      setData({ ...data, folders: [...data.folders, result.data] });
      toast.success(result.message, {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      if (result.status === 401) {
        navigate("/login");
      }
      setIsPending(false);
      toast.error(result.message, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  if (utility.createFolderPopup === false) {
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
        <h4 className={style.popupHeading}>Create New Folder</h4>
        <input
          type="text"
          placeholder="Enter folder name"
          className={`${style.popupInput} ${
            utility.theme === "light" && "popupLightInput"
          }`}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className={style.popupBtnBox}>
          <div className={style.doneBtn} onClick={createFolder}>
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

export default CreateFolderPopup;
