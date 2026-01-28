const userModel = require("../models/userModel");

exports.createUser = async (req, res) => {
  try {
    const user = await userModel.createUser(req.body);
    res.status(201).json(user[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  const users = await userModel.getAllUsers();
  res.json(users);
};

exports.updateUser = async (req, res) => {
  const user = await userModel.updateUser(req.params.id, req.body);
  res.json(user[0]);
};

exports.deleteUser = async (req, res) => {
  await userModel.deleteUser(req.params.id);
  res.json({ message: "User deleted" });
};
