const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", authController.createUser);
router.post("/login", authController.loginUser);
router.get(
  "/login/user",
  authController.verifyToken,
  authController.getUserLogin
);

router.post("/logout", authController.logOutUser);

router.put("/signup/:id", authController.updateUser);

module.exports = router;
