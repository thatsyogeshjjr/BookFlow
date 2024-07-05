import express from "express";
import { Book } from "../models/Books.js";
import ObjectID from "mongodb";
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

router.put("/newbook", async (req, res) => {
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

router.delete("/books/:id", async (req, res) => {
  console.log(req.params.id);
  Book.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.send({ result });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

router.patch("/books/:id", async (req, res) => {
  console.log(typeof req.body.price);
  await Book.findByIdAndUpdate(req.params.id, req.body.update)
    .then(res.status(200).send("update success"))
    .catch(res.status(500).send("update failed"));
});
