const { body } = require("express-validator");

const formValidator = [
  body("formId").notEmpty().withMessage("Form ID is required"),
  body("content")
    .isArray({ min: 1 })
    .withMessage("Add something in the form to update"),
  body("content.*.type")
    .notEmpty()
    .withMessage("Type is required for all content items")
    .isIn(["bubble", "input"])
    .withMessage("Invalid type"),
  body("content.*.value")
    .notEmpty()
    .withMessage("Entre all the fields")
    .custom((value, { req }) => {
      const itemType = req.body.content.find(
        (item) => item.value === value
      ).type;
      if (
        itemType === "bubble" &&
        !["text", "image", "gif", "video"].includes(value)
      ) {
        throw new Error(`Invalid entries`);
      }
      if (
        itemType === "input" &&
        ![
          "text",
          "number",
          "email",
          "phone",
          "rating",
          "date",
          "button",
        ].includes(value)
      ) {
        throw new Error(`Invalid entries`);
      }
      return true;
    }),
  body("content.*.placeholder").custom((placeholder, { req }) => {
    const itemType = req.body.content.find(
      (item) => item.placeholder === placeholder
    )?.type;
    const itemValue = req.body.content.find(
      (item) => item.placeholder === placeholder
    )?.value;

    if (
      (itemType === "bubble" || itemValue === "button") &&
      (!placeholder || placeholder.trim() === "")
    ) {
      throw new Error("Fill up all the fields");
    }
    return true;
  }),
];

module.exports = formValidator;
