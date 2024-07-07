import mongoose from "mongoose";
import { connection } from "../config/database.js";

const BookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  leased: { type: Boolean, required: false, default: false },
});

export const Book = connection.model("Books", BookSchema);
