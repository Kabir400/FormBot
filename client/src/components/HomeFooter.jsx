import React from "react";

//css-
import style from "../css/home.module.css";

//assets-
import logo from "../assets/logo.png";
import link from "../assets/link.png";

function HomeFooter() {
  return (
    <div className={style.footerContainer}>
      {/* box1 */}
      <div className={style.box1}>
        <div className={style.footerLogoBox}>
          <img src={logo} alt="logo" className={style.logo} />
          <p className={style.footerLogoText}>FormBot</p>
        </div>
        <p className={style.box1Text}>
          Made with ❤️ by <br /> @cuvette
        </p>
      </div>
      {/* box2 */}
      <div className={style.box}>
        <h4 className={style.boxHeading}>Product</h4>
        <div className={style.boxTextContainer}>
          <div className={style.linkBox}>
            <p className={style.link}>Status</p>
            <img src={link} className={style.linkImg} />
          </div>{" "}
          <div className={style.linkBox}>
            <p className={style.link}>Documentation</p>
            <img src={link} className={style.linkImg} />
          </div>{" "}
          <div className={style.linkBox}>
            <p className={style.link}>Roadmap</p>
            <img src={link} className={style.linkImg} />
          </div>{" "}
          <p className={style.link}>Pricing</p>
        </div>
      </div>
      {/* box3 */}
      <div className={style.box}>
        <h4 className={style.boxHeading}>Community</h4>
        <div className={style.boxTextContainer}>
          <div className={style.linkBox}>
            <p className={style.link}>Discord</p>
            <img src={link} className={style.linkImg} />
          </div>{" "}
          <div className={style.linkBox}>
            <p className={style.link}>GitHub repository</p>
            <img src={link} className={style.linkImg} />
          </div>{" "}
          <div className={style.linkBox}>
            <p className={style.link}>Twitter</p>
            <img src={link} className={style.linkImg} />
          </div>{" "}
          <div className={style.linkBox}>
            <p className={style.link}>LinkedIn</p>
            <img src={link} className={style.linkImg} />
          </div>{" "}
          <p className={style.link}>OSS Friends</p>
        </div>
      </div>

      {/* box4 */}
      <div className={style.box}>
        <h4 className={style.boxHeading}>Company</h4>
        <div className={style.boxTextContainer}>
          <p className={style.link}>About</p>
          <p className={style.link}>Contact</p>
          <p className={style.link}>Terms of Service</p>
          <p className={style.link}>Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}

export default HomeFooter;
