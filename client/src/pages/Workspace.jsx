//base url-
const base_url = import.meta.env.VITE_BASE_URL;

import React, { useContext, useEffect, useState } from "react";

//css-
import style from "../css/workspace.module.css";

//imports-
import WorkspaceNav from "../components/WorkspaceNav.jsx";
import WorkspaceBody from "../components/WorkspaceBody.jsx";
import WorkspaceSidebar from "../components/WorkspaceSidebar.jsx";
import { dataContext, utilityContext } from "../components/Store.jsx";
import { toast } from "react-toastify";
import getRequest from "../utils/getRequest.js";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader.jsx";

function Workspace() {
  const [data, setData] = useContext(dataContext);
  const [utility, setUtility] = useContext(utilityContext);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      setIsPending(true);
      const result = await getRequest(`${base_url}/form/${id}`);

      if (result.suceess === true) {
        setIsPending(false);
        setData({
          ...data,
          formContent: result.data.content,
          formTitle: result.data.title,
        });
        if (result.data.content.length > 0) {
          setUtility({ ...utility, isDisabledShare: false });
        }
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
    })();
  }, []);

  if (isPending) {
    return (
      <div className={style.container}>
        <Loader />
      </div>
    );
  }

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
      {utility.isCopied && (
        <div
          className={`${style.copyContainer} ${
            utility.theme === "light" && "whiteBg darkText darkBorder"
          }`}
        >
          Link copied
        </div>
      )}
    </div>
  );
}

export default Workspace;
