import mongoose from "mongoose";
import { connection } from "../config/database.js";

const UsersSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
});

export const User = connection.model("Users", UsersSchema);
