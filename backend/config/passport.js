import passport from "passport";
import LocalStrategy from "passport-local";
import { connection } from "./database.js";
import { validatePassword } from "../libs/passwordUtils.js";
import { User } from "../models/Users.js";

const customFields = {
  usernameField: "username",
  passwordField: "password",
};
const verifyCallback = (user, pword, done) => {
  // done is a callback that takes 2 values (error, user)
  User.findOne({ username: user })
    .then((user) => {
      if (!user) {
        return done(null, false);
      }
      console.log("user exists");
      console.log("user hash:", user.password);
      const isValid = validatePassword(pword, user.password, user.salt);
      if (isValid) {
        console.log("user exists");
        return done(null, user);
      } else {
        console.log("pass does not exists");
        return done(null, false);
      }
    })
    .catch((err) => {
      done(err);
    });
};

const strategy = new LocalStrategy(customFields, verifyCallback);
passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => done(null, user))
    .catch((err) => done(err));
});
