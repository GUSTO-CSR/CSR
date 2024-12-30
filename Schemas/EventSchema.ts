"use server";
import mongoose, { Document, Schema } from "mongoose";
import { IDonation } from "./DonationSchema";

export interface IEvent extends Document {
  _id: number;
  EventName: string;
  EventDescription: string;
  EventPhotoURL: string;
  EventPhotoList?: string[];
  DonatedAmount?: number;
  EventDate: Date;
  Completed: boolean;
  MemberLists?: number[];
  Donations?: IDonation[];
}

// Define the schema
const DonationSchema: Schema = new Schema({
  _id: { type: Number, required: true },
  Name: { type: String, required: true },
  Batch: { type: String },
  Balance: { type: Number, required: true },
  CreatedTime: { type: Date, required: true, default: () => new Date() },
});

const EventSchema: Schema = new Schema({
  _id: { type: Number, required: true },
  EventName: { type: String, required: true },
  EventDescription: { type: String, required: true },
  EventPhotoURL: { type: String, required: true },
  EventPhotoList: { type: [String], required: false },
  DonatedAmount: { type: Number, required: false },
  EventDate: { type: Date, required: true },
  Completed: { type: Boolean, required: true },
  MemberLists: [{ type: [Number], required: false, default: [] }],
  Donations: [{ type: [DonationSchema], required: false, default: [] }],
});

export type IEventData = Pick<
  IEvent,
  | "_id"
  | "EventName"
  | "EventDescription"
  | "EventPhotoURL"
  | "EventPhotoList"
  | "DonatedAmount"
  | "EventDate"
  | "Completed"
  | "MemberLists"
  | "Donations"
>;

const EventModel =
  mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);
export default EventModel;
