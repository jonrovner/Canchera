export {};
const { Router } = require("express");
const axios = require("axios");
const router = Router();
const { User } = require("../db.ts");
const AuthController = require("../controller/AuthController.ts");

router.post("/signin", AuthController.signIn);

router.post("/signup/user", AuthController.userSignUp);

router.post("/signup/owner", AuthController.ownerSignUp);

router.post("/singup/google", AuthController.googleSingUp);

router.get("/confirm/:token", AuthController.confirmUser)

router.post("/forgotpassword", AuthController.forgotPassword);

router.put("/resetpassword/:token", AuthController.resetPassword);


module.exports = router;
