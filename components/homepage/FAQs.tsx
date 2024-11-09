import { useState } from "react";

export default function FAQs() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I update my billing information?",
      answer:
        'To update your billing information, go to the settings page under "Billing" section.',
    },
    {
      question: "How can I contact customer support?",
      answer:
        'To contact customer support, look for a "Contact us" or "Help" button on the website.',
    },
    {
      question: "How do I update my profile information?",
      answer:
        "Navigate to the profile settings page to update your personal information.",
    },
    {
      question: "How do I find my purchase history?",
      answer:
        'Go to the "Order History" section in your account settings to view past purchases.',
    },
  ];

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h6 className="text-lg text-indigo-600 font-medium text-center mb-2">
            FAQs
          </h6>
          <h2 className="text-4xl font-manrope text-center font-bold text-gray-900 leading-[3.25rem]">
            Frequently asked questions
          </h2>
        </div>

        <div className="accordion-group">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`accordion py-8 px-6 border-b border-solid border-gray-200 transition-all duration-500 rounded-2xl hover:bg-indigo-50 ${
                activeIndex === index ? "bg-indigo-50" : ""
              }`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="accordion-toggle group inline-flex items-center justify-between leading-8 text-gray-900 w-full transition duration-500 text-left hover:text-indigo-600"
                aria-controls={`collapse-${index}`}
              >
                <h5>{faq.question}</h5>
                <svg
                  className={`text-gray-500 transition duration-500 group-hover:text-indigo-600 ${
                    activeIndex === index ? "rotate-180 text-indigo-600" : ""
                  }`}
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
              {activeIndex === index && (
                <div
                  id={`collapse-${index}`}
                  className="accordion-content w-full px-0 overflow-hidden"
                >
                  <p className="text-base text-gray-900 leading-6">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}