import DataModel from "../models/DataModel";
import { getCoordinates } from "../helpers/getCoordinates";
import { Request, Response } from "express";

export const postData = async (req: Request, res: Response): Promise<void> => {
  const { mq2, quality } = req.params;
  console.log("data received: ", mq2, quality)
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
  console.log("moye moye data saved")
  res.json({ response: "data saved" });
};