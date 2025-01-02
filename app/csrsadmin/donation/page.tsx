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
import { getDonationByEvent } from "../apis/donation/admin_donation";
import { ShowResult } from "@/lib/utils";

export default function DonationPage() {
  const [topics, setTopics] = useState<EventSummary[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventSummary | null>(null);
  const [tables, setTables] = useState<IDonation[] | null>(null);

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
    if (data.error) {
      toast.error(data.message);
    }

    if (data.data) {
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

  const handleAddRow = (tableIndex: number) => {
    // setCurrentTableIndex(tableIndex);
    // setCurrentRowIndex(null);
    // setIsRowDialogOpen(true);
  };

  const handleEditRow = (tableIndex: number, rowIndex: number) => {
    // setCurrentTableIndex(tableIndex);
    // setCurrentRowIndex(rowIndex);
    // setIsRowDialogOpen(true);
  };

  const handleSaveRow = (rowData: IDonation) => {
    // if (currentTableIndex !== null) {
    //   setTables((prev) => {
    //     const updatedTables = [...prev];
    //     if (currentRowIndex !== null) {
    //       // Edit existing row
    //       updatedTables[currentTableIndex].rows[currentRowIndex] = rowData;
    //     } else {
    //       // Add new row
    //       updatedTables[currentTableIndex].rows.push(rowData);
    //     }
    //     return updatedTables;
    //   });
    //   setIsRowDialogOpen(false);
    // }
  };

  const handleDeleteRow = (tableIndex: number, rowIndex: number) => {
    // setTables((prev) => {
    // const updatedTables = [...prev];
    // updatedTables[tableIndex].rows.splice(rowIndex, 1);
    // return updatedTables;
    // });
  };

  const handleDeleteTable = (tableIndex: number) => {
    // setTables((prev) => prev.filter((_, index) => index !== tableIndex));
  };

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
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
      />

      {tables ? (
        <DonationTable
          topic={selectedEvent?.EventName ?? "Event Select Wrong"}
          rows={tables}
          onAddRow={() => handleAddRow(0)}
          onEditRow={(rowIndex) => handleEditRow(0, rowIndex)}
          onDeleteRow={(rowIndex) => handleDeleteRow(0, rowIndex)}
          onDeleteTable={() => handleDeleteTable(0)}
        />
      ) : (
        <>
          <p>
            Click <q>Select Event</q> to load data
          </p>
          <p>To Change Event click the same button.</p>
          <p>The button is on the right top of the screen.</p>
        </>
      )}
    </main>
  );
}
