import React, { useEffect, useState } from "react";

//css-
import style from "../css/formfill.module.css";

//assets-
import avater from "../assets/avater.png";
import send from "../assets/send.png";

//imports-
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formData, deta } from "../utils/sidebarData.js";

function FormFill() {
  const [formValues, setFormValues] = useState({});
  const [trimmedData, setTrimmedData] = useState([]);
  const [allData, setAllData] = useState([...deta, ...formData]);

  //handle change.........................
  const handleChange = (index, value) => {
    const formattedValue =
      value instanceof Date ? value.toISOString().split("T")[0] : value;

    setFormValues((prevValues) => ({
      ...prevValues,
      [index]: formattedValue,
    }));
  };

  //send handler-
  const sendHandler = (index) => {
    // Log the current input value
    console.log(formValues[index] || null);

    // Find the next input
    const nextInputIndex = allData
      .slice(trimmedData.length)
      .findIndex((item) => item.type === "input");

    // If another input exists, calculate the updated trimmedData
    if (nextInputIndex !== -1) {
      const newTrimmedData = allData.slice(
        0,
        trimmedData.length + nextInputIndex + 1
      );
      setTrimmedData(newTrimmedData);
    }
  };

  useEffect(() => {
    const index = allData.findIndex((item) => item.type === "input");
    if (index !== -1) {
      const initialTrimmedData = allData.slice(0, index + 1);
      setTrimmedData(initialTrimmedData);
    }
  }, []);

  return (
    <div className={style.container}>
      <div className={style.box}>
        {trimmedData.map((item, index) => {
          if (item.type === "bubble" && item.value === "text") {
            return (
              <div
                key={index}
                className={`${style.left} ${style.bubbleTextContainer}`}
              >
                <img src={avater} alt="Avatar" className={style.avater} />
                <div className={style.bubbleText}>{item.placeholder}</div>
              </div>
            );
          } else if (
            item.type === "bubble" &&
            (item.value === "gif" || item.value === "image")
          ) {
            return (
              <img
                key={index}
                src={item.placeholder}
                alt="Img"
                className={`${style.bubbleImage} ${style.left}`}
              />
            );
          } else if (item.type === "bubble" && item.value === "video") {
            return (
              <video
                key={index}
                src={item.placeholder}
                className={`${style.bubbleVideo} ${style.left}`}
                controls
              ></video>
            );
          } else if (
            item.type === "input" &&
            (item.value === "text" ||
              item.value === "email" ||
              item.value === "phone")
          ) {
            return (
              <div key={index} className={`${style.inputBox} ${style.right}`}>
                <input
                  type="text"
                  placeholder={`Enter your ${item.value}`}
                  className={style.inputText}
                  onChange={(e) => {
                    handleChange(index, e.target.value);
                  }}
                  value={formValues[index] || ""}
                />
                <div
                  className={style.sendBox}
                  onClick={() => {
                    sendHandler(index);
                  }}
                >
                  <img src={send} alt="send" className={style.sendImg} />
                </div>
              </div>
            );
          } else if (item.type === "input" && item.value === "number") {
            return (
              <div key={index} className={`${style.inputBox} ${style.right}`}>
                <input
                  type="text"
                  placeholder={`Enter a ${item.value}`}
                  className={style.inputText}
                  onChange={(e) => {
                    handleChange(index, e.target.value);
                  }}
                  value={formValues[index] || ""}
                />
                <div
                  className={style.sendBox}
                  onClick={() => {
                    sendHandler(index);
                  }}
                >
                  <img src={send} alt="send" className={style.sendImg} />
                </div>
              </div>
            );
          } else if (item.type === "input" && item.value === "date") {
            return (
              <div key={index} className={`${style.inputBox} ${style.right}`}>
                <DatePicker
                  selected={formValues[index] || null}
                  onChange={(date) => handleChange(index, date)}
                  placeholderText="Enter your date"
                  dateFormat="dd/MM/yyyy"
                  showPopperArrow={false}
                  className={style.datePicker}
                />
                <div
                  className={style.sendBox}
                  onClick={() => {
                    sendHandler(index);
                  }}
                >
                  <img src={send} alt="send" className={style.sendImg} />
                </div>
              </div>
            );
          } else if (item.type === "input" && item.value === "rating") {
            return (
              <div key={index} className={`${style.inputBox} ${style.right}`}>
                <div className={style.ratingBox}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`${style.star} ${
                        star === formValues[index] ? style.active : ""
                      }`}
                      onClick={() => handleChange(index, star)}
                    >
                      {star}
                    </span>
                  ))}
                </div>
                <div
                  className={style.sendBox}
                  onClick={() => {
                    sendHandler(index);
                  }}
                >
                  <img src={send} alt="send" className={style.sendImg} />
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default FormFill;
