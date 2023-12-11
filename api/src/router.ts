import express, { Router, Request, Response } from "express";
import { json } from "body-parser";
import DataModel from "./models/DataModel";
import { getCoordinates } from "./helpers/getCoordinates";

export const router: Router = express.Router();

router.use(json());

router.get("/", async (_: Request, res: Response): Promise<void> => {
  const data = await DataModel.find();
  res.json(data);
});

router.post(
  "/data/:mq2/:quality",
  async (req: Request, res: Response): Promise<void> => {
    const { mq2, quality } = req.params;
    const { latitude, longitude } = await getCoordinates();
    const data = new DataModel({
      mq2: mq2,
      quality: quality,
      coordinates: {
        latitude: latitude,
        longitude: longitude,
      },
    });
    await data.save();
    res.json({ response: "data saved" });
  }
);