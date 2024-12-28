//base url-
const base_url = import.meta.env.VITE_BASE_URL;

import React, { useEffect } from "react";

//css-
import style from "../css/dashboard.module.css";

//assets-
import bottomArrow from "../assets/bottomarrow.png";

//imports-
import Theme from "./Theme.jsx";
import { utilityContext, dataContext } from "./Store.jsx";
import { useContext, useState } from "react";
import getRequest from "../utils/getRequest.js";
import { useNavigate } from "react-router-dom";

function DashboardNav() {
  const [utility, setUtility] = useContext(utilityContext);
  const [data, setData] = useContext(dataContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userList, setUserList] = useState(["kabir"]);
  const [optionList, setOptionList] = useState(["Settings", "Logout"]);
  const navigate = useNavigate();

  //change dashboard---------------------------
  const changeDashboard = (item) => {
    const result = getRequest(`${base_url}/others/${item.id}`);

    if (result.suceess === true) {
      const forms = result.data.forms.filter((form) => form.folderId === null);

      setData({
        ...data,
        folders: result.data.folders,
        forms: result.data.forms,
        filterdForms: forms,
      });

      setData({ ...data, clickedDashboard: item });
    } else {
      if (result.status === 401) {
        navigate("/login");
      }
      toast.error(result.message, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  //-------------------------------------------

  useEffect(() => {
    (async () => {
      const result = await getRequest(`${base_url}/dashboards`);

      if (result.suceess === true) {
        setUserList(result.data);
        setData({ ...data, clickedDashboard: result.data[0] });
      } else {
        if (result.status === 401) {
          navigate("/login");
        }
        toast.error(result.message, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    })();
  }, []);

  return (
    <div
      className={`${style.nav} ${
        utility.theme === "light" && "darkBottomBorder"
      }`}
    >
      <div className={style.navBox}>
        {/* dropdown */}
        <div
          className={`${style.dropdown} ${
            utility.theme === "light" && "darkBorder"
          }`}
        >
          <div
            className={style.dropdownBox}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <p
              className={`${style.dropdownText} ${
                utility.theme === "light" && "darkText"
              }`}
            >
              {data?.clickedDashboard?.name}'s workspace
            </p>
            <img
              src={bottomArrow}
              className={`${style.dropdownArrow} ${
                utility.theme === "light" && "convertDark"
              }`}
            />
          </div>
          {/* -------other dashboards--------- */}
          {isDropdownOpen &&
            [...userList].map((item, index) => {
              if (item.id === data?.clickedDashboard?.id) {
                return;
              }
              return (
                <div
                  className={style.dropdownBox}
                  key={index}
                  style={{ borderTop: " 1px solid #ffffff29" }}
                  onClick={() => {
                    changeDashboard(item);
                  }}
                >
                  <p
                    className={`${style.dropdownText} ${
                      utility.theme === "light" && "darkText"
                    }`}
                  >
                    {item?.name}'s workspace
                  </p>
                </div>
              );
            })}
          {/* -------options--------- */}

          {isDropdownOpen &&
            [...optionList].map((item, index) => (
              <div
                className={style.dropdownBox}
                key={index}
                style={{ borderTop: " 1px solid #ffffff29" }}
              >
                <p
                  className={`${style.dropdownText} ${
                    utility.theme === "light" && "darkText"
                  }`}
                >
                  {item}
                </p>
              </div>
            ))}
        </div>
        {/* -------dropdown ends here--------- */}
        <div className={style.navBoxRight}>
          <Theme />
          <div
            className={`${style.share} ${
              utility.theme === "light" && "whiteText"
            }`}
          >
            Share
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardNav;
