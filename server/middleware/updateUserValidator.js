const { body } = require("express-validator");

const updateUserValidator = [
  body("name")
    .custom((value) => {
      value = value.trim();
      // Allow blank strings
      if (value === "") return true;
      if (!/^[a-zA-Z -]+$/.test(value)) {
        throw new Error("Name must only contain alphabets, spaces, or hyphens");
      }
      return true;
    })
    .trim(),

  body("email").custom((value) => {
    value = value.trim();
    // Allow blank strings
    if (value === "") return true;
    if (!/\S+@\S+\.\S+/.test(value)) {
      throw new Error("Invalid email!");
    }
    return true;
  }),

  body("oldPassword").custom((value) => {
    value = value.trim();
    // Allow blank strings
    if (value === "") return true;
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        value
      )
    ) {
      throw new Error(
        "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 symbol, 1 number"
      );
    }
    return true;
  }),

  body("newPassword").custom((value) => {
    value = value.trim();
    // Allow blank strings
    if (value === "") return true;
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        value
      )
    ) {
      throw new Error(
        "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 symbol, 1 number"
      );
    }
    return true;
  }),
];

module.exports = updateUserValidator;
