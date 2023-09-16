import express, { urlencoded } from "express";
import { connectToMongoose } from "./db/db.connect";
import cors from "cors";

import * as dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(urlencoded({ extended: true }));
app.use(cors());

connectToMongoose();

const port = process.env.port || 3000;

import { router as contactRouter } from "./routers/contacts.routers";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/contacts", contactRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
