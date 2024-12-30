"use server";

import { CustomResponse } from "@/app/custom-response";
import connectMongo from "@/app/db/mongoConnect";
import { IDonation } from "@/Schemas/DonationSchema";
import EventModel, { IEvent } from "@/Schemas/EventSchema";

async function createDonations(
  eventId: number,
  donations: IDonation[]
): Promise<string> {
  await connectMongo();
  const response: CustomResponse<IDonation[]> = {
    status: false,
    message: "No Error Message Provided!",
  };
  try {
    // Explicitly type the event variable
    const event: IEvent | null = await EventModel.findById(eventId);
    if (!event) {
      response.data = null;
      response.message = "Event Not Found!";
      return JSON.stringify(response);
    }

    // Add donations to the Donations list
    if (event.Donations) {
      event.Donations.push(...donations);
    } else {
      event.Donations = donations;
    }

    await event.save();

    response.status = true;
    response.message = "Donations created successfully!";
    response.data = donations;
    return JSON.stringify(response);
  } catch (error) {
    console.error("Failed to create donations: ", error);
    response.error = true;
    response.message = "Error Creating Donations!";
    return JSON.stringify(response);
  }
}
