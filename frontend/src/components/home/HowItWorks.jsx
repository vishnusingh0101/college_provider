import React from "react";
import "./HowItWorks.css";

function HowItWorks() {
  return (
    <section className="how-it-works">
      <div className="containerr">
        <div className="two-column-layout">
          <div className="content-column">
            <div className="section-header">
              <h2 className="title">How College Connect Works</h2>
              <div className="HIW-underline"></div>
            </div>

            <div className="steps-container">
              {/* Step 1 */}
              <div className="step-card">
                <div className="step-number">01</div>
                <div className="step-content">
                  <h3>Find Your Alumni Mentor</h3>
                  <p>Search by college, course, or career to find the perfect guide who's walked your path.</p>
                </div>
                <div className="step-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>

              {/* Step 2 */}
              <div className="step-card">
                <div className="step-number">02</div>
                <div className="step-content">
                  <h3>Book a 1:1 Call</h3>
                  <p>15-minute free trial or paid deep-dive sessions tailored to your needs.</p>
                </div>
                <div className="step-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
                  </svg>
                </div>
              </div>

              {/* Step 3 */}
              <div className="step-card">
                <div className="step-number">03</div>
                <div className="step-content">
                  <h3>Get Insider Intel</h3>
                  <div className="insider-tips">
                    <div className="tip">"Which professors to avoid?"</div>
                    <div className="tip">"How to ace the entrance interview?"</div>
                    <div className="tip">"What's the real placement scene?"</div>
                  </div>
                </div>
                <div className="step-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                  </svg>
                </div>
              </div>
            </div>

            <button className="cta-buttonn">
              Meet Your Mentor →
              <span className="arrow"></span>
            </button>
          </div>

          <div className="image-column">
  <a href="#" className="image-placeholder">
    <img 
      src="/colleges.png" 
      alt="Students connecting with mentors" 
      className="how-it-works-image"
    />
  </a>
</div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;