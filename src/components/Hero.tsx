'use client';

import React, { useState } from 'react';

interface HeroProps {
  onOpenAssessment: () => void;
}

export default function Hero({ onOpenAssessment }: HeroProps) {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const handleQuizChoice = (choice: 'A' | 'B' | 'C') => {
    setSelectedQuiz(choice);
    if (choice === 'B') {
      setIsCorrect(true);
      setFeedback("✨ Brilliant deduction! Leo & Aria's rover gathered both samples in only 4 vector units.");
    } else {
      setIsCorrect(false);
      setFeedback("💡 Good hypothesis! Hint: Diagonal vectors cover 2 dimensions simultaneously in this grid.");
    }
  };

  return (
    <section className="hero-section" id="hero">
      <div className="container hero-grid">
        <div className="hero-content">
          <div className="badge-tag">
            <span className="indicator"></span>
            Global Cohorts Enrolling · Fall 2026/27
          </div>
          
          <h1 className="hero-title">
            The <span className="highlight-yellow">precision school</span> for curious minds aged <span className="highlight-purple">4–12</span>.
          </h1>

          <p className="lead">
            bina replaces passive screen time and oversized classrooms with live, synchronous micro-cohorts (4–7 children), master educators, and real-time cognitive mastery tracking.
          </p>

          <div className="hero-actions">
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={onOpenAssessment}
            >
              <span>Book Placement Assessment</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <a href="#curriculum" className="btn btn-accent-purple">
              Explore Global Curriculum
            </a>
          </div>

          <div className="hero-stats-row">
            <div className="stat-item">
              <span className="stat-number">1:6</span>
              <span className="stat-label">Max Teacher Ratio</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">90 min</span>
              <span className="stat-label">Daily Live Learning</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">38+</span>
              <span className="stat-label">Countries Represented</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">94%</span>
              <span className="stat-label">Subject Mastery Rate</span>
            </div>
          </div>
        </div>

        {/* Live Cohort Interactive Card */}
        <div className="classroom-card" id="interactiveClassroom">
          <div className="card-topbar">
            <div className="live-badge">LIVE COHORT IN SESSION</div>
            <div className="cohort-info">Stage 2 · Computational Thinking</div>
          </div>

          <div className="cohort-grid">
            {/* Master Educator Slot */}
            <div className="video-slot teacher">
              <div className="avatar-circle avatar-teacher">Ms. Elena</div>
              <div className="video-label">
                <span className="speaking-indicator"></span> Lead Master Educator (Oxford)
              </div>
            </div>

            {/* Student 1 */}
            <div className="video-slot">
              <div className="avatar-circle avatar-student-1">Leo (6)</div>
              <div className="video-label">Munich, DE</div>
            </div>

            {/* Student 2 */}
            <div className="video-slot">
              <div className="avatar-circle avatar-student-2">Aria (7)</div>
              <div className="video-label">Tokyo, JP</div>
            </div>
          </div>

          {/* Interactive Cohort Prompt Widget */}
          <div className="interactive-prompt-box">
            <div className="prompt-text">💡 Live Question: Which path lets the rover collect both water samples in fewest steps?</div>
            <div className="quiz-options">
              <button 
                type="button"
                className={`quiz-btn ${selectedQuiz === 'A' ? 'selected' : ''}`}
                onClick={() => handleQuizChoice('A')}
              >
                Path A: Right 2, Up 3
              </button>
              <button 
                type="button"
                className={`quiz-btn ${selectedQuiz === 'B' ? 'correct' : ''}`}
                onClick={() => handleQuizChoice('B')}
              >
                Path B: Diagonal 1, Up 2, Right 1
              </button>
              <button 
                type="button"
                className={`quiz-btn ${selectedQuiz === 'C' ? 'selected' : ''}`}
                onClick={() => handleQuizChoice('C')}
              >
                Path C: Up 4, Turn Right
              </button>
            </div>
            {feedback && (
              <div 
                className="text-meta" 
                style={{ 
                  marginTop: '8px', 
                  fontWeight: 700, 
                  color: isCorrect ? '#007A65' : '#551DB8' 
                }}
              >
                {feedback}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
