import express, { Express, Request, Response } from "express";
import { json } from "body-parser";
import cors from "cors";
import { connect } from "mongoose";
import { router } from "./router";
import { getIPAddress } from "./helpers/getIP";
import { configDotenv } from "dotenv";

configDotenv();

connect(`${process.env.MONGO_URI}`).then((): void => {
  console.log("Connected to database");
});

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(json());
app.use(cors());

app.get("/", (_: Request, res: Response): void => {
  res.status(200).send("Welcome to Kala-Kriti API");
});

app.use("/api", router);

const port = process.env.PORT || 8080;

app.listen(port, (): void => {
  console.log(`server listening on http://localhost:${port} \n${getIPAddress()}`);
});