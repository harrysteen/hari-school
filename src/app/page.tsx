'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HERO_PHOTOS as HERO_GALLERY } from '@/data/gallery';
import { CLASS_GROUPS } from '@/data/classes';

export default function HariETechnoSchool() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSubject, setModalSubject] = useState('Admission Enquiry 2026–27');
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileStudentsOpen, setMobileStudentsOpen] = useState(false);
  const [mobileOpenGroup, setMobileOpenGroup] = useState<string | null>(null);

  const openEnquiry = (subjectTitle?: string) => {
    if (subjectTitle) setModalSubject(subjectTitle);
    setSubmitted(false);
    setModalOpen(true);
  };

  return (
    <div style={{ position: 'relative', overflowX: 'hidden' }}>
      {/* 1. Header Navigation */}
      <header className="site-nav">
        <div className="container nav-wrapper">
          <Link href="/" className="logo-link">
            <Image src="/images/school-logo.png" alt="Hari E-Techno School emblem" width={52} height={52} className="logo-emblem" priority />
            <div className="logo-text">
              <Image src="/images/school-name.png" alt="Hari Educational Institutions" width={1600} height={110} className="logo-name" priority />
              <span className="logo-sub-text">
                RAJANAGARAM • AP
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <ul className="nav-menu">
              <li><Link href="/dasara-camp" style={{ color: '#FF5E3A', fontWeight: 800 }}>🪔 Dasara Live</Link></li>
              <li><Link href="#grand-exam">Grand Exam 2026</Link></li>
              <li><Link href="#academics">Academics</Link></li>
              <li className="nav-dropdown">
                <Link href="/students" aria-haspopup="true">
                  Student Corner <span className="nav-caret" aria-hidden="true">▾</span>
                </Link>
                <ul className="nav-dropdown-menu">
                  <li className="nav-dropdown-login">
                    <Link href="/login"><span>🔒 Student / Teacher Login</span></Link>
                  </li>
                  {CLASS_GROUPS.map((group) => (
                    <li key={group.id} className="nav-submenu">
                      <Link href={`/students#${group.id}`} aria-haspopup="true">
                        <span>{group.emoji} {group.name}</span>
                        <span className="nav-submenu-arrow" aria-hidden="true">›</span>
                      </Link>
                      <ul className="nav-submenu-list">
                        {group.classes.map((c) => (
                          <li key={c.id}><Link href={`/students/${c.id}`}>{c.navLabel}</Link></li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </li>
              <li><Link href="#facilities">Facilities</Link></li>
              <li><Link href="#admissions">Admissions</Link></li>
              <li><Link href="/gallery">Gallery</Link></li>
            </ul>
          </nav>

          {/* Header Action Buttons & Mobile Hamburger */}
          <div className="nav-actions">
            <button 
              type="button" 
              className="btn-pill btn-coral-gradient nav-enquire-btn"
              onClick={() => openEnquiry('Enquire Admissions')}
            >
              <span>Enquire Admissions</span>
              <span>↗</span>
            </button>
            
            {/* Mobile Hamburger Toggle Button */}
            <button 
              type="button" 
              className="mobile-nav-toggle"
              aria-label="Toggle navigation menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className={`hamburger-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-nav-drawer">
            <ul className="mobile-nav-list">
              <li><Link href="/dasara-camp" onClick={() => setMobileMenuOpen(false)} style={{ color: '#FF5E3A', fontWeight: 800 }}>🪔 Dasara Holidays Live Portal</Link></li>
              <li><Link href="#grand-exam" onClick={() => setMobileMenuOpen(false)}>🚀 Grand Exam 2026</Link></li>
              <li><Link href="#academics" onClick={() => setMobileMenuOpen(false)}>Academic Programmes</Link></li>
              <li>
                <button
                  type="button"
                  className="mobile-nav-toggle-row"
                  aria-expanded={mobileStudentsOpen}
                  onClick={() => setMobileStudentsOpen(!mobileStudentsOpen)}
                >
                  🎓 Student Corner <span aria-hidden="true">{mobileStudentsOpen ? '−' : '+'}</span>
                </button>
                {mobileStudentsOpen && (
                  <ul className="mobile-subnav">
                    <li><Link href="/login" onClick={() => setMobileMenuOpen(false)}>🔒 Student / Teacher Login</Link></li>
                    {CLASS_GROUPS.map((group) => (
                      <li key={group.id}>
                        <button
                          type="button"
                          className="mobile-nav-toggle-row mobile-nav-toggle-sub"
                          aria-expanded={mobileOpenGroup === group.id}
                          onClick={() => setMobileOpenGroup(mobileOpenGroup === group.id ? null : group.id)}
                        >
                          {group.emoji} {group.name} <span aria-hidden="true">{mobileOpenGroup === group.id ? '−' : '+'}</span>
                        </button>
                        {mobileOpenGroup === group.id && (
                          <div className="mobile-class-chips">
                            {group.classes.map((c) => (
                              <Link key={c.id} href={`/students/${c.id}`} onClick={() => setMobileMenuOpen(false)}>
                                {c.navLabel}
                              </Link>
                            ))}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li><Link href="#facilities" onClick={() => setMobileMenuOpen(false)}>Campus Facilities</Link></li>
              <li><Link href="#admissions" onClick={() => setMobileMenuOpen(false)}>Admissions 2026–27</Link></li>
              <li><Link href="/gallery" onClick={() => setMobileMenuOpen(false)}>📸 Photo Gallery</Link></li>
            </ul>
            <div className="mobile-nav-cta">
              <a 
                href="tel:07799114947" 
                className="btn-pill btn-white"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                📞 Call: 077991 14947
              </a>
              <button 
                type="button" 
                className="btn-pill btn-coral-gradient"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => { setMobileMenuOpen(false); openEnquiry('Enquire Admissions'); }}
              >
                Enquire Admissions ↗
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 2. Hero Section */}
      <section className="hero-section" id="about">
        {/* Floating 3D Hot Air Balloon Sticker */}
        <div className="floating-sticker sticker-balloon">
          <svg viewBox="0 0 70 90" width="64" height="82" fill="none" style={{ filter: 'drop-shadow(0 12px 20px rgba(255, 94, 58, 0.35))' }}>
            <defs>
              <linearGradient id="balloonRed" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6B4A"/>
                <stop offset="50%" stopColor="#FF3823"/>
                <stop offset="100%" stopColor="#C91E0B"/>
              </linearGradient>
              <linearGradient id="balloonYellow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF4D0"/>
                <stop offset="50%" stopColor="#FDD835"/>
                <stop offset="100%" stopColor="#F57F17"/>
              </linearGradient>
              <linearGradient id="basketWood" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#BCAAA4"/>
                <stop offset="100%" stopColor="#6D4C41"/>
              </linearGradient>
            </defs>
            {/* Balloon Body */}
            <path d="M35 5 C15 5 2 20 2 40 C2 58 20 70 30 75 L40 75 C50 70 68 58 68 40 C68 20 55 5 35 5 Z" fill="url(#balloonRed)"/>
            {/* Curved Yellow Stripe */}
            <path d="M22 6 C10 18 10 55 26 74 L32 74 C18 55 18 18 30 6 Z" fill="url(#balloonYellow)" opacity="0.9"/>
            <path d="M48 6 C60 18 60 55 44 74 L38 74 C52 55 52 18 40 6 Z" fill="url(#balloonYellow)" opacity="0.9"/>
            {/* Center White Highlight Stripe */}
            <path d="M32 5 C28 20 28 55 33 75 L37 75 C42 55 42 20 38 5 Z" fill="#FFFFFF" opacity="0.4"/>
            {/* Ropes */}
            <line x1="28" y1="75" x2="25" y2="82" stroke="#4E342E" strokeWidth="1.5"/>
            <line x1="42" y1="75" x2="45" y2="82" stroke="#4E342E" strokeWidth="1.5"/>
            <line x1="35" y1="75" x2="35" y2="82" stroke="#4E342E" strokeWidth="1.5"/>
            {/* Basket */}
            <rect x="23" y="82" width="24" height="12" rx="3" fill="url(#basketWood)"/>
            <line x1="23" y1="86" x2="47" y2="86" stroke="#4E342E" strokeWidth="1"/>
            <line x1="23" y1="90" x2="47" y2="90" stroke="#4E342E" strokeWidth="1"/>
          </svg>
        </div>

        {/* Floating 3D Tennis Ball Sticker */}
        <div className="floating-sticker sticker-tennis">
          <svg viewBox="0 0 60 60" width="54" height="54" fill="none" style={{ filter: 'drop-shadow(0 10px 18px rgba(197, 225, 61, 0.45))' }}>
            <defs>
              <radialGradient id="tennisBallGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#F4FF81"/>
                <stop offset="50%" stopColor="#CDDC39"/>
                <stop offset="85%" stopColor="#9E9D24"/>
                <stop offset="100%" stopColor="#827717"/>
              </radialGradient>
            </defs>
            {/* Sphere */}
            <circle cx="30" cy="30" r="26" fill="url(#tennisBallGrad)"/>
            {/* Curved White Rubber Seams with 3D Depth */}
            <path d="M12 14 C 24 24, 24 36, 12 46" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" opacity="0.95"/>
            <path d="M48 14 C 36 24, 36 36, 48 46" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" opacity="0.95"/>
            {/* Specular Highlight */}
            <ellipse cx="22" cy="18" rx="8" ry="4" fill="#FFFFFF" opacity="0.6" transform="rotate(-30 22 18)"/>
          </svg>
        </div>

        {/* Floating 3D Archery Target & Dart Sticker */}
        <div className="floating-sticker sticker-target">
          <svg viewBox="0 0 74 74" width="66" height="66" fill="none" style={{ filter: 'drop-shadow(0 12px 22px rgba(60, 205, 254, 0.4))' }}>
            <defs>
              <radialGradient id="targetCyan" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#67E8F9"/>
                <stop offset="100%" stopColor="#0891B2"/>
              </radialGradient>
              <radialGradient id="targetRed" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#FF6B4A"/>
                <stop offset="100%" stopColor="#DC2626"/>
              </radialGradient>
              <radialGradient id="targetGold" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#FDE047"/>
                <stop offset="100%" stopColor="#CA8A04"/>
              </radialGradient>
            </defs>
            {/* Outer Cyan Ring */}
            <circle cx="37" cy="40" r="30" fill="url(#targetCyan)"/>
            {/* White Ring */}
            <circle cx="37" cy="40" r="22" fill="#FFFFFF"/>
            {/* Red Ring */}
            <circle cx="37" cy="40" r="14" fill="url(#targetRed)"/>
            {/* Center Gold Bullseye */}
            <circle cx="37" cy="40" r="6" fill="url(#targetGold)"/>
            
            {/* Dart Hit */}
            <path d="M37 40 L65 12" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round"/>
            <polygon points="62,9 70,17 67,6" fill="#EF4444"/>
            <polygon points="58,13 66,21 55,16" fill="#3B82F6"/>
          </svg>
        </div>

        <div className="container">
          <div className="hero-center-content">
            <div className="hero-admissions-badge">
              <span style={{ width: '7px', height: '7px', background: '#FF5E3A', borderRadius: '50%' }}></span>
              Admissions Open 2026–27 · Rajanagaram, AP
            </div>

            <h1 className="hero-main-title">
              Shaping <em>Future-Ready</em><br />
              <strong>Global Learners</strong>
            </h1>

            <div className="hero-check-list">
              <div className="hero-check-item">
                <span className="check-icon-circle">✓</span>
                <span>20+ Expert Faculty</span>
              </div>
              <div className="hero-check-item">
                <span className="check-icon-circle">✓</span>
                <span>100% Digital Learning</span>
              </div>
              <div className="hero-check-item">
                <span className="check-icon-circle">✓</span>
                <span>Safe & Secure Campus</span>
              </div>
              <div className="hero-check-item">
                <span className="check-icon-circle">✓</span>
                <span>Techno Curriculum</span>
              </div>
            </div>

            <p className="hero-subtext">
              A premium digital school nurturing excellence, discipline, and values to prepare students for a dynamic world.
            </p>

            <div className="hero-cta-group">
              <button 
                type="button" 
                className="btn-pill btn-coral-gradient"
                onClick={() => openEnquiry('Hero Admission Enquiry')}
              >
                <span>Enquire Admissions</span>
                <span style={{ fontSize: '15px' }}>↗</span>
              </button>
              <a 
                href="tel:07799114947" 
                className="btn-pill btn-white"
                style={{ border: '1.5px solid #231B15' }}
              >
                <span>Call Now: 077991 14947</span>
              </a>
            </div>
          </div>
        </div>

        {/* Infinite-loop campus gallery: list is rendered twice and slides by one copy */}
        <div className="hero-gallery" aria-label="School life gallery">
          <div className="hero-gallery-track">
            {[...HERO_GALLERY, ...HERO_GALLERY].map((photo, i) => (
              <div
                key={i}
                className={`hero-gallery-item ${photo.shape}`}
                aria-hidden={i >= HERO_GALLERY.length}
              >
                <img src={photo.src} alt={i < HERO_GALLERY.length ? photo.alt : ''} loading={i < 4 ? 'eager' : 'lazy'} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Dark Stats Banner */}
      <section className="stats-banner-section">
        <div className="container">
          <div className="stats-dark-container">
            <div className="plane-sticker">
              <svg viewBox="0 0 54 40" fill="none">
                <polygon points="4,36 50,4 28,38 20,24" fill="#3CCDFE"/>
                <polygon points="20,24 50,4 28,38" fill="#1CA8DC"/>
              </svg>
            </div>

            {/* Stat 1 */}
            <div className="stats-item">
              <div className="stats-icon-box icon-box-coral">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div>
                <div className="stats-number">20+</div>
                <div className="stats-label">Expert Faculty & Dedicated Mentors</div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="stats-item">
              <div className="stats-icon-box icon-box-yellow">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
              <div>
                <div className="stats-number">100%</div>
                <div className="stats-label">Digital Integration & Smart Learning</div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="stats-item">
              <div className="stats-icon-box icon-box-green">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div>
                <div className="stats-number">Safe</div>
                <div className="stats-label">Secure CCTV Campus & Transport</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section: 🚀 GRAND EXAM 2026 & Digital Platform Portal with Real Student Photos */}
      <section className="fly-high-section" id="grand-exam">
        <div className="container">
          <div className="section-top-row">
            <div>
              <span className="badge-tag" style={{ background: '#FEF7DE', color: '#B7791F', border: 'none', marginBottom: '8px' }}>
                🚀 Official Exam Portal
              </span>
              <h2 className="fly-high-title">
                GRAND EXAM <em>2026</em>
              </h2>
            </div>
            <div className="section-top-right">
              <p className="section-subcopy">
                10th Students • <strong>April 30, 2026</strong> • Real Exam Pattern & Detailed Performance Analytics.
              </p>
              <a 
                href="https://harietechnoschool.com/spe.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-pill btn-coral-gradient"
              >
                <span>Start Practice</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          <div className="cards-trio-grid">
            {/* Card 1: 📘 Smart Practice */}
            <div className="trio-card card-orange">
              <div className="card-doodle-bg">
                <svg width="90" height="70" viewBox="0 0 100 80" fill="none" stroke="#FFFFFF" strokeWidth="3">
                  <path d="M20 50 Q10 20 40 20 Q55 5 75 20 Q95 20 85 50 Z"/>
                </svg>
              </div>
              <img 
                src="/images/smart_girl_books.jpg" 
                alt="Student balancing books on head" 
                className="card-real-img"
              />
              <div>
                <span style={{ background: 'rgba(255,255,255,0.25)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700 }}>
                  📘 Practice Module
                </span>
                <h3 className="trio-card-title" style={{ marginTop: '12px' }}>Smart Practice</h3>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.9)', marginTop: '8px', maxWidth: '170px' }}>
                  Practice daily questions & improve accuracy.
                </p>
              </div>

              <div style={{ position: 'relative', zIndex: 3, marginTop: '24px' }}>
                <a 
                  href="https://harietechnoschool.com/spe.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-pill btn-white"
                  style={{ fontSize: '13px', padding: '8px 18px' }}
                >
                  Start Practice ↗
                </a>
              </div>
            </div>

            {/* Card 2: 🎯 Grand Exam */}
            <div className="trio-card card-green">
              <div className="card-doodle-bg">
                <svg width="90" height="90" viewBox="0 0 100 100" fill="none" stroke="#F8C331" strokeWidth="4">
                  <path d="M20 80 Q10 20 50 20 Q90 20 80 80 Q50 90 20 80 Z"/>
                </svg>
              </div>
              <img 
                src="/images/smart_boy_skate.jpg" 
                alt="Happy energetic student" 
                className="card-real-img"
              />
              <div>
                <span style={{ background: 'rgba(255,255,255,0.25)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700 }}>
                  🎯 April 30, 2026
                </span>
                <h3 className="trio-card-title" style={{ marginTop: '12px' }}>Grand Exam</h3>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.9)', marginTop: '8px', maxWidth: '170px' }}>
                  Full syllabus mock examination on real board patterns.
                </p>
              </div>

              <div style={{ position: 'relative', zIndex: 3, marginTop: '24px' }}>
                <button 
                  type="button" 
                  onClick={() => openEnquiry('Grand Exam Registration')}
                  className="btn-pill btn-white"
                  style={{ fontSize: '13px', padding: '8px 18px' }}
                >
                  Register for Exam ↗
                </button>
              </div>
            </div>

            {/* Card 3: 📊 Results & Analysis */}
            <div className="trio-card card-blue">
              <div className="card-doodle-bg">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="#FFFFFF" strokeWidth="3">
                  <path d="M10 40 Q40 10 70 40 Q40 70 10 40 Z"/>
                </svg>
              </div>
              <img 
                src="/images/empower_girl.jpg" 
                alt="Confident girl student holding books" 
                className="card-real-img"
              />
              <div>
                <span style={{ background: 'rgba(255,255,255,0.25)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700 }}>
                  📊 Analytics
                </span>
                <h3 className="trio-card-title" style={{ marginTop: '12px' }}>Exam Results</h3>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.9)', marginTop: '8px', maxWidth: '170px' }}>
                  View scores, accuracy, and detailed analysis.
                </p>
              </div>

              <div style={{ position: 'relative', zIndex: 3, marginTop: '24px' }}>
                <a 
                  href="https://harietechnoschool.com/hari.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-pill btn-white"
                  style={{ fontSize: '13px', padding: '8px 18px' }}
                >
                  View Results ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Section: Academic Programmes with Real Student Avatars */}
      <section className="shaping-future-section" id="academics">
        <div className="container">
          <span className="eyebrow-pill">Future-Focused Holistic Pedagogy</span>
          <h2 className="shaping-title">
            Our Academic <span className="text-coral">Programmes</span>
          </h2>

          <div className="programs-4-grid">
            {/* 1. Pre-Primary & Foundational */}
            <div className="program-item" onClick={() => openEnquiry('Pre-Primary School Admission')}>
              <div className="program-avatar-container">
                <div className="backdrop-cyan-blob">
                  <img 
                    src="/images/student_preschool.jpg" 
                    alt="Preschool student" 
                    className="program-real-img"
                  />
                </div>
              </div>
              <div className="program-name">Pre-Primary</div>
              <div className="program-class-tag">UKG · Joyful Foundational Learning</div>
            </div>

            {/* 2. Primary School */}
            <div className="program-item" onClick={() => openEnquiry('Primary School Admission')}>
              <div className="program-avatar-container">
                <div className="backdrop-orange-arch">
                  <img 
                    src="/images/student_grade1.jpg" 
                    alt="Primary school student with globe" 
                    className="program-real-img"
                  />
                </div>
              </div>
              <div className="program-name">Primary School</div>
              <div className="program-class-tag">Class 1 to 5 · Core Mastery</div>
            </div>

            {/* 3. Middle School */}
            <div className="program-item" onClick={() => openEnquiry('Middle School Admission')}>
              <div className="program-avatar-container">
                <div className="backdrop-green-oval">
                  <img 
                    src="/images/student_grade4.jpg" 
                    alt="Middle school student reading book" 
                    className="program-real-img"
                  />
                </div>
              </div>
              <div className="program-name">Middle School</div>
              <div className="program-class-tag">Class 6 to 8 · Analytical Skills</div>
            </div>

            {/* 4. Intermediate College */}
            <div className="program-item" onClick={() => openEnquiry('Intermediate College Admission')}>
              <div className="program-avatar-container">
                <div className="backdrop-yellow-arch">
                  <img
                    src="/images/student_intermediate.jpg"
                    alt="Intermediate college students in uniform blazers"
                    className="program-real-img"
                  />
                </div>
              </div>
              <div className="program-name">Intermediate College</div>
              <div className="program-class-tag">Class 11 & 12 · Junior College</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Section: Vision, Mission & Values */}
      <section className="duet-banners-section" id="vision-values">
        <div className="container">
          <div className="duet-grid">
            {/* Banner 1: Our Vision & Mission with Real Student Photo */}
            <div className="banner-card-yellow">
              <div className="banner-text-content" style={{ maxWidth: '380px' }}>
                <span className="badge-tag" style={{ background: '#FFFFFF', marginBottom: '12px' }}>Our Purpose</span>
                <h3 className="banner-title" style={{ fontSize: '28px' }}>Our Vision & Mission</h3>
                <p className="banner-desc" style={{ marginBottom: '12px' }}>
                  <strong>Vision:</strong> To nurture confident learners with global competence.
                </p>
                <p className="banner-desc">
                  <strong>Mission:</strong> Deliver holistic education through innovation, technology integration, and unwavering discipline.
                </p>
                <button 
                  type="button" 
                  className="btn-pill btn-white"
                  onClick={() => openEnquiry('About Hari E-Techno')}
                >
                  <span>Discover More</span>
                  <span>↗</span>
                </button>
              </div>

              {/* Real Student with Books on Head */}
              <img 
                src="/images/boy_plaid_books.jpg" 
                alt="Student smiling with books" 
                className="banner-yellow-kid-img"
              />
            </div>

            {/* Banner 2: Our Core Values */}
            <div className="banner-card-coral">
              <div className="banner-text-content">
                <span className="badge-tag" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', border: 'none', marginBottom: '12px' }}>
                  Pillars of Character
                </span>
                <h3 className="banner-title" style={{ fontSize: '28px' }}>Our Core Values</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', marginBottom: '20px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>✨</span> <strong>Integrity & Honesty</strong>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>🤝</span> <strong>Mutual Respect</strong>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>🛡️</span> <strong>Personal Responsibility</strong>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>🏆</span> <strong>Pursuit of Excellence</strong>
                  </li>
                </ul>

                <button 
                  type="button" 
                  className="btn-pill btn-white"
                  onClick={() => openEnquiry('Admissions Guidance')}
                >
                  <span>Apply Today</span>
                  <span>↗</span>
                </button>
              </div>

              <div className="pinwheel-sticker">
                <svg viewBox="0 0 54 54" fill="none">
                  <polygon points="27,27 27,6 38,16" fill="#F1C40F"/>
                  <polygon points="27,27 48,27 38,38" fill="#E74C3C"/>
                  <polygon points="27,27 27,48 16,38" fill="#3498DB"/>
                  <polygon points="27,27 6,27 16,16" fill="#2ECC71"/>
                  <circle cx="27" cy="27" r="4" fill="#FFFFFF"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Section: World-Class Facilities with Real Student Photo */}
      <section className="empower-section" id="facilities">
        <div className="container">
          <div className="empower-grid">
            <div>
              <span className="badge-tag" style={{ background: '#FFEDE9', color: '#FF5E3A', border: 'none', marginBottom: '16px' }}>
                Campus Amenities
              </span>
              <h2 className="empower-title">
                World-Class <span className="serif-font" style={{ color: '#8B4513' }}>Facilities</span> For Modern Education
              </h2>
              <p className="empower-desc">
                Designed to provide an enriching, safe, and technologically advanced learning ecosystem for your child.
              </p>

              <div className="facilities-grid">
                <div className="facility-card">
                  <div className="facility-icon">🖥️</div>
                  <div className="facility-title">Smart Classrooms</div>
                  <div className="facility-desc">Interactive digital boards & audio-visual teaching</div>
                </div>

                <div className="facility-card">
                  <div className="facility-icon">🔬</div>
                  <div className="facility-title">Science & Labs</div>
                  <div className="facility-desc">Hands-on experiments & modern IT setup</div>
                </div>

                <div className="facility-card">
                  <div className="facility-icon">🚌</div>
                  <div className="facility-title">Transport Facility</div>
                  <div className="facility-desc">Safe GPS-enabled school bus connectivity</div>
                </div>

                <div className="facility-card">
                  <div className="facility-icon">📹</div>
                  <div className="facility-title">CCTV Security</div>
                  <div className="facility-desc">24/7 monitored, safe & protected campus</div>
                </div>
              </div>

              <div>
                <button 
                  type="button" 
                  className="btn-pill btn-coral-gradient"
                  onClick={() => openEnquiry('Book Campus Tour')}
                >
                  <span>Book a Campus Visit</span>
                  <span>↗</span>
                </button>
              </div>
            </div>

            {/* Right Visual: Real Student Photo in Blue Arch Backdrop */}
            <div className="empower-visual-wrapper">
              <div className="empower-arch-blue">
                <img 
                  src="/images/empower_girl.jpg" 
                  alt="Student girl holding science and math books" 
                  className="empower-kid-img"
                />
              </div>

              <div className="stat-pill-floating">
                <div className="mini-stat">
                  <span style={{ width: '22px', height: '22px', background: '#38C757', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>✓</span>
                  <div>
                    <div className="mini-stat-num">100%</div>
                    <div className="mini-stat-sub">Smart classrooms & digital learning</div>
                  </div>
                </div>

                <div className="mini-stat">
                  <span style={{ width: '22px', height: '22px', background: '#3CCDFE', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>★</span>
                  <div>
                    <div className="mini-stat-num">Safe</div>
                    <div className="mini-stat-sub">24/7 Protected CCTV environment</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Dedicated Section: From the Principal's Desk */}
      <section className="principal-desk-section" id="principal" style={{ padding: '80px 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div className="principal-desk-card">
            {/* Left: Professional Principal Photo in Arched Frame */}
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <div className="principal-photo-arch">
                <img
                  src="/images/hari_photo.jpg"
                  alt="Hari, Principal & Academic Director, HARI E-TECHNO SCHOOL"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 30%'
                  }}
                />
              </div>

              {/* Floating Leadership Badge */}
              <div style={{
                position: 'absolute',
                bottom: '-12px',
                background: '#231B15',
                color: '#FFFFFF',
                padding: '8px 18px',
                borderRadius: 'var(--radius-pill)',
                fontSize: '12px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                whiteSpace: 'nowrap'
              }}>
                <span style={{ width: '8px', height: '8px', background: '#38C757', borderRadius: '50%' }}></span>
                Principal & Academic Director
              </div>
            </div>

            {/* Right: Principal's Message & Quote */}
            <div>
              <span className="badge-tag" style={{ background: '#FFEDE9', color: '#FF5E3A', border: 'none', marginBottom: '16px' }}>
                Leadership Perspective
              </span>

              <h2 style={{ fontSize: '36px', marginBottom: '20px', lineHeight: 1.2 }}>
                From the <span className="text-coral">Principal&apos;s</span> Desk
              </h2>

              {/* Highlighted Quote Box */}
              <div style={{
                position: 'relative',
                padding: '24px 28px',
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                borderLeft: '5px solid #FF5E3A',
                boxShadow: '0 6px 20px rgba(0,0,0,0.04)',
                marginBottom: '24px'
              }}>
                <p style={{
                  fontSize: '21px',
                  fontStyle: 'italic',
                  fontFamily: 'var(--font-serif)',
                  color: '#1F1813',
                  lineHeight: 1.45,
                  margin: 0
                }}>
                  &ldquo;We believe education is not just about academics, but about shaping character, confidence, and curiosity in every child.&rdquo;
                </p>
              </div>

              <p style={{ fontSize: '15px', color: 'var(--color-secondary-text)', lineHeight: 1.6, marginBottom: '24px' }}>
                At <strong>HARI E-TECHNO SCHOOL</strong>, our daily mission is to empower students with technological fluency, scientific rigor, and deep-rooted moral values so they emerge as globally competent, responsible citizens.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '16px 20px' }}>
                <button
                  type="button"
                  className="btn-pill btn-coral-gradient"
                  onClick={() => openEnquiry('Connect with Principal Office')}
                >
                  Schedule an Interaction ↗
                </button>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-dark)' }}>
                  HARI E-TECHNO SCHOOL<br />
                  <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-secondary-text)' }}>
                    Rajanagaram, Andhra Pradesh
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Admissions Call to Action Banner */}
      <section className="upcoming-event-section" id="admissions">
        <div className="container">
          <div className="event-banner-box">
            {/* Green Side: Real Teacher & Student Learning Photo */}
            <div className="event-photo-side">
              <img 
                src="/images/teacher_student.jpg" 
                alt="Teacher and student learning on tablet in classroom" 
                className="event-parent-img"
              />
            </div>

            {/* Yellow Side: Admissions Open 2026–27 */}
            <div className="event-info-side">
              <span className="event-tag">Admissions Open 2026–27</span>
              <h3 className="event-title" style={{ fontSize: '32px', marginBottom: '12px' }}>
                Give your child a strong, future-ready foundation.
              </h3>
              <p className="event-desc" style={{ marginBottom: '24px' }}>
                📍 Rajanagaram, Jagannadhapuram, Andhra Pradesh<br />
                📞 <strong>077991 14947</strong>
              </p>
              
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button 
                  type="button" 
                  className="btn-pill btn-coral-gradient"
                  onClick={() => openEnquiry('Apply for Admission 2026–27')}
                >
                  Apply for Admission ↗
                </button>
                <a 
                  href="tel:07799114947" 
                  className="btn-pill btn-white"
                >
                  Call 077991 14947
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Footer */}
      <footer style={{ backgroundColor: '#231B15', color: '#FFFFFF', padding: '48px 0 32px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '36px', marginBottom: '40px' }}>
            <div>
              <Image src="/images/school-logo.png" alt="Hari E-Techno School emblem" width={72} height={72} style={{ marginBottom: '12px' }} />
              <div style={{ fontSize: '24px', fontWeight: 800, fontFamily: 'var(--font-serif)', marginBottom: '12px' }}>
                HARI <span style={{ color: '#FF5E3A' }}>E-TECHNO</span> SCHOOL
              </div>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, marginBottom: '16px' }}>
                A future-focused institution blending strong academics, digital integration, disciplined learning and value-based education.
              </p>
              <div style={{ fontSize: '13px', color: '#38C757', fontWeight: 700 }}>
                📍 Rajanagaram, Jagannadhapuram, Andhra Pradesh
              </div>
            </div>

            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '14px', color: '#F8C331' }}>
                Quick Links
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                <li><a href="#about" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>About Our School</a></li>
                <li><a href="#academics" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Academic Programmes</a></li>
                <li><a href="#facilities" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Campus Facilities</a></li>
                <li><a href="#admissions" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Admissions 2026–27</a></li>
              </ul>
            </div>

            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '14px', color: '#F8C331' }}>
                Exam & Practice Portal
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                <li><a href="https://harietechnoschool.com/spe.html" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>📘 Smart Practice (SPE)</a></li>
                <li><a href="https://harietechnoschool.com/hari.html" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>📊 Grand Exam Results</a></li>
                <li><a href="https://harietechnoschool.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>ℹ️ Official Portal (Learn More)</a></li>
              </ul>
            </div>

            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '14px', color: '#F8C331' }}>
                Contact & Admissions
              </div>
              <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div>📞 <strong>077991 14947</strong></div>
                <div>📍 Rajanagaram, Andhra Pradesh</div>
                <div style={{ marginTop: '8px' }}>
                  <button 
                    type="button" 
                    className="btn-pill btn-coral-gradient"
                    style={{ fontSize: '13px', padding: '8px 18px' }}
                    onClick={() => openEnquiry('Footer Quick Enquiry')}
                  >
                    Enquire Now ↗
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: 'rgba(255,255,255,0.5)', flexWrap: 'wrap', gap: '12px' }}>
            <div>© 2026 HARI E-TECHNO SCHOOL. All Rights Reserved.</div>
            <div>Rajanagaram • Jagannadhapuram • Andhra Pradesh</div>
          </div>
        </div>
      </footer>

      {/* 10. Interactive Admission Enquiry Modal */}
      {modalOpen && (
        <div 
          className="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-content" style={{ maxWidth: '540px' }}>
            <button 
              type="button"
              className="modal-close" 
              onClick={() => setModalOpen(false)}
              aria-label="Close"
            >
              ×
            </button>

            {!submitted ? (
              <>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <span className="badge-tag" style={{ background: '#FFEDE9', color: '#FF5E3A', border: 'none', marginBottom: '8px' }}>
                    {modalSubject}
                  </span>
                  <h3 style={{ fontSize: '28px', color: '#1F1813' }}>HARI E-TECHNO SCHOOL</h3>
                  <p className="text-sm" style={{ color: 'var(--color-secondary-text)', marginTop: '4px' }}>
                    Admissions Open for Academic Year 2026–27 · Rajanagaram, AP
                  </p>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                      Parent / Guardian Name *
                    </label>
                    <input 
                      type="text" 
                      className="calc-input" 
                      placeholder="e.g. Ramesh Varma" 
                      required 
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                      Mobile Phone Number *
                    </label>
                    <input 
                      type="tel" 
                      className="calc-input" 
                      placeholder="e.g. 077991 14947" 
                      required 
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                      Grade / Class Applying For *
                    </label>
                    <select className="calc-select" style={{ width: '100%' }}>
                      <option>Pre-Primary (UKG)</option>
                      <option>Primary School (Class 1 to 5)</option>
                      <option>Middle School (Class 6 to 8)</option>
                      <option>Intermediate College (Class 11 & 12)</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                      Location / Residence Area
                    </label>
                    <input 
                      type="text" 
                      className="calc-input" 
                      placeholder="e.g. Rajanagaram / Jagannadhapuram" 
                      style={{ width: '100%' }}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn-pill btn-coral-gradient" 
                    style={{ width: '100%', padding: '14px' }}
                  >
                    Submit Admission Enquiry ↗
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: '#38C757',
                  color: '#FFFFFF',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto',
                  fontSize: '32px',
                  fontWeight: 900
                }}>
                  ✓
                </div>
                <h3 style={{ fontSize: '24px', color: '#1F1813', marginBottom: '8px' }}>
                  Enquiry Submitted Successfully!
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--color-secondary-text)', marginBottom: '24px' }}>
                  Thank you for your interest in <strong>HARI E-TECHNO SCHOOL</strong>. Our admissions counselor will contact you shortly at your registered number.
                </p>
                <div style={{ marginBottom: '20px', background: '#F8F9FA', padding: '12px', borderRadius: '12px', fontSize: '13px' }}>
                  📞 For immediate assistance, call <strong>077991 14947</strong>
                </div>
                <button 
                  type="button" 
                  className="btn-pill btn-coral-gradient" 
                  onClick={() => setModalOpen(false)}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
