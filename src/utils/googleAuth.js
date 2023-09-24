const axios = require('axios');

async function revokeGoogleToken(accessToken) {
  const url = 'https://accounts.google.com/o/oauth2/revoke';
  const params = {
    token: accessToken,
  };

  try {
    await axios.post(url, null, { params });
    console.log('Google token revoked successfully');
  } catch (error) {
    console.error('Error revoking Google token:', error.message);
    throw error;
  }
}

module.exports = { revokeGoogleToken };
