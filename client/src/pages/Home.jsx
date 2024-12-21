import React from "react";

//components-
import Nav from "../components/HomeNav.jsx";

//css-
import style from "../css/home.module.css";

function Home() {
  return (
    <div className={style.container}>
      <Nav />
    </div>
  );
}

export default Home;
