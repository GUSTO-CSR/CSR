import { convertObjectToBase64 } from "@/lib/utils";
import Image from "next/image";

interface MemberCardProps {
  photo: string;
  name: string;
  dateRange: string;
  onClick: () => void;
}

export default function MemberCard({
  photo,
  name,
  dateRange,
  onClick,
}: MemberCardProps) {
  return (
    <div
      className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <Image
        src={`data:image/png;base64,${convertObjectToBase64(photo)}`}
        alt={`Photo of ${name}`}
        width={150}
        height={150}
        className="w-full h-fit object-cover"
      />
      <div className="p-4">
        <h2 className="text-base font-semibold mb-2">{name}</h2>
        <p className="text-gray-600 text-sm">{dateRange}</p>
      </div>
    </div>
  );
}
