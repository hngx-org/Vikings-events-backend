const User = require('../models/users.js');

async function userController(req, res) {
  try {
    const { name, email, password, meta, avatar } = req.body;

    const userInfo = {
      email,
      name,
      password,
      meta,
      avatar,
    };

    const newUser = await User.create(userInfo);

    await newUser.save();

    res.send({ msg: 'User created', newUser });
  } catch (error) {
    console.log(error, 'error');
    res.send(error, 'error');
  }
}

module.exports = { userController };
