const User = require('../models/users');

const getUsers = async (req, res) => {
  const users = 'All Users';
  res.json({ users });
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user.dataValues;
};

const createUser = async ({ name, email, picture }) => {
  const user = await User.create({ name, email, avatar: picture });
  return user;
};

module.exports = { getUsers, getUserByEmail, createUser };
