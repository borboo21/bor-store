import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import routes from "./routes/index.ts";
import dotenv from "dotenv";

dotenv.config();

const port = 3001;
const app = express();
const MONGO_URI = process.env.MONGODB_CONNECTION_STRING!;

app.use(cookieParser());
app.use(express.json());

app.use("/api", routes);
app.use(express.static("../build"));

mongoose.connect(MONGO_URI).then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});
