"use client";
import MemberCard from "@/components/admin/member/MemberCard";
import { IMember } from "@/Schemas/MemberSchema";
import { useEffect, useState } from "react";
import { getAllTMembers } from "@/app/api/v1/members/utils/getAllTMembers";
import { Button } from "@/components/ui/button";
import { MemberDialog } from "@/components/admin/member/MemberDialog";
import {
  createMember,
  deleteMember,
  searchMemberByName,
  updateMember,
} from "../apis/members/admin_members";
import toast, { Toaster } from "react-hot-toast";
import { debounce } from "lodash";

export default function Page() {
  const [members, setMembers] = useState<Map<number, IMember>>(new Map());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<IMember | undefined>(
    undefined
  );
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filteredMember, setFilteredMember] = useState<IMember[] | null>(null);

  useEffect(() => {
    console.log("Fetching members");
    fetchM(page);
  }, [page]);

  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedQuery(searchQuery); // Update debounced query after delay
    }, 500); // Adjust debounce delay as needed (500ms recommended)

    handler();
    return () => handler.cancel();
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedQuery) {
      searchMember(debouncedQuery);
    } else {
      setFilteredMember(null);
    }
  }, [debouncedQuery]);

  const fetchM = async (page: number) => {
    const response = await getAllTMembers(page);
    if (response) {
      setMembers((prev) => {
        const updatedMembers = new Map(prev);
        response.forEach((member: IMember) => {
          updatedMembers.set(member._id, member);
        });
        return updatedMembers;
      });
    }
  };

  const searchMember = async (name: string) => {
    try {
      const response = await searchMemberByName(name);
      if (response) {
        const filteredMembers = JSON.parse(response);
        setFilteredMember(filteredMembers);
      } else {
        setFilteredMember([]);
      }
    } catch (error) {
      console.error("Error searching members:", error);
      setFilteredMember([]);
      toast.error("Failed to search members");
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
        updatedMember._id,
        updatedMember.Name,
        updatedMember.Batch,
        updatedMember.Role,
        updatedMember.Email,
        updatedMember.Photo
      );
      if (response) {
        toast.success("Member updated successfully");
        setMembers((prev) => {
          const updatedMembers = new Map(prev);
          updatedMembers.set(updatedMember._id, updatedMember);
          return updatedMembers;
        });
      } else {
        toast.error("Failed to update member");
      }
    } else {
      // Add new member
      const newMember = memberData as IMember;
      if (
        memberData.Name &&
        memberData.Batch &&
        memberData.Role &&
        memberData.Email &&
        memberData.Photo
      ) {
        const response = await createMember(
          memberData.Name,
          memberData.Batch,
          memberData.Role,
          memberData.Email,
          memberData.Photo
        );
        if (response) {
          toast.success("Member added successfully");
          setMembers((prev) => {
            const updatedMembers = new Map(prev);
            updatedMembers.set(newMember._id, newMember);
            return updatedMembers;
          });
        } else {
          toast.error("Failed to add member");
        }
      } else {
        toast.error("Please fill all the fields");
      }
    }

    handleCloseDialog();
  };

  const handleDelete = async (memberId: number) => {
    const response = await deleteMember(memberId);
    if (response) {
      toast.success("Member deleted successfully");
      setMembers((prev) => {
        const updatedMembers = new Map(prev);
        updatedMembers.delete(memberId);
        return updatedMembers;
      });
    } else {
      toast.error("Failed to delete member");
    }
  };

  return (
    <main className="text-center margin-auto h-screen relative bg-gray-50">
      <Toaster />
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
            {!filteredMember ? (
              <>
                {[...members.values()].map((member) => (
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
              </>
            ) : (
              <>
                {filteredMember?.map((member) => (
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
              </>
            )}
          </div>
          {!searchQuery && (
            <div className="mt-6">
              <Button
                onClick={() => setPage(page + 1)}
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
        handleDelete={handleDelete}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveMember}
        member={selectedMember}
      />
    </main>
  );
}
