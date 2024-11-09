import getTotalEvents from "@/app/api/v1/homepage/utils/getTotalEvents";
import getTotalMembers from "@/app/api/v1/homepage/utils/getTotalMembers";
import getTotalMoneyDonated from "@/app/api/v1/homepage/utils/getTotalMoneyDonated";
import Image from "next/image";
import Members from "@/public/images/member.png";
import Money from "@/public/images/Money.png";

import Events from "@/public/images/events.png";

export default function Card() {
  const events = getTotalEvents();
  const money = getTotalMoneyDonated();
  const member = getTotalMembers();
  return (
    <section className="w-11/12 h-fit py-36 m-auto my-8 text-center bg-blue-400 rounded-2xl text-white">
      <h3 className="font-bold text-2xl">What we have done, Our Record</h3>
      <section className="grid grid-cols-3 gap-10 mx-16 mt-8 ">
        <div className="h-fit  rounded-2xl px-5 flex flex-col items-center justify-center">
          <Image src={Events} alt="Heloo" height={200} />
          <article className="text-wrap ">
            <h3 className="font-bold mt-5">9</h3>
            <h3 className="font-bold ">Events</h3>
            <p className="text-sm mt-2 opacity-95">
              New Yorkers are facing the winter chill Beloved Manhattan soup
              stand closes sfsgdfg sdfsg
            </p>
          </article>
        </div>
        <div className="h-fit  rounded-2xl px-5 flex flex-col items-center justify-center">
          <Image src={Money} alt="Heloo" height={200} />
          <article className="text-wrap ">
            <h3 className="font-bold mt-5">~12,000,000</h3>
            <h3 className="font-bold ">MMK Donated</h3>
            <p className="text-sm mt-2 opacity-95">
              New Yorkers are facing the winter chill Beloved Manhattan soup
              stand closes sfsgdfg sdfsg
            </p>
          </article>
        </div>
        <div className="h-fit  rounded-2xl px-5 flex flex-col items-center justify-center">
          <Image src={Members} alt="Heloo" height={200} />
          <article className="text-wrap ">
            <h3 className="font-bold mt-5">~150+</h3>
            <h3 className="font-bold ">Members Joined</h3>
            <p className="text-sm mt-2 opacity-95">
              New Yorkers are facing the winter chill Beloved Manhattan soup
              stand closes sfsgdfg sdfsg
            </p>
          </article>
        </div>
      </section>
    </section>
  );
}
