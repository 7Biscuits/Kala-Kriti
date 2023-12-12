import { Schema, model } from "mongoose";
import { IDataModel } from "../interface/IDataModel";

const DataModel: Schema = new Schema<IDataModel>({
  mq2: {
    type: String,
    required: true,
  },
  quality: {
    type: String,
    required: true,
  },
  coordinates: {
    type: Object,
    required: true,
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
});

export default model<IDataModel>("DataModel", DataModel);