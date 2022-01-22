const express = require("express");
const router = express.Router();
const UserController = require("../Controller/userController");
const Auth = require("../Middleware/Auth");

router.post("/signup", UserController.signup);
router.post("/signin", UserController.signin);
router.post("/update/:id", Auth, UserController.update);

router.get("/:id", UserController.getPosts);
router.get("/post/:id", UserController.getPost);
router.post("/signup/google", UserController.loginWithGoogle);

module.exports = router;
