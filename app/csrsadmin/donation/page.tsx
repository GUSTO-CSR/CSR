"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface TableRow {
  name: string;
  batch: string; // Changed to string
  amount: number;
}

interface TableData {
  topic: string;
  rows: TableRow[];
}

export default function DonationPage() {
  const [tables, setTables] = useState<TableData[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRowDialogOpen, setIsRowDialogOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [currentTableIndex, setCurrentTableIndex] = useState<number | null>(
    null
  );
  const [rowData, setRowData] = useState<TableRow>({
    name: "",
    batch: "",
    amount: 0,
  });

  const topics = ["Topic A", "Topic B", "Topic C"]; // Dropdown topics

  const handleAddTable = () => {
    setIsDialogOpen(true);
  };

  const handleSaveTable = () => {
    if (selectedTopic) {
      setTables((prev) => [...prev, { topic: selectedTopic, rows: [] }]);
      setSelectedTopic("");
      setIsDialogOpen(false);
    }
  };

  const handleAddRow = (tableIndex: number) => {
    setCurrentTableIndex(tableIndex);
    setRowData({ name: "", batch: "", amount: 0 }); // Reset form data
    setIsRowDialogOpen(true);
  };

  const handleSaveRow = () => {
    if (currentTableIndex !== null) {
      setTables((prev) => {
        const updatedTables = [...prev];
        const newRow = { ...rowData }; // Ensure a new copy of rowData is created
        updatedTables[currentTableIndex].rows = [
          ...updatedTables[currentTableIndex].rows,
          newRow,
        ];
        return updatedTables;
      });
      setIsRowDialogOpen(false);
    }
  };

  const handleEditRow = (tableIndex: number, rowIndex: number) => {
    setCurrentTableIndex(tableIndex);
    setRowData({ ...tables[tableIndex].rows[rowIndex] }); // Load row data for editing
    setIsRowDialogOpen(true);
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Donation Page</h1>
        <Button
          onClick={handleAddTable}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Add New Table
        </Button>
      </div>

      {/* Dialog for adding new table */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-80">
            <h2 className="text-lg font-bold mb-4">Add New Table</h2>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select a topic
              </option>
              {topics.map((topic, index) => (
                <option key={index} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
            <div className="flex justify-end">
              <Button
                onClick={handleSaveTable}
                className="bg-blue-500 text-white hover:bg-blue-600 mr-2"
              >
                Save
              </Button>
              <Button
                onClick={() => setIsDialogOpen(false)}
                className="bg-gray-500 text-white hover:bg-gray-600"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Dialog for adding/editing a row */}
      {isRowDialogOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-80">
            <h2 className="text-lg font-bold mb-4">Add/Edit Row</h2>
            <label className="block mb-2 text-sm font-medium">
              Name
              <input
                type="text"
                value={rowData.name}
                onChange={(e) =>
                  setRowData({ ...rowData, name: e.target.value })
                }
                placeholder="Enter name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="block mb-2 text-sm font-medium">
              Batch Number
              <input
                type="text" // Input type is now text
                value={rowData.batch}
                onChange={(e) =>
                  setRowData({ ...rowData, batch: e.target.value })
                }
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
                  setRowData({
                    ...rowData,
                    amount: parseFloat(e.target.value),
                  })
                }
                placeholder="Enter donate amount"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <div className="flex justify-end">
              <Button
                onClick={handleSaveRow}
                className="bg-blue-500 text-white hover:bg-blue-600 mr-2"
              >
                Save
              </Button>
              <Button
                onClick={() => setIsRowDialogOpen(false)}
                className="bg-gray-500 text-white hover:bg-gray-600"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Tables */}
      {tables.map((table, index) => (
        <div key={index} className="mb-8 bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{table.topic}</h2>
            <div>
              <Button
                onClick={() => handleAddRow(index)}
                className="bg-green-500 text-white hover:bg-green-600 mr-2"
              >
                Add Row
              </Button>
              <Button
                onClick={() => handleDeleteTable(index)}
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
                <th className="border border-gray-300 px-4 py-2">
                  Donate Amount
                </th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {table.rows.length > 0 ? (
                table.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="text-center">
                    <td className="border border-gray-300 px-4 py-2">
                      {row.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {row.batch}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      ${row.amount.toFixed(2)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <Button
                        onClick={() => handleEditRow(index, rowIndex)}
                        className="bg-yellow-500 text-white hover:bg-yellow-600 mr-2"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDeleteRow(index, rowIndex)}
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
      ))}
    </main>
  );
}
