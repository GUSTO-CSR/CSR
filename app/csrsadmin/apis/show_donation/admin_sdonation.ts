"use server";
import { CustomResponse } from "@/app/custom-response";
import connectMongo from "@/app/db/mongoConnect";
import ShowDonationModel, { IShowDonation } from "@/Schemas/ShowDonationSchema";

export async function updateShowDonation(eventId: number): Promise<string> {
  await connectMongo();
  const response: CustomResponse<null> = {
    status: false,
    message: "No Error Message Provided!",
  };

  try {
    const updated = await ShowDonationModel.updateOne(
      { _id: 1 },
      { eventId: eventId }
    );

    if (updated.modifiedCount === 1) {
      response.status = true;
      response.message = "Show Donations Updated Successfully!";
    } else {
      response.status = false;
      response.message = "Update Failed!";
    }
  } catch (error) {
    console.error("Error fetching events: ", error);
    response.error = true;
    response.message = "Error Fetching Events!";
  }

  return JSON.stringify(response);
}

export async function getSD(): Promise<string> {
  await connectMongo();
  const response: CustomResponse<IShowDonation> = {
    status: false,
    message: "No Error Message Provided!",
  };

  try {
    // Check if a document with _id: 1 exists
    let sd = await ShowDonationModel.findById(1);

    if (!sd) {
      // Create a new document only if it doesn't exist
      const newSD = new ShowDonationModel({
        _id: 1,
        eventId: 1,
      });
      sd = await newSD.save();
      response.message = "New Show Donation Created!";
    } else {
      response.message = "Show Donation Found!";
    }

    response.status = true;
    response.data = sd;
  } catch (error) {
    console.error("Error fetching events: ", error);
    response.error = true;
    response.message = "Error Fetching Events!";
  }

  return JSON.stringify(response);
}
