"use client";

import { Button } from "@/components/ui/button";
import { IDonation } from "@/Schemas/DonationSchema";

interface DonationTableProps {
  topic: string;
  rows: IDonation[];
  onAddRow: () => void;
  onEditRow: (rowIndex: number) => void;
  onDeleteRow: (rowIndex: number) => void;
  onDeleteTable: () => void;
}

export function DonationTable({
  topic,
  rows,
  onAddRow,
  onEditRow,
  onDeleteRow,
  onDeleteTable,
}: DonationTableProps) {
  return (
    <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{topic}</h2>
        <div>
          <Button
            onClick={onAddRow}
            className="bg-green-500 text-white hover:bg-green-600 mr-2"
          >
            Add Row
          </Button>
          <Button
            onClick={onDeleteTable}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Delete Table
          </Button>
        </div>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Batch No</th>
            <th className="border border-gray-300 px-4 py-2">Donate Amount</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{row.Name}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {row.Batch}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${row.Balance.toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <Button
                    onClick={() => onEditRow(rowIndex)}
                    className="bg-yellow-500 text-white hover:bg-yellow-600 mr-2"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => onDeleteRow(rowIndex)}
                    className="bg-red-500 text-white hover:bg-red-600"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                className="border border-gray-300 px-4 py-2 text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
