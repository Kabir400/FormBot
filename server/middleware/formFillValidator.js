const { body } = require("express-validator");
const mongoose = require("mongoose");

const formFillValidator = [
  // Validate email (required)
  body("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  // Validate formId (required)
  body("formId")
    .exists()
    .withMessage("formId is required")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid form ID"),

  // Validate name (optional)
  body("name").optional().isString().withMessage("Name must be a string"),

  // Validate single content object (required)
  body("content")
    .optional()
    .isObject()
    .withMessage("Content must be a single object")
    .custom((content) => {
      if (
        ![
          "text",
          "number",
          "email",
          "phone",
          "rating",
          "date",
          "button",
        ].includes(content.field)
      ) {
        throw new Error(`Invalid field type: ${content.field}`);
      }
      if (content.field === "text" && typeof content.value !== "string") {
        throw new Error("Field 'text' must have a string value");
      }
      if (content.field === "number" && isNaN(Number(content.value))) {
        throw new Error("Field 'number' must have a numeric value");
      }
      if (content.field === "email" && !/^\S+@\S+\.\S+$/.test(content.value)) {
        throw new Error("Field 'email' must have a valid email value");
      }
      if (content.field === "phone" && !/^\d{10}$/.test(content.value)) {
        throw new Error(
          "Field 'phone' must have a valid 10-digit phone number"
        );
      }
      if (
        content.field === "rating" &&
        (isNaN(Number(content.value)) ||
          Number(content.value) < 1 ||
          Number(content.value) > 5)
      ) {
        throw new Error("Field 'rating' must be a number between 1 and 5");
      }
      if (content.field === "date" && isNaN(Date.parse(content.value))) {
        throw new Error("Field 'date' must have a valid date value");
      }
      return true;
    }),
];

module.exports = formFillValidator;
