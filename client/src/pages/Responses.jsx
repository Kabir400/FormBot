//base url-
const base_url = import.meta.env.VITE_BASE_URL;

import React, { useEffect, useState, useContext } from "react";

//css-
import style from "../css/response.module.css";

//import-
import ResponseNav from "../components/ResponseNav.jsx";
import Stats from "../components/Stats.jsx";
import Table from "../components/Table.jsx";
import Chart from "../components/Chart.jsx";
import getRequest from "../utils/getRequest.js";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader.jsx";
import { utilityContext } from "../components/Store.jsx";

function Responses() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [responseData, setResponseData] = useState([]);
  const [form, setForm] = useState({});
  const [isPending, setIsPending] = useState(false);
  const [utility, setUtility] = useContext(utilityContext);

  useEffect(() => {
    (async () => {
      setIsPending(true);
      const result = await getRequest(`${base_url}/responses/${id}`);

      if (result.suceess === true) {
        setIsPending(false);
        setResponseData(result.data.responses);
        setForm(result.data.form);
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
      <ResponseNav />
      <div className={style.statsContainer}>
        <Stats title="Views" value={form?.views} />
        <Stats title="Starts" value={form?.starts} />
      </div>
      <div className={style.tableContainer}>
        <Table responseData={responseData} />
      </div>
      <div className={style.chartContainer}>
        <Chart starts={form?.starts} completed={form?.completed} />
        <Stats
          title={"Completion rate"}
          value={Math.floor((form?.completed / form?.starts) * 100) + "%"}
        />

        <div className={style.chartCompletedBox}>
          <p className={style.chartCompletedText}>Completed</p>
          <p className={style.chartCompletedText}>{form?.completed}</p>
        </div>
      </div>
    </div>
  );
}

export default Responses;
