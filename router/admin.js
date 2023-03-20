const express = require("express");
const router = express.Router();
const admincontroller = require("../controller/admin");
const { check } = require("express-validator");

router.get("/first", admincontroller.getFirst);

router.get("/form", admincontroller.getForm);

router.post("/form", admincontroller.postForm);

router.get("/remove/:id", admincontroller.removeForm);

router.get("/edit/:id", admincontroller.updateDetails);

router.post("/edit/:id", admincontroller.updatePostDetails);

router.get("/", admincontroller.getLoginForm);

router.post("/", admincontroller.postLoginForm);

router.get("/signup", admincontroller.getSignForm);

router.post(
  "/signup",
  check('username').isEmail().withMessage("please enter the valid Email!!"),
  admincontroller.postSignForm
);

module.exports = router;
