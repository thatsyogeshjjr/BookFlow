import express from "express";
import dotenv from "dotenv";
import { router as booksController } from "./controllers/booksController.js";
import { router as authController } from "./controllers/authController.js";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

const sessionStore = new MongoStore({
  mongoUrl: process.env.MONGO_URL,
  collection: "sessions",
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);
import {} from "./config/passport.js";
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send({ status: "running" });
});

app.get("/login-failure", (req, res) => {
  res.send("login failed");
});
app.get("/login-success", (req, res) => {
  res.send("login success");
});

app.use("/api", booksController);
app.use("/auth", authController);
// TODO: Error Handler

app.listen(PORT);
