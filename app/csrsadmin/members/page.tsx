"use client";
import MemberCard from "@/components/admin/member/MemberCard";
import Logo from "@/public/images/blue_csr_logo.png";
import { IMember } from "@/Schemas/MemberSchema";
import { useEffect, useState } from "react";
import { getAllTMembers } from "@/app/api/v1/members/utils/getAllTMembers";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [members, setMembers] = useState<IMember[] | null>(null);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetchM();
  }, []);

  const fetchM = async () => {
    // fetch members from the database
    const response = await getAllTMembers(page);
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

  return (
    <main className="text-center margin-auto h-screen relative">
      {members != null ? (
        <>
          <h1 className="text-2xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            Members
          </h1>
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
              />
            ))}
          </div>
          <Button
            onClick={() => {
              const p = page + 1;
              setPage(p);
              fetchM();
            }}
          >
            Load More
          </Button>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
}
