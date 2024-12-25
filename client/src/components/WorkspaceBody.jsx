import React, { useContext } from "react";

//css-
import style from "../css/workspace.module.css";

//img-
import flag from "../assets/flag.png";
import remove from "../assets/delete.png";

//import-
import { dataContext, utilityContext } from "./Store.jsx";

function WorkspaceBody() {
  const [data, setData] = useContext(dataContext);
  const [utility, setUtility] = useContext(utilityContext);
  const counter = {};

  // Handle input change
  const handleInputChange = (index, value) => {
    const updatedFormContent = [...data.formContent];
    // Update placeholder
    updatedFormContent[index].placeholder = value;
    setData({ ...data, formContent: updatedFormContent });
  };

  //handle remove
  const handleRemove = (index) => {
    const updatedFormContent = [...data.formContent];
    updatedFormContent.splice(index, 1);
    setData({ ...data, formContent: updatedFormContent });
  };

  return (
    <div className={style.bodyContainer}>
      <div
        className={`${style.startBtn} ${
          utility.theme === "light" && "whiteBg darkText darkBorder"
        }`}
      >
        <img
          src={flag}
          alt="flag"
          className={`${style.flag} ${
            utility.theme === "light" && "convertBlue"
          }`}
        />
        <p className={style.startBtnText}>Start</p>
      </div>
      {data.formContent.map((item, index) => {
        let placeholder = "";
        let subTitle = "";
        const key = `${item.type}-${item.value}`;
        counter[key] = (counter[key] || 0) + 1;

        if (item.type === "bubble") {
          if (item.value === "text") {
            placeholder = "Click here to edit";
          } else {
            placeholder = "Click to add link";
          }
        } else if (item.type === "input" && item.value != "button") {
          if (item.value === "number") {
            subTitle = "Hint : User will input a number on his form";
          } else if (item.value === "email") {
            subTitle = "Hint : User will input an email on his form";
          } else if (item.value === "phone") {
            subTitle = "Hint : User will input a phone on his form";
          } else if (item.value === "rating") {
            subTitle = "Hint : User will input a rating on his form";
          } else if (item.value === "date") {
            subTitle = "Hint : User will input a date on his form";
          } else if (item.value === "text") {
            subTitle = "Hint : User will input a text on his form";
          }
        }

        return (
          <div
            className={`${style.bodyBox} ${
              utility.theme === "light" && "whiteBg darkText darkBorder"
            }`}
            key={index}
          >
            <h5 className={style.bodyBoxText}>
              {item.type === "input" && "Input "}
              {item.value[0].toUpperCase() + item.value.slice(1) + " "}
              {counter[`${item.type}-${item.value}`]}
            </h5>

            {item.type === "bubble" ? (
              <>
                <input
                  type="text"
                  placeholder={placeholder}
                  className={`${style.bodyBoxInput} ${
                    utility.theme === "light" && "lightInput"
                  } ${utility.validationError[index] ? style.errorInput : ""}`}
                  value={item.placeholder}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
                {utility.validationError[index] && (
                  <p className={style.errorText}>
                    {utility.validationError[index]}
                  </p>
                )}
              </>
            ) : item.type === "input" && item.value !== "button" ? (
              <p className={style.bodyBoxSubText}>{subTitle}</p>
            ) : (
              <>
                <input
                  type="text"
                  className={`${style.bodyBoxInput} ${
                    utility.theme === "light" && "lightInput"
                  } ${utility.validationError[index] ? style.errorInput : ""}`}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  value={item.placeholder}
                />
                {utility.validationError[index] && (
                  <p className={style.errorText}>
                    {utility.validationError[index]}
                  </p>
                )}
              </>
            )}

            <div
              className={`${style.removeBox} ${
                utility.theme === "light" && "whiteBg darkBorder"
              }`}
              onClick={() => {
                handleRemove(index);
              }}
            >
              <img src={remove} alt="remove" className={style.remove} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default WorkspaceBody;
