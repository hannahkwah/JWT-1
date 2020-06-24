const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const UserController = require("../controllers/user");

router.post("/signup", UserController.user_signup);
router.post("/login", UserController.user_login);
router.get("/", auth, UserController.users_get_all);

module.exports = router;