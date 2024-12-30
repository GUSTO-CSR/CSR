"use server";

import { Document, Schema } from "mongoose";

export interface IDonation extends Document {
  _id: number;
  Name: string;
  Batch: string;
  Balance: string;
  CreatedTime: Date;
}

const DonationSchema: Schema = new Schema({
  _id: { type: Number, required: true },
  Name: { type: String, required: true },
  Batch: { type: String },
  Balance: { type: Number, required: true },
  CreatedTime: { type: Date, required: true, default: new Date() },
});

export default DonationSchema;
