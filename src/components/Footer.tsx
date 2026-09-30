'use client';

import React, { useState } from 'react';

interface FooterProps {
  onOpenAssessment: () => void;
}

export default function Footer({ onOpenAssessment }: FooterProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#hero" className="brand-logo" style={{ color: '#FFFFFF', marginBottom: '12px' }}>
              bina<span className="dot"></span>
            </a>
            <p className="footer-desc">
              Precision education for children aged 4–12. Micro-cohorts, master educators, globally accredited curriculum.
            </p>
            <div className="token-badge-list">
              <span className="token-chip" style={{ backgroundColor: 'var(--color-1)', border: '1px solid #fff' }} title="color-1 #000000" />
              <span className="token-chip" style={{ backgroundColor: 'var(--color-2)' }} title="color-2 #B38CFF" />
              <span className="token-chip" style={{ backgroundColor: 'var(--color-3)' }} title="color-3 #06E1BD" />
              <span className="token-chip" style={{ backgroundColor: 'var(--color-4)' }} title="color-4 #67DEBF" />
              <span className="token-chip" style={{ backgroundColor: 'var(--color-5)' }} title="color-5 #F7D928" />
              <span style={{ fontSize: '11px', marginLeft: '6px', color: 'rgba(255,255,255,0.6)' }}>
                Design Tokens Aligned
              </span>
            </div>
          </div>

          <div>
            <div className="footer-title">Education</div>
            <ul className="footer-links">
              <li><a href="#curriculum">Early Years (4–5)</a></li>
              <li><a href="#curriculum">Primary Stage (6–8)</a></li>
              <li><a href="#curriculum">Junior Mastery (9–10)</a></li>
              <li><a href="#curriculum">Middle Prep (11–12)</a></li>
              <li><a href="#schedule">Daily Flow</a></li>
            </ul>
          </div>

          <div>
            <div className="footer-title">Admissions</div>
            <ul className="footer-links">
              <li><a href="#calculator">Tuition & Cohorts</a></li>
              <li>
                <button 
                  type="button" 
                  onClick={onOpenAssessment}
                  style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', font: 'inherit', padding: 0, textAlign: 'left' }}
                >
                  Placement Assessment
                </button>
              </li>
              <li><a href="#journal">Editorial Journal</a></li>
              <li><a href="#">Accreditation Info</a></li>
              <li><a href="#">Parent FAQ</a></li>
            </ul>
          </div>

          <div>
            <div className="footer-title">The Bina Dispatch</div>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginBottom: '12px' }}>
              Weekly evidence-based essays on early childhood cognition and high-agency learning.
            </p>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <div className="newsletter-input-group">
                <input 
                  type="email" 
                  className="newsletter-input" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email" 
                  required 
                />
                <button type="submit" className="btn btn-accent-mint btn-sm">
                  Subscribe
                </button>
              </div>
              {submitted && (
                <span className="text-meta" style={{ color: 'var(--color-3)' }}>
                  ✓ Thank you! You have been subscribed to The Bina Dispatch.
                </span>
              )}
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© 2026 bina precision schooling. All rights reserved.</div>
          <div>
            <span>Privacy Policy</span> · <span>Terms of Service</span> · <span>Global Accreditation</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
