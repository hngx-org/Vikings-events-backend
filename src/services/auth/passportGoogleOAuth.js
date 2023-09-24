/* eslint-disable import/no-extraneous-dependencies */
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../../models/1-users');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      try {
        const defaultUser = {
          fullName: `${profile.name.givenName} ${profile.name.familyName}`,
          email: profile.emails[0].value,
          picture: profile.photos[0].value,
          googleId: profile.id,
        };

        const user = await User.findOrCreate({
          where: { googleId: profile.id },
          defaults: defaultUser,
        });

        if (user && user[0]) return cb(null, user && user[0]);

        return cb('User not found', null);
      } catch (error) {
        return cb(error, null);
      }
    },
  ),
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  const user = await User.findOne({ where: { id } }).catch((err) => {
    cb(err, null);
  });

  if (user) cb(null, user);
});
