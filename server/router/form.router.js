const express = require("express");
const router = express.Router();

//middleware
const checkLogin = require("../middleware/checkLogin.js");

//controller
const createForm = require("../controller/forms/createForm.js");
const deleteForm = require("../controller/forms/deleteForm.js");

//routes
router.post("/create/form", checkLogin, createForm);
router.post("/delete/form", checkLogin, deleteForm);

module.exports = router;
