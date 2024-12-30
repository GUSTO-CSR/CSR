"use server";

import { Document, Schema, model, models } from "mongoose";

export interface IDonation extends Document {
  _id: number;
  Name: string;
  Batch: string;
  Balance: string;
  CreatedTime: Date;
}

// Define the schema
const DonationSchema: Schema = new Schema({
  _id: { type: Number, required: true },
  Name: { type: String, required: true },
  Batch: { type: String },
  Balance: { type: Number, required: true },
  CreatedTime: { type: Date, required: true, default: () => new Date() },
});

// Export an async function to get the model
export async function getDonationModel() {
  return models.Donation || model<IDonation>("Donation", DonationSchema);
}
