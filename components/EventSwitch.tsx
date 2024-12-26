import { useState } from "react";

interface EventSwitchProps {
  previousFunc: () => void;
  upcomingFunc: () => void;
}

export default function EventSwitch({
  previousFunc,
  upcomingFunc,
}: EventSwitchProps) {
  const [isPreviousActive, setIsPreviousActive] = useState(true);

  const handleButtonClick = (isPrevious: boolean) => {
    setIsPreviousActive(isPrevious);
    isPrevious ? previousFunc() : upcomingFunc();
  };

  return (
    <div className="w-11/12 m-auto flex justify-center mt-20 lg:mt-28 xl:mt-32">
      <div className="lg:w-4/12 w-8/12 flex bg-primary dark:bg-secondary text-center rounded-full shadow-md font-semibold text-sm lg:text-base transition-all">
        <button
          className={`w-1/2 py-2 rounded-l-full transition-all duration-300 ${
            isPreviousActive
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
          }`}
          onClick={() => handleButtonClick(true)}
        >
          Previous
        </button>
        <button
          className={`w-1/2 py-2 rounded-r-full transition-all duration-300 ${
            !isPreviousActive
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
          }`}
          onClick={() => handleButtonClick(false)}
        >
          Upcoming
        </button>
      </div>
    </div>
  );
}
