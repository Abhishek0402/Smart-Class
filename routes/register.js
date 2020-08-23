const express = require("express");
const router = express.Router(); 

const admin = require("../models/admin");
const organisation = require("../models/organisation");
const userData = require("../models/userData");

const authController = require("../Controller/authController");
const registerController = require("../Controller/registerController");
const imageUploader = require("../utility/imageUploader");

router.post("/register", authController.authenticate,imageUploader.uploadImage.single("file"), registerController.register);

module.exports = router;
