import React, { useEffect, useState } from "react";

//css-
import style from "../css/response.module.css";

//import-
import ResponseNav from "../components/ResponseNav.jsx";
import Stats from "../components/Stats.jsx";
import Table from "../components/Table.jsx";
import Chart from "../components/Chart.jsx";

function Responses() {
  return (
    <div className={style.container}>
      <ResponseNav />
      <div className={style.statsContainer}>
        <Stats title="Views" value="110" />
        <Stats title="Starts" value="65" />
      </div>
      <div className={style.tableContainer}>
        <Table />
      </div>
      <div className={style.chartContainer}>
        <Chart />
        <Stats title={"Completion rate"} value="33%" />

        <div className={style.chartCompletedBox}>
          <p className={style.chartCompletedText}>Completed</p>
          <p className={style.chartCompletedText}>33</p>
        </div>
      </div>
    </div>
  );
}

export default Responses;
