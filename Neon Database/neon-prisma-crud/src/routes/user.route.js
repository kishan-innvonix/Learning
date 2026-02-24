const express = require("express");
const {
  getAllUsers,
  createUser,
  login,
  getUserById,
} = require("../controllers/user.controller");

const router = express.Router();

router.get("/:id", getUserById)

router.get("/", getAllUsers);

router.post("/", createUser);

router.post("/login", login);

module.exports = router;
