const User = require('../models/users');

const getUser = async (req, res) => {
  const users = 'All Users';
  res.json({ users });
};

const getUserProfile = async (req, res) => {
  try {
    //  check Id input
    const { profileId } = req.params;

    if (!profileId) {
      return res.status(400).json({ status: 'Failure', error: 'Invalid Id' });
    }
    const user = await User.findByPk(profileId);
    //  check for user
    if (!user) {
      return res
        .status(404)
        .json({ status: 'Failure', error: 'User Not found' });
    }
    return res
      .status(200)
      .json({ status: 'Success', message: 'User found', data: user });
  } catch (err) {
    return res.status(500).json({ status: 'Failure', error: err.message });
  }
};

module.exports = { getUser, getUserProfile };
