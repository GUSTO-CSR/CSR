"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { IDonation } from "@/Schemas/DonationSchema";

interface RowDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (rowData: IDonation) => void;
  initialData?: IDonation;
}

export function RowDialog({
  isOpen,
  onClose,
  onSave,
  initialData = undefined,
}: RowDialogProps) {
  const [rowData, setRowData] = useState<Partial<IDonation>>({});

  useEffect(() => {
    console.log(initialData ?? undefined);
    if (initialData) {
      setRowData(initialData);
    } else {
      setEmptyDonation();
    }
  }, [initialData]);

  const setEmptyDonation = () => {
    setRowData({
      _id: -1,
      Name: "",
      Batch: "",
      Balance: 0,
      CreatedTime: new Date(),
    });
  };

  const resetData = () => {
    setRowData(initialData ?? {});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-lg font-bold mb-4">Add/Edit Row</h2>
        <label className="block mb-2 text-sm font-medium">
          Name
          <input
            type="text"
            value={rowData.Name}
            onChange={(e) => setRowData({ ...rowData, Name: e.target.value })}
            placeholder="Enter name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="block mb-2 text-sm font-medium">
          Batch Number
          <input
            type="text"
            value={rowData.Batch}
            onChange={(e) => setRowData({ ...rowData, Batch: e.target.value })}
            placeholder="Enter batch number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="block mb-2 text-sm font-medium">
          Donate Amount
          <input
            type="number"
            value={rowData.Balance}
            onChange={(e) =>
              setRowData({ ...rowData, Balance: parseFloat(e.target.value) })
            }
            placeholder="Enter donate amount"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <div className="flex justify-end">
          <Button
            onClick={() => {
              onSave(rowData as IDonation);
              setEmptyDonation();
            }}
            className="bg-blue-500 text-white hover:bg-blue-600 mr-2"
          >
            Save
          </Button>
          <Button
            onClick={() => {
              onClose();
              resetData();
            }}
            className="bg-gray-500 text-white hover:bg-gray-600"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
