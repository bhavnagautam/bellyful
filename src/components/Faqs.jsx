import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const Faqs = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "What is Bellyful and what does it do?",
      answer: `Chum literally means “how much” in Arabic and ‘buddy’ or ‘friend’ in English. Chum therefore is your price comparison buddy-app.
      \nChum gives you an instant price comparison for the travel options you search and lets you complete your booking with your selected website at the best available price in the market.`
    },
    {
      question: "How do I use Bellyful?",
      answer: `To use Bellyful, simply enter your travel details into the search bar. We'll compare prices across various providers and present you with the best options. Select the best deal and complete your booking on the provider's site.`
    },
    {
      question: "How does Bellyful save me time and money?",
      answer: `Bellyful saves you time by providing a quick comparison of travel options. It helps you save money by showing you the best available prices across different providers.`
    },
    {
      question: "Is there a fee or charge to use Bellyful?",
      answer: `No, Bellyful is completely free to use. We earn a commission from providers when you make a booking through our site, but there is no additional cost to you.`
    },
    {
      question: "Who operates Bellyful?",
      answer: `Bellyful is operated by a team of travel experts and technology professionals dedicated to helping you find the best travel deals.`
    }
  ];

  return (
    <div className="p-4 md:p-8">
      <div className="text-center">
        <p className="text-3xl md:text-4xl font-bold">FAQs</p>
        <p className="text-xl md:text-2xl font-semibold pt-2">About Bellyful</p>
      </div>

      <div className="mt-8 flex flex-col items-center space-y-4 md:space-y-6">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="w-full max-w-4xl bg-white text-black border border-gray-200 rounded-lg shadow-md"
          >
            <div
              className={`flex items-center justify-between p-4 cursor-pointer ${
                expandedIndex === index ? "bg-gray-100 text-black" : ""
              }`}
              onClick={() => handleToggle(index)}
            >
              <h5 className="text-lg font-bold text-black">
                {item.question}
              </h5>
              <button className="text-black">
                {expandedIndex === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </button>
            </div>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                expandedIndex === index ? "max-h-[500px] p-4" : "max-h-0"
              }`}
            >
              <p className="font-normal text-black">
                {item.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;

