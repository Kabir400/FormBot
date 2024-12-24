import React, { useContext } from "react";

//css-
import style from "../css/workspace.module.css";

//imports-
import WorkspaceNav from "../components/WorkspaceNav.jsx";
import WorkspaceBody from "../components/WorkspaceBody.jsx";
import WorkspaceSidebar from "../components/WorkspaceSidebar.jsx";
import { dataContext, utilityContext } from "../components/Store.jsx";

function Workspace() {
  const [data, setData] = useContext(dataContext);
  const [utility, setUtility] = useContext(utilityContext);

  return (
    <div
      className={`${style.container} ${
        utility.theme === "light" && "whiteBg darkText"
      }`}
    >
      <WorkspaceNav />
      <div className={style.box}>
        <WorkspaceSidebar />
        <WorkspaceBody />
      </div>
    </div>
  );
}

export default Workspace;
