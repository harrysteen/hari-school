import React from 'react';

export default function DailyRoutine() {
  return (
    <section className="section-schedule" id="schedule">
      <div className="container">
        <div className="section-header">
          <span className="badge-tag" style={{ marginBottom: '12px' }}>Daily Flow</span>
          <h2 className="section-title">A rhythm built for optimal brain development.</h2>
          <p className="lead">
            Short, laser-focused synchronous learning blocks balanced with physical play and offline mastery.
          </p>
        </div>

        <div className="schedule-container">
          <div className="timeline-row">
            <div className="timeline-time">09:00 – 09:45 AM</div>
            <div className="timeline-card">
              <div>
                <div className="timeline-title">Synchronous Session 1: Socratic Math & Logic</div>
                <div className="timeline-sub">Live cohort with Master Educator (Max 6 students)</div>
              </div>
              <span className="timeline-pill pill-live">Live Synchronous</span>
            </div>
          </div>

          <div className="timeline-row">
            <div className="timeline-time">09:45 – 10:15 AM</div>
            <div className="timeline-card">
              <div>
                <div className="timeline-title">Movement & Cognitive Recharge Break</div>
                <div className="timeline-sub">Screen-free physical activity, hydration, sensory reset</div>
              </div>
              <span className="timeline-pill pill-break">Screen-Free</span>
            </div>
          </div>

          <div className="timeline-row">
            <div className="timeline-time">10:15 – 11:00 AM</div>
            <div className="timeline-card">
              <div>
                <div className="timeline-title">Synchronous Session 2: Global Humanities & Language Arts</div>
                <div className="timeline-sub">Collaborative storytelling, debate, vocabulary analysis</div>
              </div>
              <span className="timeline-pill pill-live">Live Synchronous</span>
            </div>
          </div>

          <div className="timeline-row">
            <div className="timeline-time">11:00 – 01:00 PM</div>
            <div className="timeline-card">
              <div>
                <div className="timeline-title">Lunch & Nature / Outdoor Exploration</div>
                <div className="timeline-sub">Family time, outdoor play, physical development</div>
              </div>
              <span className="timeline-pill pill-break">Unstructured Play</span>
            </div>
          </div>

          <div className="timeline-row">
            <div className="timeline-time">01:00 – 02:30 PM</div>
            <div className="timeline-card">
              <div>
                <div className="timeline-title">Offline Passion Projects & Independent Reading</div>
                <div className="timeline-sub">Hands-on science builds, creative writing, robotics kits</div>
              </div>
              <span className="timeline-pill pill-async">Asynchronous Project</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
