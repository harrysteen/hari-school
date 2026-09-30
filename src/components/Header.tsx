'use client';

import React, { useState, useEffect } from 'react';

interface HeaderProps {
  onOpenAssessment: () => void;
}

export default function Header({ onOpenAssessment }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolled);

      const sectionIds = ['education', 'curriculum', 'schedule', 'calculator', 'journal'];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - 150;
          if (winScroll >= top) {
            setActiveSection(id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div 
        className="header-reading-bar" 
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true" 
      />

      <header className={`site-header ${mobileMenuOpen ? 'mobile-menu-active' : ''}`} id="mainHeader">
        <div className="container header-inner">
          <a href="#hero" className="brand-logo" aria-label="bina School homepage">
            bina<span className="dot"></span>
          </a>

          <nav aria-label="Primary Navigation">
            <ul className="nav-desktop">
              <li>
                <a 
                  href="#education" 
                  className={`nav-link ${activeSection === 'education' ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Education
                </a>
              </li>
              <li>
                <a 
                  href="#curriculum" 
                  className={`nav-link ${activeSection === 'curriculum' ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Curriculum
                </a>
              </li>
              <li>
                <a 
                  href="#schedule" 
                  className={`nav-link ${activeSection === 'schedule' ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Daily Routine
                </a>
              </li>
              <li>
                <a 
                  href="#calculator" 
                  className={`nav-link ${activeSection === 'calculator' ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Cohorts & Tuition
                </a>
              </li>
              <li>
                <a 
                  href="#journal" 
                  className={`nav-link ${activeSection === 'journal' ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Editorial Journal
                </a>
              </li>
            </ul>
          </nav>

          <div className="header-actions">
            <button 
              type="button" 
              className="btn btn-secondary btn-sm"
              onClick={onOpenAssessment}
            >
              Experience Demo
            </button>
            <button 
              type="button" 
              className="btn btn-primary btn-sm"
              onClick={onOpenAssessment}
            >
              Apply for Cohort
            </button>
            <button 
              type="button"
              className="menu-toggle" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
