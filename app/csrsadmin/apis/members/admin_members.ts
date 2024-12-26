"use server";
import connectMongo from "@/app/db/mongoConnect";
import { MemberSelectProps } from "@/components/admin/events/utils/MemberSelect";
import MemberModel, { IMember } from "@/Schemas/MemberSchema";

async function createMember(
  name: string,
  batch: string,
  role: string,
  email: string,
  photo: string
): Promise<boolean> {
  await connectMongo();
  try {
    const member = new MemberModel({
      Name: name,
      Batch: batch,
      Role: role,
      Email: email,
      Photo: photo,
    });

    await member.save();
    return true;
  } catch (error) {
    console.error("Failed to create member:", error);
    return false;
  }
}

async function updateMember(
  memberId: number,
  name: string,
  batch: string,
  role: string,
  email: string,
  photo: string
): Promise<boolean> {
  await connectMongo();
  try {
    await MemberModel.updateOne(
      { _id: memberId },
      { Name: name, Batch: batch, Role: role, Email: email, Photo: photo }
    );

    return true;
  } catch (error) {
    console.error("Failed to update member:", error);
    return false;
  }
}

async function fetchMembers(): Promise<string | null> {
  await connectMongo();
  try {
    const members: IMember[] = await MemberModel.find().sort({ Name: 1 });

    return JSON.stringify(members);
  } catch (error) {
    console.error("Failed to fetch members:", error);
    return null;
  }
}

/**
 * Fetches members by their IDs and returns them as a JSON string.
 * @param {number[]} memberIds IDs of the members to fetch
 * @returns {Promise<String | null>} The members as a JSON string, or null if there was an error.
 */
async function fetchMemberDetails(memberIds: number[]): Promise<string | null> {
  await connectMongo();
  try {
    const members: MemberSelectProps[] = await MemberModel.find(
      { _id: { $in: memberIds[0] } }, //I do this because of an error
      { Name: 1, Batch: 1 }
    );

    return JSON.stringify(members);
  } catch (error) {
    console.error("Failed to fetch members:", error);
    return null;
  }
}

async function searchMember(name: string): Promise<string | null> {
  await connectMongo();
  try {
    const members = await MemberModel.find(
      { Name: { $regex: name, $options: "i" } }, // Case-insensitive search
      { _id: 1, Name: 1, Batch: 1 } // Select only _id, Name, and Batch
    )
      .sort({ Name: 1 }) // Sort by Name in ascending order
      .limit(7) // Limit the results to 7 members
      .exec();

    return JSON.stringify(members);
  } catch (error) {
    console.error("Failed to search members:", error);
    return null;
  }
}

export {
  fetchMemberDetails,
  searchMember,
  fetchMembers,
  createMember,
  updateMember,
};
