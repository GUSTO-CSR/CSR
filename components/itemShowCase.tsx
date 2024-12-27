import Image from "next/legacy/image";
import Link from "next/link";

export default function ItemShowCase(props: {
  header: string;
  url: string;
  id: number;
  func: () => void;
}) {
  return (
    <div className="w-full m-auto" onClick={props.func}>
      <div className="group relative cursor-pointer overflow-hidden transition-shadow rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-black/30">
        <div className="relative w-full h-60 md:h-80 lg:h-96">
          <Image
            src={props.url}
            alt={props.header}
            title={props.header}
            layout="fill"
            objectFit="cover"
            className="rounded-t-3xl transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 group-hover:from-black/60 transition-all duration-500"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-8 py-4 text-center translate-y-1/3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <h1 className="text-2xl font-semibold text-white mb-3">
            {props.header}
          </h1>
          <Link
            href={`/events/${props.id}`}
            className="px-4 py-2 bg-white text-black rounded-full font-medium text-sm shadow-md transition-all duration-300 hover:bg-gray-100 hover:shadow-lg"
          >
            See More
          </Link>
        </div>
      </div>
    </div>
  );
}
