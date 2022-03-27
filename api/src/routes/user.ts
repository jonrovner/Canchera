import Router from "express";
const router = Router();
const UserController = require("../controller/UserController.ts");

router.get("/user", UserController.getUser);

router.get("/owner", UserController.getOwner);

router.get("/allusers", UserController.getAllUsers)

router.put("/user/:id", UserController.updateUser)

router.delete("/user/:id", UserController.deleteUser )



module.exports = router;
