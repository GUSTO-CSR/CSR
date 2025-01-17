import getTotalEvents from "@/app/api/v1/homepage/utils/getTotalEvents";
import getTotalMembers from "@/app/api/v1/homepage/utils/getTotalMembers";
import getTotalMoneyDonated from "@/app/api/v1/homepage/utils/getTotalMoneyDonated";

export async function getDashboardData() {
  const totalEvents = await getTotalEvents();
  const totalDonated = await getTotalMoneyDonated();
  const totalMembers = await getTotalMembers();

  return {
    totalEvents,
    totalDonated,
    totalMembers,
  };
}
