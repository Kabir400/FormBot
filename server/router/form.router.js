const express = require("express");
const router = express.Router();

//middleware
const checkLogin = require("../middleware/checkLogin.js");
const FormValidator = require("../middleware/formValidator.js");
const formFillValidator = require("../middleware/formFillValidator.js");
const validate = require("../middleware/validate.js");

//controller
const createForm = require("../controller/forms/createForm.js");
const deleteForm = require("../controller/forms/deleteForm.js");
const updateForm = require("../controller/forms/updateForm.js");
const fetchForm = require("../controller/forms/fetchForm.js");
const fetchFillform = require("../controller/forms/fetchFillform.js");
const createResponse = require("../controller/forms/createResponse.js");
const updateResponse = require("../controller/forms/updateResponse.js");
const getResponse = require("../controller/forms/getResponse.js");

//routes
router.post("/create/form", checkLogin, createForm);
router.post("/delete/form", checkLogin, deleteForm);
router.post("/update/form", checkLogin, FormValidator, validate, updateForm);
router.get("/form/:formId", checkLogin, fetchForm);
router.get("/fill/form/:formId", fetchFillform);
router.post("/create/response", formFillValidator, validate, createResponse);
router.post("/update/response", formFillValidator, validate, updateResponse);
router.get("/responses/:formId", checkLogin, getResponse);

module.exports = router;
