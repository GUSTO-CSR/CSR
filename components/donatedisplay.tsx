export default function DonateDisplay() {
  // Fake data
  const donations = [
    { name: "John Doe", batch: "Batch A", amount: "$100" },
    { name: "Jane Smith", batch: "Batch B", amount: "$200" },
    { name: "Alice Johnson", batch: "Batch C", amount: "$150" },
    { name: "Bob Brown", batch: "Batch D", amount: "$180" },
    { name: "Charlie White", batch: "Batch E", amount: "$120" },
  ];

  return (
    <div className="w-full font-sans mt-20">
      {/* First Row: Centered Topic */}
      <div className="flex justify-center items-center py-3 bg-gray-200 border-b-2 border-gray-300">
        <h2 className="text-lg font-semibold">ရေဘေးအလှူ</h2>
      </div>

      {/* Second Row: Horizontal layout with non-stop scrolling */}
      <div className="relative overflow-hidden">
        <div className="flex animate-marquee gap-6 px-4 py-2">
          {donations.concat(donations).map((donation, index) => (
            <div
              key={index}
              className="flex px-4 py-2 bg-gray-100 rounded-lg shadow-md min-w-[200px] text-center"
            >
              <h4 className="font-semibold">{donation.name}</h4>
              <p className="font-bold">{donation.batch}</p>
              <p className="text-green-600">{donation.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
