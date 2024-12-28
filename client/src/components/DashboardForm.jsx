import React, { useContext } from "react";
import { utilityContext, dataContext } from "../components/Store.jsx";
import { useNavigate } from "react-router-dom";

//css-
import style from "../css/dashboard.module.css";

//assets-
import plus from "../assets/plus.png";
import remove from "../assets/delete.png";

function DashboardForm() {
  const [utility, setUtility] = useContext(utilityContext);
  const [data, setData] = useContext(dataContext);
  const navigate = useNavigate();

  return (
    <div className={style.formContainer}>
      {data.clickedDashboard.isOwner && (
        <div
          className={style.createFormBox}
          onClick={() => setUtility({ ...utility, createFormPopup: true })}
        >
          <img src={plus} className={style.plusImg} />
          <p className={style.createFormText}>Create a typebot</p>
        </div>
      )}

      {data.filterdForms.map((item, index) => (
        <div
          className={`${style.formBox} ${
            utility.theme === "light" && "grayBg whiteText"
          } `}
          key={index}
          onClick={() => navigate(`/workspace/${item._id}`)}
        >
          <p className={style.formText}>{item.title}</p>
          <img
            src={remove}
            className={style.removeImg}
            onClick={() =>
              setUtility({
                ...utility,
                DeleteFormPopup: true,
                DeleteFormId: item._id,
              })
            }
          />
        </div>
      ))}
    </div>
  );
}

export default DashboardForm;
