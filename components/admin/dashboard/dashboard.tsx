import { Suspense } from "react";
import CardContainer from "./utils/CardContainer";
import DisplayDonation from "./utils/DisplayDonation";

export default function Dashboard() {
  return (
    <section className="p-8 space-y-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-extrabold text-center text-gray-800">
        Admin Dashboard
      </h1>
      {/* TODO: Add skeleton for card contianer */}
      <Suspense fallback={"Loading..."}>
        <CardContainer />
      </Suspense>
      <DisplayDonation />
    </section>
  );
}
