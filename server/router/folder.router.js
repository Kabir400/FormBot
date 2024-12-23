const express = require("express");
const router = express.Router();

//middleware
const checkLogin = require("../middleware/checkLogin.js");

//controller
const createFolder = require("../controller/folder/createFolder.js");
const deleteFolder = require("../controller/folder/deleteFolder.js");

//routes
router.post("/create/folder", checkLogin, createFolder);
router.post("/delete/folder", checkLogin, deleteFolder);

module.exports = router;
