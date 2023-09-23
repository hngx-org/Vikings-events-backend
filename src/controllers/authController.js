/* eslint-disable object-curly-newline */
const { createUser, getUserById } = require('./userController');
const { signToken } = require('../middlewares/auth');
const { clearSession } = require('../utils/session');
const { revokeGoogleToken } = require('../utils/googleAuth');

const getToken = async ({ googleId, email, picture, name }) => {
  let user = await getUserById(googleId);
  if (!user) {
    user = await createUser({ id: googleId, email, picture, name });
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
    console.log(req.user);
    return res.status(200).json({ message: 'Authentication successful', user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const handleLogoutController = async (req, res) => {
  try {
    await clearSession(req);

    res.clearCookie('token');

    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Logout failed' });
  }
};

module.exports = { handleLoginController, handleLogoutController };
