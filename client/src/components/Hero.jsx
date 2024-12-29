import React from "react";
import { useNavigate } from "react-router-dom";

//css-
import style from "../css/home.module.css";

function Hero() {
  const navigate = useNavigate();

  return (
    <div className={style.heroContainer}>
      <h2 className={style.heroHeading}>Build advanced chatbots visually</h2>
      <p className={style.heroText}>
        Typebot gives you powerful blocks to create unique chat experiences.
        Embed them anywhere on your web/mobile apps and start collecting results
        like magic.
      </p>
      <div
        className={style.heroBtn}
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        Create a FormBot for free
      </div>
    </div>
  );
}

export default Hero;
