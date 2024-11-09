import getTotalEvents from "@/app/api/v1/homepage/utils/getTotalEvents";
import getTotalMembers from "@/app/api/v1/homepage/utils/getTotalMembers";
import getTotalMoneyDonated from "@/app/api/v1/homepage/utils/getTotalMoneyDonated";
import Image from "next/image";
import MembersImage from "@/public/images/member.png";
import MoneyImage from "@/public/images/Money.png";
import EventsImage from "@/public/images/events.png";

export default function Card() {
  const events = getTotalEvents();
  const money = getTotalMoneyDonated();
  const members = getTotalMembers();

  return (
    <section className="w-11/12 h-fit py-36 m-auto my-8 text-center bg-blue-400 rounded-2xl text-white">
      <h3 className="font-bold text-xl md:text-2xl lg:text-3xl">
        What we have done, Our Record
      </h3>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mx-4 mt-8">
        {/* Events Card */}
        <div className="h-fit rounded-2xl px-5 flex flex-col items-center justify-center">
          <Image src={EventsImage} alt="Events" height={200} className="mb-4" />
          <article className="text-wrap text-center">
            <h3 className="font-bold text-2xl md:text-3xl lg:text-4xl mt-5">
              {events}
            </h3>
            <h3 className="font-semibold text-lg md:text-xl lg:text-2xl">
              Events
            </h3>
            <p className="text-sm md:text-base lg:text-lg mt-2 opacity-95">
              New Yorkers are facing the winter chill. Beloved Manhattan soup
              stand closes.
            </p>
          </article>
        </div>

        {/* Money Donated Card */}
        <div className="h-fit rounded-2xl px-5 flex flex-col items-center justify-center">
          <Image
            src={MoneyImage}
            alt="Money Donated"
            height={200}
            className="mb-4"
          />
          <article className="text-wrap text-center">
            <h3 className="font-bold text-2xl md:text-3xl lg:text-4xl mt-5">
              ~{money.toLocaleString()} MMK
            </h3>
            <h3 className="font-semibold text-lg md:text-xl lg:text-2xl">
              MMK Donated
            </h3>
            <p className="text-sm md:text-base lg:text-lg mt-2 opacity-95">
              New Yorkers are facing the winter chill. Beloved Manhattan soup
              stand closes.
            </p>
          </article>
        </div>

        {/* Members Joined Card */}
        <div className="h-fit rounded-2xl px-5 flex flex-col items-center justify-center">
          <Image
            src={MembersImage}
            alt="Members Joined"
            height={200}
            className="mb-4"
          />
          <article className="text-wrap text-center">
            <h3 className="font-bold text-2xl md:text-3xl lg:text-4xl mt-5">
              ~{members}+
            </h3>
            <h3 className="font-semibold text-lg md:text-xl lg:text-2xl">
              Members Joined
            </h3>
            <p className="text-sm md:text-base lg:text-lg mt-2 opacity-95">
              New Yorkers are facing the winter chill. Beloved Manhattan soup
              stand closes.
            </p>
          </article>
        </div>
      </section>
    </section>
  );
}
