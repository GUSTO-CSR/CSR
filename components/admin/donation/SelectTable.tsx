"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EventSummary } from "@/app/custom-response";

interface SelectTableProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (eventId: number | undefined) => void;
  topics: EventSummary[] | null;
  isLoading: boolean;
}

export function SelectTable({
  isOpen,
  onClose,
  onSave,
  topics,
  isLoading,
}: SelectTableProps) {
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-lg font-bold mb-4">Choose Event</h2>
        {isLoading ? (
          <div className="flex items-center justify-center h-10">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <select
            value={selectedTopic ?? ""}
            onChange={(e) => setSelectedTopic(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select an event
            </option>
            {topics?.map((topic) => (
              <option key={topic._id} value={topic._id}>
                {topic.EventName}
              </option>
            ))}
          </select>
        )}
        <div className="flex justify-end">
          <Button
            onClick={() => {
              onSave(selectedTopic ?? undefined);
              setSelectedTopic(null);
            }}
            className="bg-blue-500 text-white hover:bg-blue-600 mr-2"
            disabled={isLoading || selectedTopic === null}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              onClose();
              setSelectedTopic(null);
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
