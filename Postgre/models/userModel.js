const db = require("../config/db");

const createUser = (data) => {
  return db("users").insert(data).returning("*");
};

const getAllUsers = () => {
  return db("users").select("*");
};

const updateUser = (id, data) => {
  return db("users").where({ id }).update(data).returning("*");
};

const deleteUser = (id) => {
  return db("users").where({ id }).del();
};

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
