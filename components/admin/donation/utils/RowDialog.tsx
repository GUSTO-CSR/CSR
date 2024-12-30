import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface RowData {
  name: string;
  batch: string;
  amount: number;
}

interface RowDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (rowData: RowData) => void;
  initialData?: RowData;
}

export function RowDialog({
  isOpen,
  onClose,
  onSave,
  initialData,
}: RowDialogProps) {
  const [rowData, setRowData] = useState<RowData>({
    name: "",
    batch: "",
    amount: 0,
  });

  useEffect(() => {
    if (initialData) {
      setRowData(initialData);
    }
  }, [initialData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-lg font-bold mb-4">Add/Edit Row</h2>
        <label className="block mb-2 text-sm font-medium">
          Name
          <input
            type="text"
            value={rowData.name}
            onChange={(e) => setRowData({ ...rowData, name: e.target.value })}
            placeholder="Enter name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="block mb-2 text-sm font-medium">
          Batch Number
          <input
            type="text"
            value={rowData.batch}
            onChange={(e) => setRowData({ ...rowData, batch: e.target.value })}
            placeholder="Enter batch number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="block mb-2 text-sm font-medium">
          Donate Amount
          <input
            type="number"
            value={rowData.amount}
            onChange={(e) =>
              setRowData({ ...rowData, amount: parseFloat(e.target.value) })
            }
            placeholder="Enter donate amount"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <div className="flex justify-end">
          <Button
            onClick={() => onSave(rowData)}
            className="bg-blue-500 text-white hover:bg-blue-600 mr-2"
          >
            Save
          </Button>
          <Button
            onClick={onClose}
            className="bg-gray-500 text-white hover:bg-gray-600"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
