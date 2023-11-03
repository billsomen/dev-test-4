import dotenv from "dotenv";
// initialize configuration
dotenv.config();

import "reflect-metadata";
import "module-alias/register";

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { router } from "@routes/router";

const app = express();
const port = process.env.SERVER_PORT;

app.use(cors())

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use(router);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
