import React from "react";

//components-
import Nav from "../components/HomeNav.jsx";
import Hero from "../components/Hero.jsx";
import HomeFooter from "../components/HomeFooter.jsx";

//css-
import style from "../css/home.module.css";

//img-
import heroTriangle from "../assets/herotriangle.png";
import heroSvg from "../assets/herosvg.png";
import heroBlueCircle from "../assets/herobluecircle.png";
import heroOrengeCircle from "../assets/heroorangecircle.png";
import heroImg from "../assets/heroimg.png";

function Home() {
  return (
    <div className={style.container}>
      <Nav />
      <Hero />
      <div className={style.imgContainer}>
        <img src={heroImg} alt="heroImg" className={style.heroImg} />
        <img src={heroBlueCircle} className={style.heroBlueCircle} />
        <img src={heroOrengeCircle} className={style.heroOrengeCircle} />
      </div>
      <HomeFooter />
      <img
        src={heroTriangle}
        alt="heroTriangle"
        className={style.heroTriangle}
      />
      <img src={heroSvg} alt="heroSvg" className={style.heroSvg} />
    </div>
  );
}

export default Home;
