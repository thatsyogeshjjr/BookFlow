import express from "express";
import { Book } from "../models/Books.js";
export const router = express.Router();

router.get("/books", async (req, res) => {
  try {
    const result = await Book.find({});
    res.send(result);
  } catch {
    res.status(500).send({ error: "internal Server Error" });
  }
});

router.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.send(book);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/newbook", async (req, res) => {
  try {
    var book = new Book({
      name: req.body.name,
      price: req.body.price,
      leased: req.body.leased,
    });
    book.save();
    res.status(200).send({ message: "books saved" });
  } catch (error) {
    res.send(500).json({ error: "Internal Server Error", body: error });
  }
});
