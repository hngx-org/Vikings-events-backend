const { getUserByEmail, createUser } = require('./userController');
const { signToken } = require('../middlewares/auth');

const getToken = async ({ email, avatar, name }) => {
  let user = await getUserByEmail(email);
  if (!user) {
    user = await createUser({ email, avatar, name });
  }

  const token = await signToken({ id: user.id, email: user.email });

  return { token, user };
};

const handleLoginController = async (req, res) => {
  try {
    const { token, user } = await getToken(req.body);

    if (!user) {
      return res.status(500).json({
        successful: false,
        mesaage: 'Unable to login now',
      });
    }

    if (!token) {
      return res.status(500).json({
        successful: false,
        message: 'unable to authenticate',
      });
    }

    res.cookie('token', token, {
      maxAge: 24 * 60 * 60 * 1000 * 5,
      httpOnly: true,
    }); // 5 days for cookie age

    return res.status(200).json({ message: 'Authentication successful', user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { handleLoginController };
