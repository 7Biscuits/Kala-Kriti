import { Request, Response } from "express";
import DataModel from "../models/DataModel";

export const deleteData = async (_: Request, res: Response): Promise<void> => {
  const d = await DataModel.deleteMany({});
  res.json({ response: "data deleted", data: d });
};