import express from "express";
import passport from "passport";
import { genPassword } from "../libs/passwordUtils.js";
import { User } from "../models/Users.js";

export const router = express.Router();

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login-failure",
    successRedirect: "/login-success",
  })
);

router.post("/register", async (req, res) => {
  const saltHash = genPassword(req.body.password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    username: req.body.username,
    password: hash,
    salt: salt,
  });
  await newUser.save();
  res.status(200).send({ message: "user registered" });
});
