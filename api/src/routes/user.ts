import Router from "express";
const router = Router();
const UserController = require("../controller/UserController.ts");

router.get("/user", UserController.getUser);

router.put("/user/:id", UserController.updateUser)

router.delete("/user/:id", UserController.deleteUser )

module.exports = router;
