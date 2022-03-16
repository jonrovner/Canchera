const { Router } = require("express");
const axios = require("axios");
const router = Router();
const { User } = require("../db.ts");
const AuthController = require("../controller/AuthController.ts");
const verifyUser = require('../middlewares/verifyRecord')


router.post('/signin', AuthController.signIn)

router.post('/signup/user',verifyUser.verifyUser, AuthController.userSignUp);
router.post('/signup/owner', verifyUser.verifyUser, AuthController.ownerSignUp);


module.exports = router;