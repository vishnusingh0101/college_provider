import React, { useState } from 'react';
import messageIcon from '/assets/images/message.png';

const SingleFaq = ({ i, item }) => {
  const [isOpen, setIsOpen] = useState(i === 0);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="p-10 space-y-4 border-b border-gray-300 pb-4">
      <button
          onClick={toggleAccordion}
          className={`flex-1 text-left font-semibold ${isOpen ? "" : "text-gray-600"}`}
          aria-expanded={isOpen}
          aria-controls={`collapseFundOne${i}`}
        >
      <h5 className="flex cursor-pointer items-center space-x-2" id={`headingFundOne${i}`}>
        <span className="w-6 h-6 mx-2">
          <img src={messageIcon} alt="message" className="w-full h-full" />
        </span>
          {item.title}
      </h5>
      </button>
      <div
        id={`collapseFundOne${i}`}
        className={`pl-8 text-gray-700 overflow-hidden transition-max-height duration-300 ease-in-out ${isOpen ? "max-h-40" : "max-h-0"}`}
        aria-labelledby={`headingFundOne${i}`}
      >
        <p>--&gt;{item.details}</p>
      </div>
    </div>
  );
};

export default SingleFaq;
