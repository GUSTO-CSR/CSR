"use server";

import { CustomResponse } from "@/app/custom-response";
import connectMongo from "@/app/db/mongoConnect";
import { IDonation } from "@/Schemas/DonationSchema";
import EventModel, { IEvent } from "@/Schemas/EventSchema";

async function getDonationByEvent(eventId: number): Promise<string> {
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

    const donations = event.Donations || [];

    response.status = true;
    response.message = "Donations fetched successfully!";
    response.data = donations;
    return JSON.stringify(response);
  } catch (error) {
    console.error("Failed to fetch donations: ", error);
    response.error = true;
    response.message = "Error Fetching Donations!";
    return JSON.stringify(response);
  }
}

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

async function updateDonation(
  eventId: number,
  updatedDonation: IDonation
): Promise<string> {
  await connectMongo();
  const response: CustomResponse<IDonation> = {
    status: false,
    message: "No Error Message Provided!",
  };

  try {
    const event: IEvent | null = await EventModel.findById(eventId);
    if (!event) {
      response.data = null;
      response.message = "Event Not Found!";
      return JSON.stringify(response);
    }

    // Find and update the donation
    if (event.Donations) {
      const donationIndex = event.Donations.findIndex(
        (d) => d._id === updatedDonation._id
      );
      if (donationIndex === -1) {
        response.data = null;
        response.message = "Donation Not Found!";
        return JSON.stringify(response);
      }

      // Update the donation in the array
      event.Donations[donationIndex] = {
        ...(event.Donations[donationIndex].toObject() as IDonation),
        ...updatedDonation,
      } as IDonation;
    }

    // Save the updated event
    await event.save();

    response.status = true;
    response.message = "Donation updated successfully!";
    response.data = updatedDonation;
    return JSON.stringify(response);
  } catch (error) {
    console.error("Failed to update donation: ", error);
    response.error = true;
    response.message = "Error Updating Donation!";
    return JSON.stringify(response);
  }
}

async function deleteDonation(
  eventId: number,
  donationId: number
): Promise<string> {
  await connectMongo();
  const response: CustomResponse<null> = {
    status: false,
    message: "No Error Message Provided!",
  };

  try {
    const event: IEvent | null = await EventModel.findById(eventId);
    if (!event) {
      response.data = null;
      response.message = "Event Not Found!";
      return JSON.stringify(response);
    }

    // Find the donation by ID and remove it
    if (event.Donations) {
      const donationIndex = event.Donations.findIndex(
        (d) => d._id === donationId
      );
      if (donationIndex === -1) {
        response.data = null;
        response.message = "Donation Not Found!";
        return JSON.stringify(response);
      }

      // Remove the donation from the array
      event.Donations.splice(donationIndex, 1);
    }

    // Save the updated event
    await event.save();

    response.status = true;
    response.message = "Donation deleted successfully!";
    response.data = null;
    return JSON.stringify(response);
  } catch (error) {
    console.error("Failed to delete donation: ", error);
    response.error = true;
    response.message = "Error Deleting Donation!";
    return JSON.stringify(response);
  }
}

export { getDonationByEvent, createDonations, updateDonation, deleteDonation };
