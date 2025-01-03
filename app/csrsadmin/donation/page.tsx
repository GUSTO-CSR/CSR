"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SelectTable } from "@/components/admin/donation/SelectTable";
import { getEventNamesAndIds } from "../apis/events/admin_events";
import { RowDialog } from "@/components/admin/donation/utils/RowDialog";
import { DonationTable } from "@/components/admin/donation/utils/DonationTable";
import { CustomResponse, EventSummary } from "@/app/custom-response";
import toast, { Toaster } from "react-hot-toast";
import { IDonation } from "@/Schemas/DonationSchema";
import {
  createDonations,
  deleteDonation,
  getDonationByEvent,
} from "../apis/donation/admin_donation";
import { ShowResult } from "@/lib/utils";
import { Info } from "lucide-react";

export default function DonationPage() {
  const [topics, setTopics] = useState<EventSummary[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventSummary | null>(null);

  //Donation Table States
  const [tables, setTables] = useState<IDonation[] | null>(null);
  const [newDonations, setNewDoatins] = useState<IDonation[]>([]);
  const [editingDonation, setEditingDonation] = useState<IDonation | null>(
    null
  );

  //Dialog States
  const [isAddTableDialogOpen, setIsAddTableDialogOpen] = useState(false);
  const [isRowDialogOpen, setIsRowDialogOpen] = useState(false);

  //Loading States
  const [isEventNameLoading, setIsEventNameLoading] = useState(true);
  const [isDonationDataLoading, setIsDonationDataLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    fetchDonationData();
  }, [selectedEvent]);

  const fetchEvents = async () => {
    setIsEventNameLoading(true);
    const response = await getEventNamesAndIds();
    const data: CustomResponse<EventSummary[]> = JSON.parse(response);
    const status = ShowResult<EventSummary[]>(data);
    if (status && data.data) {
      setTopics(data.data);
    }
    setIsEventNameLoading(false);
  };

  const fetchDonationData = async () => {
    setIsDonationDataLoading(true);
    if (selectedEvent) {
      const response = await getDonationByEvent(selectedEvent._id);
      const data: CustomResponse<IDonation[]> = JSON.parse(response);
      const status = ShowResult<IDonation[]>(data);
      if (status) {
        setTables(data.data!);
      }
    } else {
      toast.error("No Event Selected");
    }
    setIsDonationDataLoading(false);
  };

  const handleAddTable = (eventId: number | undefined) => {
    const selected = topics.find((topic) => topic._id === eventId);
    if (selected) {
      setSelectedEvent(selected);
      setIsAddTableDialogOpen(false);
    } else {
      toast.error("Event not found");
    }
    setIsAddTableDialogOpen(false);
  };

  const handleAddRow = () => {
    setEditingDonation(null);
    setIsRowDialogOpen(true);
  };

  const handleEditRow = (donationId: number) => {
    const donation =
      tables?.find((donation) => donation._id === donationId) ||
      newDonations.find((donation) => donation._id === donationId);
    if (donation) {
      setEditingDonation(donation);
      setIsRowDialogOpen(true);
    } else {
      toast.error("Donation not found");
    }
  };

  const handleSaveRow = (rowData: IDonation) => {
    if (rowData._id == -1) {
      const maxId = newDonations.reduce(
        (max, donation) => (donation._id > max ? donation._id : max),
        0
      );
      rowData._id = maxId + 1;
      setNewDoatins((prev) => [...prev, rowData]);
    }
    setIsRowDialogOpen(false);
  };

  const handleDeleteRow = async (donationId: number) => {
    const donation = tables?.find((donation) => donation._id === donationId);
    const newDonation = newDonations.find(
      (donation) => donation._id === donationId
    );

    if (donation) {
      if (selectedEvent) {
        const reponse = await deleteDonation(selectedEvent?._id, donationId);

        const data: CustomResponse<null> = JSON.parse(reponse);
        const status = ShowResult<null>(data);
        if (status) {
          setTables((prev) =>
            prev ? prev.filter((donation) => donation._id !== donationId) : null
          );
        }
      }
    } else if (newDonation) {
      setNewDoatins((prev) =>
        prev.filter((donation) => donation._id !== donationId)
      );
    } else {
      toast.error("Donation Not Found!");
    }
  };

  const handleDeleteTable = (tableIndex: number) => {
    // setTables((prev) => prev.filter((_, index) => index !== tableIndex));
  };

  const handleSaveNewDonations = async () => {
    if (selectedEvent) {
      const response = await createDonations(selectedEvent._id, newDonations);
      const data: CustomResponse<IDonation[]> = JSON.parse(response);
      const status = ShowResult<IDonation[]>(data);
      if (status && data.data) {
        setTables(data.data);
        setNewDoatins([]);
      }
    } else {
      toast.error("No Event Selected");
    }
  };

  return (
    <main className="p-6 bg-gray-50 min-h-screen relative">
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Donation Page</h1>
        <Button
          onClick={() => setIsAddTableDialogOpen(true)}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          {selectedEvent ? "Change Event" : "Select Event"}
        </Button>
      </div>

      <SelectTable
        isOpen={isAddTableDialogOpen}
        onClose={() => setIsAddTableDialogOpen(false)}
        onSave={handleAddTable}
        topics={topics}
        isLoading={isEventNameLoading}
      />

      <RowDialog
        isOpen={isRowDialogOpen}
        onClose={() => setIsRowDialogOpen(false)}
        onSave={handleSaveRow}
        initialData={editingDonation ?? undefined}
      />

      {tables ? (
        <DonationTable
          topic={selectedEvent?.EventName ?? "Event Select Wrong"}
          rows={tables}
          newRows={newDonations}
          onAddRow={handleAddRow}
          onEditRow={handleEditRow}
          onDeleteRow={handleDeleteRow}
          onDeleteTable={() => handleDeleteTable(0)}
        />
      ) : (
        <div className="flex flex-col items-center justify-center h-64 rounded-lg shadow-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute p-5 z-10">
          <Info className="w-12 h-12 text-blue-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            No Event Selected
          </h2>
          <div className="text-center space-y-2 text-gray-600">
            <p>
              Click{" "}
              <span className="font-medium text-blue-600">
                &quot;Select Event&quot;
              </span>{" "}
              to load data.
            </p>
            <p>To change the event, click the same button.</p>
            <p>The button is located at the top right of the screen.</p>
          </div>
        </div>
      )}

      {newDonations.length > 0 && (
        <div className="fixed bottom-6 right-6">
          <Button
            onClick={handleSaveNewDonations}
            className="bg-green-500 text-white hover:bg-green-600"
          >
            Save
          </Button>
        </div>
      )}
    </main>
  );
}
