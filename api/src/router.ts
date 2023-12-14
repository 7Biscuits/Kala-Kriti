import express, { Router, Request, Response } from "express";
import { json } from "body-parser";
import DataModel from "./models/DataModel";
import { getCoordinates } from "./helpers/getCoordinates";

export const router: Router = express.Router();

router.use(json());

router.get("/data", async (_: Request, res: Response): Promise<void> => {
  const data = await DataModel.find();
  res.json(data);
});

router.get("/data/latest", async (_: Request, res: Response): Promise<void> => {
  try {
    const data = await DataModel.find();
    if (data.length > 0) {
      const { mq2, quality, coordinates } = data[data.length - 1];
      res.json({ mq2: mq2, quality: quality, coordinates: coordinates });
    }
    else { 
      res.json({ mq2: "0", quality: "", coordinates: {latitude: 0, longitude: 0} });
    }
  } catch (error) {
    console.error("Error fetching latest data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
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

router.delete("/data", async (_: Request, res: Response) => {
 const d =  await DataModel.deleteMany({});
  res.json({ response: "data deleted", data: d });
});