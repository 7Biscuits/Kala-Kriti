import { Request, Response } from "express";
import DataModel from "../models/DataModel";

export const getData = async (_: Request, res: Response): Promise<void> => {
  const data = await DataModel.find();
  res.json(data);
};

export const getLatestData = async (
  _: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await DataModel.find();
    if (data.length > 0) {
      const { mq2, quality, coordinates } = data[data.length - 1];
      res.json({ mq2: mq2, quality: quality, coordinates: coordinates });
    } else {
      res.json({
        mq2: "0",
        quality: "",
        coordinates: { latitude: 0, longitude: 0 },
      });
    }
  } catch (error) {
    console.error("Error fetching latest data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};