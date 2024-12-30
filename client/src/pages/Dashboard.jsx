//base url-
const base_url = import.meta.env.VITE_BASE_URL;

import React, { useContext, useEffect, useState } from "react";
import { dataContext, utilityContext } from "../components/Store.jsx";

//css-
import style from "../css/dashboard.module.css";

//imports-
import DashboardNav from "../components/DashboardNav";
import DashboardFolder from "../components/DashboardFolder";
import DashboardForm from "../components/DashboardForm";
import getRequest from "../utils/getRequest.js";
import Loader from "../components/Loader.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [data, setData] = useContext(dataContext);
  const [utility, setUtility] = useContext(utilityContext);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setIsPending(true);
      const result = await getRequest(`${base_url}/data`);

      if (result.suceess === true) {
        setIsPending(false);
        const forms = result.data.forms.filter(
          (form) => form.folderId === null
        );

        setData({
          ...data,
          folders: result.data.folders,
          forms: result.data.forms,
          filterdForms: forms,
          selectedFolderId: null,
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
    })();
  }, []);

  if (isPending) {
    return (
      <div
        className={`${style.container} ${
          utility.theme === "light" && "whiteBg darkText"
        }`}
      >
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
      <DashboardNav />
      <DashboardFolder />
      <DashboardForm />
    </div>
  );
}

export default Dashboard;
