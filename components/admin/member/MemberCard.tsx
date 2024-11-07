import Image from 'next/image';

interface MemberCardProps {
  photo: string;
  name: string;
  dateRange: string;
}

export default function MemberCard({ photo, name, dateRange }: MemberCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <Image
        src={photo}
        alt={`Photo of ${name}`}
        width={300}
        height={300}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <p className="text-gray-600">{dateRange}</p>
      </div>
    </div>
  );
}