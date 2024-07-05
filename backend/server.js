import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./config/database.js";
import { router as booksController } from "./controllers/booksController.js";

dotenv.config();
const app = express();
const connection = await dbConnection(process.env.MONGO_URL);
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send({ status: "running" });
});

app.use("/api", booksController);

app.listen(PORT);
