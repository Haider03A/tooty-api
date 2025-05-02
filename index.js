import express from "express";
import helmet from "helmet";
import coockieParser from "cookie-parser";

import { config } from "./config.js";
import { connectDB } from "./db/config/db.js";

import { mainRouter } from "./router/main.js";
import { othersErorrHandler } from "./controller/others/othersErorrHandler.js";

const app = express();

connectDB();

app.use(helmet());
app.use(coockieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(othersErorrHandler);

app.use(mainRouter);

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});
