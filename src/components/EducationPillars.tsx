import React from 'react';

export default function EducationPillars() {
  return (
    <section className="section-editorial" id="education">
      <div className="container">
        <div className="section-header">
          <span className="badge-tag" style={{ marginBottom: '12px' }}>The bina Difference</span>
          <h2 className="section-title">Designed for sustained focus, not endless scrolling.</h2>
          <p className="lead">
            Traditional education was designed for the industrial factory era. bina is crafted from cognitive neuroscience principles to nurture high-agency thinkers.
          </p>
        </div>

        <div className="pillars-grid">
          {/* Pillar 1 */}
          <article className="pillar-card">
            <div className="pillar-icon-box">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="pillar-title">Synchronous Micro-Cohorts</h3>
            <p className="pillar-desc">
              Children learn in intimate groups of 4 to 7 students grouped by developmental velocity. No student is left behind or held back.
            </p>
            <span className="pillar-tag">Max 7 Students per Class</span>
          </article>

          {/* Pillar 2 */}
          <article className="pillar-card">
            <div className="pillar-icon-box">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 6v6l4 2"></path>
              </svg>
            </div>
            <h3 className="pillar-title">Intentional Screen Time</h3>
            <p className="pillar-desc">
              90 minutes of high-engagement live instruction daily, followed by screen-free hands-on exploration, reading, and physical experimentation.
            </p>
            <span className="pillar-tag">100% Screen-Free Afternoons</span>
          </article>

          {/* Pillar 3 */}
          <article className="pillar-card">
            <div className="pillar-icon-box">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <h3 className="pillar-title">Precision Mastery Feedback</h3>
            <p className="pillar-desc">
              Continuous qualitative analytics and adaptive pacing ensure every foundational concept is mastered before advancing.
            </p>
            <span className="pillar-tag">Diagnostic Progression</span>
          </article>
        </div>
      </div>
    </section>
  );
}
