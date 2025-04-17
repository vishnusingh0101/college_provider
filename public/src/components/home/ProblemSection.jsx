import React from "react";
import "./ProblemSection.css";

function ProblemSection() {
  return (
    <section className="problem-section">
      <div className="problem-container">
        {/* Image Column - Added on left side */}
        <div className="image-column">
  <a href="#" className="image-placeholder">
    <img 
      src="/roup.jpg" 
      alt="College admissions process" 
      className="problem-section-image"
    />
  </a>
</div>

        {/* Content Column - Now takes half width on right */}
        <div className="content-column">
          <div className="section-header">
            <h2 className="section-title">College Admissions Are Broken</h2>
            <div className="PS-underline"></div>
          </div>
          
          <div className="problem-points">
            <div className="problem-item">
              <div className="problem-icon-container">
                <span className="problem-icon">✖</span>
              </div>
              <p className="problem-text">Generic blogs/vlogs leave you more confused than when you started.</p>
            </div>
            
            <div className="problem-item">
              <div className="problem-icon-container">
                <span className="problem-icon">✖</span>
              </div>
              <p className="problem-text">Counselors don't understand your dream college's specific challenges.</p>
            </div>
            
            <div className="problem-item">
              <div className="problem-icon-container">
                <span className="problem-icon">✖</span>
              </div>
              <p className="problem-text">Nobody prepares you for what comes after admission day.</p>
            </div>
          </div>
          
          <div className="solution-teaser">
            <div className="solution-line"></div>
            <p className="solution-text">There's a Better Way</p>
            <div className="solution-line"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProblemSection;