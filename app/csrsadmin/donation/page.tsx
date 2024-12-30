"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SelectTable } from "@/components/admin/donation/SelectTable";
import { getEventNamesAndIds } from "../apis/events/admin_events";
import { RowDialog } from "@/components/admin/donation/utils/RowDialog";
import { DonationTable } from "@/components/admin/donation/utils/DonationTable";
import { CustomResponse, EventSummary } from "@/app/custom-response";
import toast, { Toaster } from "react-hot-toast";

interface TableRow {
  name: string;
  batch: string;
  amount: number;
}

interface TableData {
  topic: string;
  rows: TableRow[];
}

export default function DonationPage() {
  const [tables, setTables] = useState<TableData[]>([]);
  const [isAddTableDialogOpen, setIsAddTableDialogOpen] = useState(false);
  const [isRowDialogOpen, setIsRowDialogOpen] = useState(false);
  const [currentTableIndex, setCurrentTableIndex] = useState<number | null>(
    null
  );
  const [currentRowIndex, setCurrentRowIndex] = useState<number | null>(null);
  const [topics, setTopics] = useState<EventSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    const response = await getEventNamesAndIds();
    const data: CustomResponse<EventSummary[]> = JSON.parse(response);
    if (data.error) {
      toast.error(data.message);
    }

    if (data.data) {
      setTopics(data.data);
    }
    setIsLoading(false);
  };

  const handleAddTable = (topic: string) => {
    setTables((prev) => [...prev, { topic, rows: [] }]);
    setIsAddTableDialogOpen(false);
  };

  const handleAddRow = (tableIndex: number) => {
    setCurrentTableIndex(tableIndex);
    setCurrentRowIndex(null);
    setIsRowDialogOpen(true);
  };

  const handleEditRow = (tableIndex: number, rowIndex: number) => {
    setCurrentTableIndex(tableIndex);
    setCurrentRowIndex(rowIndex);
    setIsRowDialogOpen(true);
  };

  const handleSaveRow = (rowData: TableRow) => {
    if (currentTableIndex !== null) {
      setTables((prev) => {
        const updatedTables = [...prev];
        if (currentRowIndex !== null) {
          // Edit existing row
          updatedTables[currentTableIndex].rows[currentRowIndex] = rowData;
        } else {
          // Add new row
          updatedTables[currentTableIndex].rows.push(rowData);
        }
        return updatedTables;
      });
      setIsRowDialogOpen(false);
    }
  };

  const handleDeleteRow = (tableIndex: number, rowIndex: number) => {
    setTables((prev) => {
      const updatedTables = [...prev];
      updatedTables[tableIndex].rows.splice(rowIndex, 1);
      return updatedTables;
    });
  };

  const handleDeleteTable = (tableIndex: number) => {
    setTables((prev) => prev.filter((_, index) => index !== tableIndex));
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
          Add New Table
        </Button>
      </div>

      <SelectTable
        isOpen={isAddTableDialogOpen}
        onClose={() => setIsAddTableDialogOpen(false)}
        onSave={handleAddTable}
        topics={topics}
        isLoading={isLoading}
      />

      <RowDialog
        isOpen={isRowDialogOpen}
        onClose={() => setIsRowDialogOpen(false)}
        onSave={handleSaveRow}
        initialData={
          currentTableIndex !== null && currentRowIndex !== null
            ? tables[currentTableIndex].rows[currentRowIndex]
            : undefined
        }
      />

      {tables.map((table, index) => (
        <DonationTable
          key={index}
          topic={table.topic}
          rows={table.rows}
          onAddRow={() => handleAddRow(index)}
          onEditRow={(rowIndex) => handleEditRow(index, rowIndex)}
          onDeleteRow={(rowIndex) => handleDeleteRow(index, rowIndex)}
          onDeleteTable={() => handleDeleteTable(index)}
        />
      ))}
    </main>
  );
}
