import React from "react";
import Card from "./Card";
import getTotalEvents from "@/app/api/v1/homepage/utils/getTotalEvents";
import getTotalMoneyDonated from "@/app/api/v1/homepage/utils/getTotalMoneyDonated";
import getTotalMembers from "@/app/api/v1/homepage/utils/getTotalMembers";

export interface ICard {
  id: number;
  title: string;
  value: number | null;
}

export default async function CardContainer() {
  const totalEvents = await getTotalEvents();
  const totalDonated = await getTotalMoneyDonated();
  const totalMembers = await getTotalMembers();

  const cards: ICard[] = [
    { id: 1, title: "Total Events", value: totalEvents },
    { id: 2, title: "Total Donated", value: totalDonated },
    { id: 3, title: "Total Members", value: totalMembers },
  ];

  return (
    <div>
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Card key={card.id} data={card} />
        ))}
      </section>
    </div>
  );
}
