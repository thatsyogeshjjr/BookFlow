import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  leased: { type: Boolean, required: false, default: false },
});

export const Book = mongoose.model("Books", BookSchema);
