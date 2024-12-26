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

  useEffect(() => {
    fetchM(page);
  }, []);

  const fetchM = async (skip: number) => {
    // fetch members from the database
    const response = await getAllTMembers(skip);
    if (response) {
      if (members == null) {
        setMembers(response);
      } else {
        setMembers((prev) => [...prev!, ...response]);
      }
    }
  };

  const convertDatetoString = (
    sDate?: Date | null,
    eDate?: Date | null
  ): string => {
    if (!sDate && !eDate) return "No Timeline Data";
    else if (!sDate && eDate) return "No Start Date";
    else if (sDate && !eDate) return sDate.getFullYear() + " - Present";
    else {
      const startDate = new Date(sDate!);
      const endDate = new Date(eDate!);
      const startYear = startDate.getFullYear();
      const endYear = endDate.getFullYear();

      return startYear + " - " + endYear;
    }
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
    if (members) {
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
            members.map((m) =>
              m._id === selectedMember._id ? updatedMember : m
            )
          );
        } else {
          console.error("Failed to update member");
        }
      } else {
        // Add new member
        setMembers((prev) => [...prev!, memberData as IMember]);
      }
    }
    handleCloseDialog();
  };

  return (
    <main className="text-center margin-auto h-screen relative">
      {members != null ? (
        <>
          <h1 className="text-2xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            Members
          </h1>
          <Button onClick={handleNewMember} className="mb-4">
            Add New Member
          </Button>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {members.map((member) => (
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
          <Button
            onClick={() => {
              const p = page + 1;
              setPage(p);
              fetchM(p);
            }}
          >
            Load More
          </Button>
        </>
      ) : (
        <div>Loading...</div>
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
