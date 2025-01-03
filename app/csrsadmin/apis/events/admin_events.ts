"use server";
import { CustomResponse, EventSummary } from "@/app/custom-response";
import connectMongo from "@/app/db/mongoConnect";
import EventModel, { IEventData } from "@/Schemas/EventSchema";
import { del, put } from "@vercel/blob";

async function getEventNamesAndIds(): Promise<string> {
  await connectMongo();
  const response: CustomResponse<EventSummary[]> = {
    status: false,
    message: "No Error Message Provided!",
    data: [],
  };

  try {
    // Fetch only EventName and _id
    const events: EventSummary[] = await EventModel.find({}, "_id EventName");

    response.status = true;
    response.message = "Events fetched successfully!";
    response.data = events;
    return JSON.stringify(response);
  } catch (error) {
    console.error("Error fetching events: ", error);
    response.error = true;
    response.message = "Error Fetching Events!";
    return JSON.stringify(response);
  }
}

async function updateEvent(event: IEventData): Promise<string | null> {
  await connectMongo();
  try {
    const updatedEvent = await EventModel.findByIdAndUpdate(event._id, event, {
      new: true,
    });

    return JSON.stringify(updatedEvent);
  } catch (error) {
    console.error("Failed to update event: ", error);
    return null;
  }
}

async function deletePhoto(url: string): Promise<string | null> {
  try {
    await del(url);
    return "";
  } catch (error) {
    console.error("Failed to delete the photo: ", error);
    return null;
  }
}

async function uploadPhotoToBlob(image: FormData): Promise<string | null> {
  try {
    const img = image.get("image") as File;
    const imageUrl = await put("/events/images", img, { access: "public" });
    console.log(imageUrl.url);
    return imageUrl.url;
  } catch (error) {
    console.log("Failed to upload image ", error);
    return null;
  }
}

async function deleteEvent(eventId: number): Promise<boolean> {
  await connectMongo();
  try {
    const response = await EventModel.deleteOne({ _id: eventId });
    if (response.deletedCount === 1) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Failed to delete event: ", error);
    return false;
  }
}

async function generateUniqueIdEvent(): Promise<number> {
  const lastMember = await EventModel.findOne().sort({ _id: -1 }).exec();
  return lastMember ? lastMember._id + 1 : 1;
}

async function createEvent(event: IEventData): Promise<string | null> {
  await connectMongo();
  try {
    const uniqueId = await generateUniqueIdEvent();
    const newEvent = new EventModel({
      _id: uniqueId,
      EventName: event.EventName,
      EventDescription: event.EventDescription,
      EventPhotoURL: event.EventPhotoURL,
      EventPhotoList: event.EventPhotoList,
      DonatedAmount: event.DonatedAmount,
      EventDate: event.EventDate,
      Completed: event.Completed,
      MemberLists: event.MemberLists,
    });
    await newEvent.save();
    return JSON.stringify(newEvent);
  } catch (error) {
    console.error("Failed to create event: ", error);
    return null;
  }
}

export {
  updateEvent,
  deletePhoto,
  uploadPhotoToBlob,
  deleteEvent,
  createEvent,
  generateUniqueIdEvent,
  getEventNamesAndIds,
};
