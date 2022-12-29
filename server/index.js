import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./config/db.js";
import contactRouter from "./routes/contactRouter.js";

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(bodyParser.json());

app.use("/contacts", contactRouter);
// app.all("*", (req, res) => res.send("Page dose not excite "));

app.listen(port, () => {
  console.log(`Server started at port http://localhost:${port}`);
});
