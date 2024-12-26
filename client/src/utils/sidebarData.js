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
    value: "rating",
    placeholder: "Enter text",
  },
  {
    type: "input",
    value: "button",
    placeholder: "Submit",
  },
];

export const deta = [
  {
    type: "bubble",
    value: "text",
    placeholder: "Enter your email",
  },
  {
    type: "input",
    value: "email",
    placeholder: "",
  },
  {
    type: "bubble",
    value: "text",
    placeholder: "Enter your name",
  },
  {
    type: "input",
    value: "text",
    placeholder: "",
  },
];
