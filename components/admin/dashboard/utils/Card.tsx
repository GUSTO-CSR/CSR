import React from "react";
import { ICard } from "./CardContainer";

export default function Card({ data }: { data: ICard }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition relative">
      <h2 className="text-2xl font-bold text-gray-700">{data.title}</h2>

      <p className="text-lg mt-2 text-gray-600">
        {data.value ? data.value : "Loading..."}
      </p>
    </div>
  );
}
