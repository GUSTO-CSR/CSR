import { CustomResponse } from "@/app/custom-response";
import connectMongo from "@/app/db/mongoConnect";
import ShowDonationModel, { IShowDonation } from "@/Schemas/ShowDonationSchema";

export async function updateShowDonation(
  _id: number,
  eventId: number
): Promise<string> {
  await connectMongo();
  const response: CustomResponse<null> = {
    status: false,
    message: "No Error Message Provided!",
  };

  try {
    const updated = await ShowDonationModel.updateOne(
      { _id: _id },
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
