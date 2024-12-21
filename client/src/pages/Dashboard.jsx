import React from "react";

//css-
import style from "../css/dashboard.module.css";

//imports-
import DashboardNav from "../components/DashboardNav";
import DashboardFolder from "../components/DashboardFolder";
import DashboardForm from "../components/DashboardForm";

function Dashboard() {
  return (
    <div className={style.container}>
      <DashboardNav />
      <DashboardFolder />
      <DashboardForm />
    </div>
  );
}

export default Dashboard;
