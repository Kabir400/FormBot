//base url-
const base_url = import.meta.env.VITE_BASE_URL;

import React, { useEffect, useState } from "react";

//css-
import style from "../css/formfill.module.css";

//assets-
import avater from "../assets/avater.png";
import send from "../assets/send.png";

//imports-
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { deta } from "../utils/sidebarData.js";
import getRequest from "../utils/getRequest.js";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader.jsx";
import postRequest from "../utils/postRequest.js";
import { useNavigate } from "react-router-dom";

function FormFill() {
  const [formValues, setFormValues] = useState({});
  const [trimmedData, setTrimmedData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [isSubmited, setIsSubmited] = useState(false);
  const [disabled, setDisabled] = useState({});
  const [isPending, setIsPending] = useState(false);
  const [theme, setTheme] = useState("light");
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch formData from backend
  useEffect(() => {
    (async () => {
      setIsPending(true);
      const result = await getRequest(`${base_url}/fill/form/${id}`);
      if (result.suceess === true) {
        setIsPending(false);
        setAllData([...deta, ...result.data.content]);
        setTheme(result.data.theme);
      } else {
        setIsPending(false);

        toast.error(result.message, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    })();
  }, []);
  //--------------------------------------------

  // Handle change.........................
  const handleChange = (index, value) => {
    const formattedValue =
      value instanceof Date ? value.toISOString().split("T")[0] : value;

    setFormValues((prevValues) => ({
      ...prevValues,
      [index]: formattedValue,
    }));
  };
  //--------------------------------------------

  // Send handler----------------------------------
  const sendHandler = (index, item) => {
    let data = {};
    let url = ``;
    let isBtn = false;
    //request to create response-
    if (index === 1) {
      data = {
        email: formValues[1],
        formId: id,
      };
      url = `${base_url}/create/response`;
    } else if (index === 3) {
      data = {
        name: formValues[3],
        email: formValues[1],
        formId: id,
      };
      url = `${base_url}/update/response`;
    } else if (item.value === "button") {
      isBtn = true;
      data = {
        email: formValues[1],
        formId: id,
        content: {
          field: item.value,
          value: item.placeholder,
        },
      };
      url = `${base_url}/update/response`;
    } else {
      data = {
        email: formValues[1],
        formId: id,
        content: {
          field: item.value,
          value: formValues[index],
        },
      };
      url = `${base_url}/update/response`;
    }

    (async () => {
      const result = await postRequest(url, data, "json");
      if (result.suceess === true) {
        if (result.status === 202) {
          trimDataHandler();
          disableHandler(index);

          //if user already responded but not submited fetch the name-
          if (result.data.name) {
            const newTrimmedData = allData.slice(0, 4);
            disableHandler(3);
            setTrimmedData(newTrimmedData);
            setFormValues((prevValues) => ({
              ...prevValues,
              [3]: result.data.name,
            }));

            // Update trimmedData based on the latest state
            setTrimmedData((prev) => {
              const nextInputIndex = allData
                .slice(prev.length)
                .findIndex((item) => item.type === "input");

              if (nextInputIndex !== -1) {
                return allData.slice(0, prev.length + nextInputIndex + 1);
              }

              return prev; // Return the previous state if no new input is found
            });
          }
        } else {
          trimDataHandler();
          disableHandler(index);
          if (isBtn) {
            setIsSubmited(true);
            toast.success(result.message, {
              position: "top-right",
              autoClose: 3000,
            });
            navigate("/");
          }
        }
      } else {
        toast.error(result.message, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    })();
  };
  //---------------------------------------------------

  //trimmedData handler-----------------------
  const trimDataHandler = () => {
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

  //------------------------------------------------

  // Disable handler--------------------------------
  const disableHandler = (index) => {
    setDisabled((prevDisabled) => ({
      ...prevDisabled,
      [index]: true,
    }));
  };
  //-----------------------------------------------

  useEffect(() => {
    if (allData.length > 0) {
      const index = allData.findIndex((item) => item.type === "input");
      if (index !== -1) {
        const initialTrimmedData = allData.slice(0, index + 1);
        setTrimmedData(initialTrimmedData);
      }
    }
  }, [allData]);

  if (isPending) {
    return <Loader />;
  }

  return (
    <div
      className={`${style.container} ${theme === "dark" && "darkBg whiteText"}`}
    >
      <div className={style.box}>
        {trimmedData.map((item, index) => {
          if (item.type === "bubble" && item.value === "text") {
            return (
              <div
                key={index}
                className={`${style.left} ${style.bubbleTextContainer}`}
              >
                <img src={avater} alt="Avatar" className={style.avater} />
                <div
                  className={`${style.bubbleText} ${
                    theme === "dark" && "lightGrayBg"
                  }`}
                >
                  {item.placeholder}
                </div>
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
          } else if (item.type === "input" && item.value === "text") {
            if (disabled[index]) {
              return (
                <div
                  key={index}
                  className={`${style.buttonContainer} ${style.right} ${style.buttonSubmited}
                `}
                >
                  {formValues[index]}
                </div>
              );
            }

            return (
              <div key={index} className={`${style.inputBox} ${style.right}`}>
                <input
                  type="text"
                  placeholder={`Enter your ${item.value}`}
                  className={`${style.inputText} ${
                    theme === "dark" && style.disabledInputText
                  }`}
                  readOnly={disabled[index]}
                  onChange={(e) => {
                    handleChange(index, e.target.value);
                  }}
                  value={formValues[index] || ""}
                />
                <div
                  className={`${style.sendBox} ${
                    theme === "dark" && style.disbledSendBox
                  }`}
                  onClick={() => {
                    if (disabled[index]) return;
                    sendHandler(index, item);
                  }}
                >
                  <img src={send} alt="send" className={style.sendImg} />
                </div>
              </div>
            );
          } else if (
            item.type === "input" &&
            (item.value === "email" || item.value === "phone")
          ) {
            return (
              <div key={index} className={`${style.inputBox} ${style.right}`}>
                <input
                  type="text"
                  placeholder={`Enter your ${item.value}`}
                  className={`${style.inputText} ${
                    disabled[index] && style.disabledInputText
                  } ${theme === "dark" && style.disabledInputText}`}
                  readOnly={disabled[index]}
                  onChange={(e) => {
                    handleChange(index, e.target.value);
                  }}
                  value={formValues[index] || ""}
                />
                <div
                  className={`${style.sendBox} ${
                    disabled[index] && style.disbledSendBox
                  } ${theme === "dark" && style.disbledSendBox}`}
                  onClick={() => {
                    if (disabled[index]) return;
                    sendHandler(index, item);
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
                  className={`${style.inputText} ${
                    disabled[index] && style.disabledInputText
                  } ${theme === "dark" && style.disabledInputText}`}
                  readOnly={disabled[index]}
                  onChange={(e) => {
                    handleChange(index, e.target.value);
                  }}
                  value={formValues[index] || ""}
                />
                <div
                  className={`${style.sendBox} ${
                    disabled[index] && style.disbledSendBox
                  } ${theme === "dark" && style.disbledSendBox}`}
                  onClick={() => {
                    if (disabled[index]) return;
                    sendHandler(index, item);
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
                  readOnly={disabled[index]}
                  dateFormat="dd/MM/yyyy"
                  showPopperArrow={false}
                  className={`${style.datePicker} ${
                    disabled[index] && style.disabledInputText
                  } ${theme === "dark" && style.disabledInputText}`}
                />
                <div
                  className={`${style.sendBox} ${
                    disabled[index] && style.disbledSendBox
                  } ${theme === "dark" && style.disbledSendBox}`}
                  onClick={() => {
                    if (disabled[index]) return;
                    sendHandler(index, item);
                  }}
                >
                  <img src={send} alt="send" className={style.sendImg} />
                </div>
              </div>
            );
          } else if (item.type === "input" && item.value === "rating") {
            return (
              <div key={index} className={`${style.inputBox} ${style.right}`}>
                <div
                  className={`${style.ratingBox} ${
                    disabled[index] && style.disabledInputText
                  } ${theme === "dark" && style.disabledInputText}`}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`${style.star} ${
                        star === formValues[index] ? style.active : ""
                      }`}
                      onClick={() => {
                        if (disabled[index]) return;
                        handleChange(index, star);
                      }}
                    >
                      {star}
                    </span>
                  ))}
                </div>
                <div
                  className={`${style.sendBox} ${
                    disabled[index] && style.disbledSendBox
                  } ${theme === "dark" && style.disbledSendBox}`}
                  onClick={() => {
                    if (disabled[index]) return;
                    sendHandler(index, item);
                  }}
                >
                  <img src={send} alt="send" className={style.sendImg} />
                </div>
              </div>
            );
          } else if (item.type === "input" && item.value === "button") {
            return (
              <div
                key={index}
                className={`${style.buttonContainer} ${style.right} ${
                  isSubmited && style.buttonSubmited
                }`}
                onClick={() => {
                  sendHandler(index, item);
                }}
              >
                {item.placeholder}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default FormFill;
