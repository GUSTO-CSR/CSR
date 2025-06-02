"use server";

import mongoose, { Schema } from "mongoose";

export interface IShowDonation extends Document {
  _id: number;
  eventId: number;
}

const ShowDonationSchema: Schema = new Schema<IShowDonation & Document>({
  _id: { type: Number, required: true },
  eventId: { type: Number, required: true, ref: "Event" },
});

const ShowDonationModel =
  mongoose.models.ShowDonation ||
  mongoose.model<IShowDonation>("ShowDonation", ShowDonationSchema);
export default ShowDonationModel;
