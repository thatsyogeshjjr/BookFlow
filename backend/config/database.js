import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

await mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MonogDB connection established"))
  .catch((error) => {
    console.error("MongoDB Connection Failed!");
  });

export const connection = mongoose.connection;
