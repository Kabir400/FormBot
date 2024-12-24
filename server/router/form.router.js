const express = require("express");
const router = express.Router();

//middleware
const checkLogin = require("../middleware/checkLogin.js");
const FormValidator = require("../middleware/formValidator.js");
const validate = require("../middleware/validate.js");

//controller
const createForm = require("../controller/forms/createForm.js");
const deleteForm = require("../controller/forms/deleteForm.js");
const updateForm = require("../controller/forms/updateForm.js");
const fetchForm = require("../controller/forms/fetchForm.js");

//routes
router.post("/create/form", checkLogin, createForm);
router.post("/delete/form", checkLogin, deleteForm);
router.post("/update/form", checkLogin, FormValidator, validate, updateForm);

module.exports = router;
