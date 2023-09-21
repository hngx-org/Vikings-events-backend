/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const JwtStrategy = require('passport-jwt').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { ExtractJwt } = require('passport-jwt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3306/api/users/auth/google/callback',
        passReqToCallback: true,
      },
      async (request, accessToken, refreshToken, profile, done) => {
        try {
          if (
            !profile ||
            !profile.displayName ||
            !profile.emails ||
            profile.emails.length === 0
          ) {
            return done(new Error('Incomplete profile data'), false);
          }

          // Extract the name and email from the profile
          const { displayName } = profile;
          const email = profile.emails[0].value;
          const avatar = profile.photos[0].value;

          // Find or create the user based on the email
          const [user, created] = await User.findOrCreate({
            where: { email },
            defaults: {
              method: 'google',
              name: displayName,
              email,
              avatar,
            },
          });

          if (!created) {
            // User already exists, return the existing user
            return done(null, user);
          }

          // User was created, return the new user
          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      },
      passport.use(
        new JwtStrategy(
          {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET_KEY,
          },
          async (jwtPayload, done) => {
            try {
              const user = await User.findByPk(jwtPayload.user.id);

              if (!user) {
                return done(null, false);
              }

              return done(null, user);
            } catch (error) {
              return done(error, false);
            }
          },
        ),
      ),
    ),
  );
};
