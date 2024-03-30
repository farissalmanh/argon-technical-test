const { argon } = require("../models");

async function createUser(data) {
  const userResult = await argon.models.user.create(data);
  return userResult;
}

async function updateUser(data, where) {
  const userResult = await argon.models.user.update(data, {
    where,
  });
  return userResult;
}

async function getUser(where) {
  const userResult = await argon.models.user.findAll({
    where,
  });
  return userResult;
}

module.exports = {
  createUser,
  updateUser,
  getUser,
};
