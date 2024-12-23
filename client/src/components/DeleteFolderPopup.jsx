//base url-
const base_url = import.meta.env.VITE_BASE_URL;

import React, { useContext, useState } from "react";

//css-
import style from "../css/createPopup.module.css";

//import
import { utilityContext, dataContext } from "./Store.jsx";
import postRequest from "../utils/postRequest.js";
import { toast } from "react-toastify";

function DeleteFolderPopup() {
  const [utility, setUtility] = useContext(utilityContext);
  const [data, setData] = useContext(dataContext);
  const [isPending, setIsPending] = useState(false);

  const closePopup = () => {
    setUtility({ ...utility, DeleteFolderPopup: false });
  };

  const DeleteFolderPopup = async () => {
    setIsPending(true);
    const result = await postRequest(
      `${base_url}/delete/folder`,
      {
        folderId: utility.DeleteFolderId,
      },
      "json"
    );
    if (result.suceess === true) {
      setIsPending(false);
      toast.success(result.message, {
        position: "top-right",
        autoClose: 3000,
      });
      setData({
        ...data,
        folders: data.folders.filter(
          (folder) => folder._id !== utility.DeleteFolderId
        ),
        forms: data.forms.filter(
          (form) => form.folderId !== utility.DeleteFolderId
        ),
      });
      setUtility({
        ...utility,
        DeleteFolderPopup: false,
        DeleteFolderId: null,
      });
    } else {
      setIsPending(false);
      toast.error(result.message, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  if (utility.DeleteFolderPopup === false) {
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
        <h4
          className={style.popupHeading}
          style={{
            fontWeight: "600",
            textAlign: "center",
            fontSize: "19px",
            marginBottom: "13px",
          }}
        >
          Are you sure you want to delete this folder ?
        </h4>

        <div className={style.popupBtnBox}>
          <div className={style.doneBtn} onClick={DeleteFolderPopup}>
            {isPending ? "Loading..." : "Confirm"}
          </div>
          <div className={style.cancelBtn} onClick={closePopup}>
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteFolderPopup;
