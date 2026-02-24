const express = require("express");
const {
  getAllUsers,
  createUser,
  login,
  getUserById,
  getCurrentUser,
} = require("../controllers/user.controller");
const { validate } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/:id", getUserById)

router.get("/", validate, getCurrentUser);

router.get("/all", validate, getAllUsers);

router.post("/", createUser);

router.post("/login", login);

module.exports = router;
