const clearSession = (req) => new Promise((resolve, reject) => {
  try {
    req.session = null;

    resolve();
  } catch (error) {
    reject(error);
  }
});

module.exports = { clearSession };
