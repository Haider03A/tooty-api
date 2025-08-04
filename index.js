import express from "express";
import helmet from "helmet";
import cors from "cors";
import coockieParser from "cookie-parser";

import { config } from "./config.js";
import { connectDB } from "./db/config/db.js";

import { mainRouter } from "./router/main.js";
import { othersErorrHandler } from "./controller/others/othersErorrHandler.js";

const app = express();

connectDB();
const corsOptions = {
  origin: ["http://localhost:5173", "http://192.168.0.193:5173"], // Explicitly specify your frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow credentials
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(coockieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(othersErorrHandler);

app.use(mainRouter);

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});
