import mongoose from "mongoose";

export const dbConnection = async (dbString) => {
  return await mongoose
    .connect(dbString)
    .then(() => console.log("MonogDB connection established"))
    .catch((error) => {
      console.error("MongoDB Connection Failed!");
    });
};
