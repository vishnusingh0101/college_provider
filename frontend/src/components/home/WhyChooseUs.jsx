import React from "react";
import "./WhyChooseUs.css"; // Unique CSS file

function WhyChooseUs() {
  return (
    <section className="why-choose-us-section">
      <div className="why-choose-us-container">
        <div className="why-choose-us-header">
          <h2 className="why-choose-us-title">Free Advice vs. College Connect</h2>
          <div className="why-choose-us-underline"></div>
        </div>

        <div className="comparison-table">
          <div className="comparison-column free-resources-col">
            <h3 className="comparison-col-title">Free Resources (Blogs/Youtube)</h3>
            <ul className="comparison-list">
              <li className="comparison-item">
                <span className="comparison-icon">✖</span>
                Generic, one-size-fits-all advice
              </li>
              <li className="comparison-item">
                <span className="comparison-icon">✖</span>
                No accountability
              </li>
              <li className="comparison-item">
                <span className="comparison-icon">✖</span>
                Static information
              </li>
              <li className="comparison-item">
                <span className="comparison-icon">✖</span>
                Stops at "how to get in"
              </li>
            </ul>
          </div>

          <div className="comparison-column college-connect-col">
            <h3 className="comparison-col-title">College Connect</h3>
            <ul className="comparison-list">
              <li className="comparison-item">
                <span className="comparison-icon">✓</span>
                Personalized 1:1 mentorship
              </li>
              <li className="comparison-item">
                <span className="comparison-icon">✓</span>
                Alumni invested in your success
              </li>
              <li className="comparison-item">
                <span className="comparison-icon">✓</span>
                Real-time, insider updates
              </li>
              <li className="comparison-item">
                <span className="comparison-icon">✓</span>
                Guides you through college life
              </li>
            </ul>
          </div>
        </div>

        <button className="why-choose-us-cta">
          Stop Guessing—Start Connecting
          <span className="why-choose-us-arrow">→</span>
        </button>
      </div>
    </section>
  );
}

export default WhyChooseUs;