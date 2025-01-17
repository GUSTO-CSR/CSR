"use client";
import { getEventNamesAndIds } from "@/app/csrsadmin/apis/events/admin_events";
import {
  getSD,
  updateShowDonation,
} from "@/app/csrsadmin/apis/show_donation/admin_sdonation";
import { CustomResponse, EventSummary } from "@/app/custom-response";
import { ShowResult } from "@/lib/utils";
import { IShowDonation } from "@/Schemas/ShowDonationSchema";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function DisplayDonation() {
  const [events, setEvents] = useState<EventSummary[] | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [selectedSD, setSelectedSD] = useState<IShowDonation | null>(null);

  const fetchEvents = async () => {
    const response = await getEventNamesAndIds();
    const data: CustomResponse<EventSummary[]> = JSON.parse(response);
    const status = ShowResult<EventSummary[]>(data);
    if (status && data.data) {
      setEvents(data.data);
    }
  };

  const getShowDonation = async () => {
    const response = await getSD();
    console.log(response);
    const data: CustomResponse<IShowDonation> = JSON.parse(response);
    const status = ShowResult<IShowDonation>(data);
    if (status && data.data) {
      setSelectedSD(data.data);
      setSelectedTopic(data.data.eventId);
    }
  };

  const updateSD = async (eventId: number) => {
    setSelectedTopic(eventId);
    setSelectedSD((prev) => (prev ? { ...prev, eventId } : null));
    const response = await updateShowDonation(eventId);
    const data: CustomResponse<null> = JSON.parse(response);
    const status = ShowResult<null>(data);
    if (status && data.data) {
      toast.success(data.message);
    }
  };

  useEffect(() => {
    getShowDonation();
    fetchEvents();
  }, []);

  return (
    <section className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
      <h2 className="text-xl font-bold text-gray-700">Display Donation</h2>
      {selectedTopic && (
        <select
          value={selectedTopic}
          onChange={(e) => updateSD(parseInt(e.target.value))}
          className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:ring focus:outline-none"
        >
          {events &&
            events.map((e) => (
              <option key={e._id} value={e._id}>
                {e.EventName}
              </option>
            ))}
        </select>
      )}
      <p className="mt-4 text-gray-600">
        Selected Topic: <strong>{selectedTopic}</strong>
      </p>
    </section>
  );
}
