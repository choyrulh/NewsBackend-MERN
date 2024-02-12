const express = require("express");

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

// GET ALL USERS
router.route("/").get(userController.getAllUsers);

// GET, DELETE, UPDATE SINGLE USER
router
  .route("/:id")
  .get(authController.restrictTo("admin"), userController.getUser)
  .put(authController.restrictTo("admin", "user"), userController.updateUser)
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    userController.deleteUser
  );

module.exports = router;
