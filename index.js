import express from "express";
import helmet from "helmet";

import { connectDB } from "./db/config/db.js";

import { fileRoute } from "./router/fileRoute.js";
import { pageRoute } from "./router/pageRoute.js";
import { itemRoute } from "./router/itemRoute.js";

const app = express();
const port = 3000;

connectDB();

app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/file", fileRoute);
app.use("/api/page", pageRoute);
app.use("/api/item", itemRoute);

app.all("*", (req, res) => {
  res.status(404).send("error 404: Not Found - " + req.url);
});
app.use((error, req, res, next) => {
  if (error instanceof SyntaxError) {
    return res.status(400).json({
      message: "Invalid data format, Please check the syntax of your request",
    });
  }

  console.error(error);
  return res.status(500).json({
    message: "Something went wrong, Please try again later",
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
