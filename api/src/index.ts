import express, { Express, Request, Response } from "express";
import { json } from "body-parser";
import cors from "cors";
import { connect } from "mongoose";
import { router } from "./router";

const port = 3000;

connect("mongodb://localhost:27017/Kala-Kriti").then(() => {
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

app.listen(port, (): void => {
  console.log(`server listening on http://localhost:${port}`);
});