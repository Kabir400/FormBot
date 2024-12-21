import React from "react";

//style-
import style from "../css/dashboard.module.css";

//assets-
import folder from "../assets/folder.png";
import remove from "../assets/delete.png";

function DashboardFolder() {
  return (
    <div className={style.folderContainer}>
      <div className={style.folderCreateBox}>
        <img src={folder} className={style.folderImg} />
        <p className={style.folderCreateText}>Create a folder</p>
      </div>
      {new Array(3).fill(0).map((_, index) => (
        <div className={style.folderBox} key={index}>
          <p className={style.folderText}>Folder Name</p>
          <img src={remove} className={style.folderRemove} />
        </div>
      ))}
    </div>
  );
}

export default DashboardFolder;
