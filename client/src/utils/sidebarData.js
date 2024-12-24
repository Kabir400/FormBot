import text from "../assets/text.png";
import text2 from "../assets/text2.png";
import img from "../assets/img.png";
import video from "../assets/video.png";
import gif from "../assets/gif.png";
import button from "../assets/button.png";
import date from "../assets/date.png";
import phone from "../assets/phone.png";
import email from "../assets/gmail.png";
import rating from "../assets/star.png";
import number from "../assets/number.png";

export const bubbles = [
  {
    img: text,
    name: "text",
  },
  {
    img: img,
    name: "image",
  },
  {
    img: video,
    name: "video",
  },
  {
    img: gif,
    name: "gif",
  },
];

export const inputs = [
  {
    img: text2,
    name: "text",
  },
  {
    img: number,
    name: "number",
  },
  {
    img: email,
    name: "email",
  },
  {
    img: phone,
    name: "phone",
  },
  {
    img: date,
    name: "date",
  },
  {
    img: rating,
    name: "rating",
  },
  {
    img: button,
    name: "button",
  },
];

export const formData = [
  {
    type: "bubble",
    value: "text",
    placeholder: "Enter text",
  },
  {
    type: "input",
    value: "text",
    placeholder: "",
  },

  {
    type: "bubble",
    value: "text",
    placeholder: "",
  },
  {
    type: "input",
    value: "text",
    placeholder: "",
  },
  {
    type: "bubble",
    value: "image",
    placeholder: "",
  },
  {
    type: "input",
    value: "email",
    placeholder: "",
  },
  {
    type: "input",
    value: "phone",
    placeholder: "",
  },
  {
    type: "input",
    value: "number",
    placeholder: "",
  },
  {
    type: "input",
    value: "date",
    placeholder: "",
  },
  {
    type: "input",
    value: "rating",
    placeholder: "",
  },
];
