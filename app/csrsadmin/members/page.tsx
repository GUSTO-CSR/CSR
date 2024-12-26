"use client";
import MemberCard from "@/components/admin/member/MemberCard";
import { IMember } from "@/Schemas/MemberSchema";
import { useEffect, useState } from "react";
import { getAllTMembers } from "@/app/api/v1/members/utils/getAllTMembers";
import { Button } from "@/components/ui/button";
import { MemberDialog } from "@/components/admin/member/MemberDialog";
import { updateMember } from "../apis/members/admin_members";

export default function Page() {
  const [members, setMembers] = useState<IMember[] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<IMember | undefined>(
    undefined
  );
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchM(page);
  }, []);

  const fetchM = async (skip: number) => {
    const response = await getAllTMembers(skip);
    if (response) {
      setMembers((prev) => (prev ? [...prev, ...response] : response));
    }
  };

  const convertDatetoString = (
    sDate?: Date | null,
    eDate?: Date | null
  ): string => {
    if (!sDate && !eDate) return "No Timeline Data";
    if (!sDate && eDate) return "No Start Date";
    if (sDate && !eDate) return `${new Date(sDate).getFullYear()} - Present`;
    return `${new Date(sDate!).getFullYear()} - ${new Date(
      eDate!
    ).getFullYear()}`;
  };

  const handleCardClick = (member: IMember) => {
    setSelectedMember(member);
    setIsDialogOpen(true);
  };

  const handleNewMember = () => {
    setSelectedMember(undefined);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedMember(undefined);
  };

  const handleSaveMember = async (memberData: Partial<IMember>) => {
    if (!members) return;

    if (selectedMember) {
      // Update existing member
      const updatedMember = { ...selectedMember, ...memberData } as IMember;
      const response = await updateMember(
        updatedMember.id,
        updatedMember.Name,
        updatedMember.Batch,
        updatedMember.Role,
        updatedMember.Email,
        updatedMember.Photo
      );

      if (response) {
        setMembers(
          members.map((m) => (m._id === selectedMember._id ? updatedMember : m))
        );
      }
    } else {
      // Add new member
      setMembers((prev) => [...prev!, memberData as IMember]);
    }

    handleCloseDialog();
  };

  const filteredMembers = searchQuery.trim()
    ? members?.filter((member) =>
        member.Name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : members;

  return (
    <main className="text-center margin-auto h-screen relative bg-gray-50">
      {members ? (
        <>
          <div className="flex flex-wrap justify-between items-center mb-6 px-6 py-4 bg-white shadow-md rounded-lg">
            <div></div>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm w-full max-w-xs focus:ring-2 focus:ring-blue-500"
              />
              <Button
                onClick={handleNewMember}
                className="ml-4 bg-blue-500 text-white hover:bg-blue-600"
              >
                Add New Member
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 px-6">
            {filteredMembers?.map((member) => (
              <MemberCard
                key={member._id}
                photo={member.Photo}
                name={member.Name}
                dateRange={convertDatetoString(
                  member.StartDate,
                  member.EndDate
                )}
                onClick={() => handleCardClick(member)}
              />
            ))}
          </div>
          {!searchQuery && (
            <div className="mt-6">
              <Button
                onClick={() => {
                  const nextPage = page + 1;
                  setPage(nextPage);
                  fetchM(nextPage);
                }}
                className="bg-gray-700 text-white hover:bg-gray-800"
              >
                Load More
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          Loading...
        </div>
      )}
      <MemberDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveMember}
        member={selectedMember}
      />
    </main>
  );
}
