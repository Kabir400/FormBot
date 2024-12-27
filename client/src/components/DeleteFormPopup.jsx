//base url-
const base_url = import.meta.env.VITE_BASE_URL;

import React, { useContext, useState } from "react";

//css-
import style from "../css/createPopup.module.css";

//import
import { utilityContext, dataContext } from "./Store.jsx";
import postRequest from "../utils/postRequest.js";
import { toast } from "react-toastify";

function DeleteFormPopup() {
  const [utility, setUtility] = useContext(utilityContext);
  const [data, setData] = useContext(dataContext);
  const [isPending, setIsPending] = useState(false);

  const closePopup = () => {
    setUtility({ ...utility, DeleteFormPopup: false });
  };

  const deleteForm = async () => {
    setIsPending(true);
    const result = await postRequest(
      `${base_url}/delete/form`,
      {
        formId: utility.DeleteFormId,
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
        forms: data.forms.filter((forms) => forms._id !== utility.DeleteFormId),
      });
      setUtility({
        ...utility,
        DeleteFormPopup: false,
        DeleteFormId: null,
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

  if (utility.DeleteFormPopup === false) {
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
          Are you sure you want to delete this form ?
        </h4>

        <div className={style.popupBtnBox}>
          <div className={style.doneBtn} onClick={deleteForm}>
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

export default DeleteFormPopup;
