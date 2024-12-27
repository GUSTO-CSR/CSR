"use client";
import Image from "next/image";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { IEvent } from "@/Schemas/EventSchema";
import { SyncLoader } from "react-spinners";
import CSRLOGO from "@/public/svg/blue_csr_logo.svg";
import { numberFormatter } from "./utils/numberFormatter";
import Inline from "yet-another-react-lightbox/plugins/inline";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import getTotalEvents from "@/app/api/v1/homepage/utils/getTotalEvents";
import { combineArraysToString } from "../funcitons/combineArraysToString";
import { splitStringIntoTwoArrays } from "../funcitons/splitStringIntoTwoArrays";
import { dateFormatChanger } from "../funcitons/dateFormatter";
import toast, { Toaster } from "react-hot-toast";

export default function Page() {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<IEvent | null>(null);
  const [totalEvents, setTotalEvents] = useState<number>(0);
  const currentIndex = parseInt(Array.isArray(id) ? id[0] : id, 10);
  const [eventNotFound, setEventNotFound] = useState(false);

  const textShadowStyle = {
    textShadow:
      "1px 1px 2px rgba(0,0,0,.7), 0 0 1em rgba(0,0,0,.3), 0 0 0.2em rgba(0,0,0,.2)",
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/v1/events/${currentIndex}`);
        console.log(response);
        if (!response.ok) {
          const contentType = response.headers.get("Content-Type");
          if (contentType && contentType.includes("application/json")) {
            const errorData = await response.json();
            toast.error(
              errorData.error || "An error occurred while fetching the event."
            );
          } else {
            const text = await response.text();
            toast.error(text || "An error occurred while fetching the event.");
          }
          setEventNotFound(true);
        } else {
          const eventString = await response.json();
          setEvent(eventString);
          setEventNotFound(false);
        }
      } catch (error) {
        console.error(error);
        setEvent(null);
        setEventNotFound(true);
      }
    };

    const fetchEvents = async () => {
      try {
        const events = await getTotalEvents();
        setTotalEvents(events);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvent();
    fetchEvents();
  }, [id, currentIndex]);

  if (eventNotFound) {
    notFound();
    return null; // Ensure that the component stops rendering after calling notFound()
  }

  if (!event) {
    return (
      <div className="w-11/12 h-[100vh] m-auto flex items-center justify-center">
        <SyncLoader color="#02598B" margin={5} size={20} />
      </div>
    );
  }

  let headerFormat = combineArraysToString(
    splitStringIntoTwoArrays(event.EventName)
  );
  const date = dateFormatChanger(event.EventDate.toString());

  const handlePrevious = () => {
    if (currentIndex > 1) {
      if (currentIndex === 3) {
        router.push(`/events/${currentIndex - 2}`);
      } else {
        router.push(`/events/${currentIndex - 1}`);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < totalEvents) {
      if (currentIndex === 1) {
        router.push(`/events/${currentIndex + 2}`);
      } else {
        router.push(`/events/${currentIndex + 1}`);
      }
    }
  };

  let photos = [];
  if (event.EventPhotoList?.length! > 0) {
    for (let i = 0; i < event.EventPhotoList?.length!; i++) {
      photos.push({ src: event.EventPhotoList![i] });
    }
  }
  const inline = {
    style: {
      width: "100%",
      maxWidth: "900px",
      aspectRatio: "3 / 2",
      margin: "0 auto",
    },
  };

  return (
    <main
      className="relative bg-white bg-opacity-20 dark:bg-black -z-[2]"
      style={{
        backgroundImage: `url(${CSRLOGO.src})`,
        backgroundSize: "50%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-white dark:bg-black opacity-70 -z-[1]"></div>

      <section className="w-11/12 mx-auto mt-20 lg:mt-28 md:mt-24 xl:mt-30 text-center">
        <p className="font-semibold opacity-75 mb-4 text-sm md:mb-6 md:text-base">
          {date}
        </p>
        <h1 className="font-black text-4xl lg:text-5xl" style={textShadowStyle}>
          {headerFormat[0]}
          <br />
          {headerFormat[1]}
        </h1>
      </section>

      <div className="max-w-[600px] w-11/12 mx-auto my-10 flex flex-col items-center relative group">
        <Suspense fallback="Image Loading">
          <Image
            className="rounded-2xl my-4 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out"
            src={event.EventPhotoURL}
            alt={event.EventName}
            title={event.EventName}
            width={1920}
            height={1080}
          />
        </Suspense>
        <p className="font-bold text-3xl md:text-4xl my-4 text-center">
          Donated Amount:{" "}
          {event.DonatedAmount
            ? `${numberFormatter(event.DonatedAmount)} Kyats`
            : ""}
        </p>
      </div>

      <section className="w-9/12 mx-auto text-center my-6">
        <h2
          className="font-bold text-2xl md:text-3xl my-6"
          style={textShadowStyle}
        >
          {event.EventName}
        </h2>
        <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-300">
          {event.EventDescription}
        </p>
      </section>

      <section className="w-9/12 mx-auto text-center my-6">
        <h2 className="font-bold text-2xl md:text-3xl my-4">More Photos</h2>
        <div>
          <Suspense fallback="Loading images...">
            {event.EventPhotoList && event.EventPhotoList.length > 0 ? (
              <Lightbox
                slides={photos}
                inline={inline}
                plugins={[Inline, Fullscreen, Slideshow, Zoom]}
              />
            ) : (
              <p>No photos available</p>
            )}
          </Suspense>
        </div>
      </section>

      <section className="flex items-center justify-center w-9/12 mx-auto my-8 gap-5">
        <button
          onClick={handlePrevious}
          disabled={currentIndex <= 1}
          className={`px-6 py-3 rounded-lg bg-blue-500 text-white transition-opacity duration-300 ${
            currentIndex <= 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex >= totalEvents}
          className={`px-6 py-3 rounded-lg bg-blue-500 text-white transition-opacity duration-300 ${
            currentIndex >= totalEvents
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </section>

      <Toaster />
    </main>
  );
}
