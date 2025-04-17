import React, { useState } from "react";
import "./FAQSection.css";

function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How are alumni vetted?",
      answer: "Every mentor is verified via college ID + LinkedIn."
    },
    {
      question: "What if I'm not satisfied?",
      answer: "100% refund within 24 hours."
    },
    {
      question: "Can parents join calls?",
      answer: "Yes! Family support is encouraged."
    }
    ,
    {
      question: "Can parents join calls?",
      answer: "Yes! Family support is encouraged."
    }
  ];

  return (
    <section className="faq-section">
      <div className="faq-container">
        <div className="faq-header">
          <h2 className="faq-title">Your Questions, Answered</h2>
          <div className="faq-underline"></div>
        </div>

        <div className="faq-grid">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`faq-card ${activeIndex === index ? 'active' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                <h3>"{faq.question}"</h3>
                <div className="faq-arrow">→</div>
              </div>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Urgency Section */}
        <div className="urgency-container">
          <div className="urgency-text">
            <h3 className="urgency-headline">Spots Fill Fast—Alumni Can't Take Infinite Calls!</h3>
            <p className="urgency-counter">Only 3 alumni left for [Top College] this month.</p>
          </div>
          <button className="urgency-cta">
            Claim Your Spot Now →
            <span className="urgency-arrow"></span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default FAQSection;