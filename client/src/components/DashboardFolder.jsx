//base url-
const base_url = import.meta.env.VITE_BASE_URL;

import React, { useContext } from "react";
import { utilityContext, dataContext } from "../components/Store.jsx";

//style-
import style from "../css/dashboard.module.css";

//assets-
import folder from "../assets/folder.png";
import remove from "../assets/delete.png";

function DashboardFolder() {
  const [utility, setUtility] = useContext(utilityContext);
  const [data, setData] = useContext(dataContext);

  const changeFolder = (item) => {
    const form = data.forms.filter((form) => form.folderId === item._id);
    setData({ ...data, selectedFolderId: item._id, filterdForms: form });
  };

  return (
    <div className={style.folderContainer}>
      {data.clickedDashboard.isOwner && (
        <div
          className={`${style.folderCreateBox} ${
            utility.theme === "light" && "grayBg"
          }`}
          onClick={() => setUtility({ ...utility, createFolderPopup: true })}
        >
          <img src={folder} className={style.folderImg} />
          <p className={style.folderCreateText}>Create a folder</p>
        </div>
      )}

      {data.folders.map((item, index) => (
        <div
          className={`${style.folderBox} ${
            data.selectedFolderId === item._id && style.active
          } ${utility.theme === "light" && "grayBg"} ${
            data.selectedFolderId === item._id &&
            utility.theme === "light" &&
            "darkBorder"
          }`}
          key={index}
          onClick={() => changeFolder(item)}
        >
          <p
            className={`${style.folderText} ${
              data.selectedFolderId === item._id && style.activeText
            }`}
          >
            {item.title}
          </p>
          <img
            src={remove}
            className={style.folderRemove}
            onClick={() => {
              setUtility({
                ...utility,
                DeleteFolderPopup: true,
                DeleteFolderId: item._id,
              });
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default DashboardFolder;
