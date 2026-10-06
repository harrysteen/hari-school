'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ClassScheduleItem {
  id: string;
  time: string;
  subject: string;
  topic: string;
  instructor: string;
  gradeGroup: string;
  platform: 'Google Meet' | 'Zoom';
  meetLink: string;
  status: 'live' | 'upcoming' | 'completed';
}

const DASARA_SCHEDULE: ClassScheduleItem[] = [
  {
    id: 'dc-1',
    time: '09:00 AM – 10:15 AM',
    subject: '🔬 Science Experiments & Concepts',
    topic: 'Hands-on Optics & Chemical Reactions at Home',
    instructor: 'Dr. R. Sharma (Senior Science Faculty)',
    gradeGroup: 'Classes 6 to 10',
    platform: 'Google Meet',
    meetLink: 'https://meet.google.com/new',
    status: 'live'
  },
  {
    id: 'dc-2',
    time: '10:30 AM – 11:45 AM',
    subject: '🧮 Vedic & Speed Mathematics',
    topic: 'Mental Math Tricks, Faster Calculations & Olympiad Prep',
    instructor: 'Mr. K. V. Rao (Mathematics HOD)',
    gradeGroup: 'Classes 3 to 10',
    platform: 'Zoom',
    meetLink: 'https://zoom.us/join',
    status: 'upcoming'
  },
  {
    id: 'dc-3',
    time: '04:00 PM – 05:00 PM',
    subject: '💻 Digital Skills & AI Basics',
    topic: 'Block Coding, Logic Building & Creative Presentation Design',
    instructor: 'Ms. S. Lakshmi (IT & E-Techno Lead)',
    gradeGroup: 'Classes 4 to 9',
    platform: 'Google Meet',
    meetLink: 'https://meet.google.com/new',
    status: 'upcoming'
  },
  {
    id: 'dc-4',
    time: '05:15 PM – 06:15 PM',
    subject: '🗣️ Spoken English & Storytelling',
    topic: 'Public Speaking, Vocabulary Building & Festive Narratives',
    instructor: 'Mrs. Ananya Roy (English & Communication Mentor)',
    gradeGroup: 'Classes 1 to 8',
    platform: 'Zoom',
    meetLink: 'https://zoom.us/join',
    status: 'upcoming'
  }
];

const WORKSHEETS = [
  { day: 'Day 1', title: 'Speed Math & Multiplication Shortcuts', size: '1.2 MB' },
  { day: 'Day 2', title: 'Fun Physics Home Experiment Guide', size: '2.4 MB' },
  { day: 'Day 3', title: 'English Idioms & Daily Vocabulary Booster', size: '980 KB' },
  { day: 'Day 4', title: 'Grand Exam 2026 Model Test Series - 1', size: '3.1 MB' },
  { day: 'Day 5', title: 'Scratch Coding & Algorithm Worksheets', size: '1.8 MB' }
];

export default function DasaraCampPage() {
  const [studentRoll, setStudentRoll] = useState('');
  const [studentGrade, setStudentGrade] = useState('Class 7');
  const [studentName, setStudentName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedDay, setSelectedDay] = useState('Day 1');
  const [activeTab, setActiveTab] = useState<'schedule' | 'worksheets' | 'doubtDesk'>('schedule');
  const [doubtText, setDoubtText] = useState('');
  const [doubtSent, setDoubtSent] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentRoll.trim()) {
      alert('Please enter your Student Roll Number / Admission Number');
      return;
    }
    setIsLoggedIn(true);
  };

  const handleSendDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doubtText.trim()) return;
    const whatsappUrl = `https://wa.me/917799114947?text=${encodeURIComponent(
      `*Dasara Special Class Doubt Submission*\nStudent: ${studentName || studentRoll}\nClass: ${studentGrade}\n\n*Question/Doubt:* ${doubtText}`
    )}`;
    window.open(whatsappUrl, '_blank');
    setDoubtSent(true);
    setDoubtText('');
  };

  return (
    <div style={{ backgroundColor: '#FBF9F4', minHeight: '100vh', color: '#1F1813' }}>
      {/* Header */}
      <header className="site-nav">
        <div className="container nav-wrapper">
          <Link href="/" className="logo-link">
            <Image src="/images/school-logo.png" alt="Hari E-Techno School emblem" width={52} height={52} className="logo-emblem" priority />
            <div className="logo-text">
              <Image src="/images/school-name.png" alt="Hari Educational Institutions" width={1600} height={110} className="logo-name" priority />
              <span className="logo-sub-text">RAJANAGARAM • AP</span>
            </div>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link href="/" className="btn-pill btn-white" style={{ fontSize: '13.5px', padding: '8px 16px' }}>
              ← Back<span className="hide-on-phone"> to Main Site</span>
            </Link>
            {isLoggedIn && (
              <button 
                type="button" 
                onClick={() => setIsLoggedIn(false)}
                className="btn-pill btn-outline-dark"
                style={{ fontSize: '12.5px', padding: '6px 14px' }}
              >
                Sign Out ({studentRoll})
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero / Festive Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #FF6F43 0%, #FF4D24 50%, #C91E0B 100%)',
        color: '#FFFFFF',
        padding: 'clamp(32px, 5vw, 60px) 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Festive Background Circles & Sparkles */}
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '220px', height: '220px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '10%', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(8px)',
            padding: '6px 16px',
            borderRadius: '9999px',
            fontSize: '13px',
            fontWeight: 700,
            marginBottom: '16px'
          }}>
            🪔 Dasara Holidays Special Edition 2026
          </div>

          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(28px, 4vw, 46px)',
            fontWeight: 900,
            lineHeight: 1.15,
            marginBottom: '12px',
            color: '#FFFFFF'
          }}>
            Live Online Classes &amp; Skill Workshops
          </h1>

          <p style={{
            fontSize: 'clamp(14px, 1.2vw, 17px)',
            maxWidth: '680px',
            margin: '0 auto',
            color: 'rgba(255,255,255,0.92)',
            lineHeight: 1.45
          }}>
            Connect daily via <strong>Google Meet &amp; Zoom</strong> for interactive problem solving, Vedic Math, fun science labs, and Grand Exam preparation.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container" style={{ padding: '40px 24px 80px 24px' }}>
        {!isLoggedIn ? (
          /* Student Verification Access Card */
          <div style={{
            maxWidth: '480px',
            margin: '0 auto',
            background: '#FFFFFF',
            borderRadius: '28px',
            padding: 'clamp(24px, 4vw, 40px)',
            boxShadow: '0 16px 40px rgba(35, 27, 21, 0.08)',
            border: '1.5px solid rgba(255, 94, 58, 0.15)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: '#FFEDE9',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              margin: '0 auto 16px auto'
            }}>
              🎓
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px', color: '#1F1813' }}>
              Student Portal Access
            </h2>
            <p style={{ fontSize: '13.5px', color: 'var(--color-secondary-text)', marginBottom: '24px' }}>
              Enter your Roll Number / Admission Number to access your live classroom links and daily holiday materials.
            </p>

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-dark)', display: 'block', marginBottom: '6px' }}>
                  Student Roll / Admission No. *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. HET-2026-042 or 104"
                  value={studentRoll}
                  onChange={(e) => setStudentRoll(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '14px',
                    border: '1.5px solid rgba(0,0,0,0.12)',
                    fontSize: '14px',
                    fontFamily: 'var(--font-sans)',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-dark)', display: 'block', marginBottom: '6px' }}>
                  Student Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. K. Sai Varun"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '14px',
                    border: '1.5px solid rgba(0,0,0,0.12)',
                    fontSize: '14px',
                    fontFamily: 'var(--font-sans)',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-dark)', display: 'block', marginBottom: '6px' }}>
                  Select Grade / Class *
                </label>
                <select
                  value={studentGrade}
                  onChange={(e) => setStudentGrade(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '14px',
                    border: '1.5px solid rgba(0,0,0,0.12)',
                    fontSize: '14px',
                    fontFamily: 'var(--font-sans)',
                    outline: 'none',
                    backgroundColor: '#FFFFFF',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="Pre-Primary & Nursery">Pre-Primary &amp; Nursery</option>
                  <option value="Class 1">Class 1</option>
                  <option value="Class 2">Class 2</option>
                  <option value="Class 3">Class 3</option>
                  <option value="Class 4">Class 4</option>
                  <option value="Class 5">Class 5</option>
                  <option value="Class 6">Class 6</option>
                  <option value="Class 7">Class 7</option>
                  <option value="Class 8">Class 8</option>
                  <option value="Class 9">Class 9</option>
                  <option value="Class 10 (Grand Exam Special)">Class 10 (Grand Exam Special)</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn-pill btn-coral-gradient"
                style={{ width: '100%', padding: '14px', fontSize: '15px', marginTop: '8px' }}
              >
                Enter Dasara Live Portal ↗
              </button>
            </form>

            <div style={{ marginTop: '20px', fontSize: '12.5px', color: 'var(--color-secondary-text)' }}>
              Need help joining? Call Coordinator: <a href="tel:07799114947" style={{ color: '#FF5E3A', fontWeight: 700 }}>077991 14947</a>
            </div>
          </div>
        ) : (
          /* Student Live Dashboard */
          <div>
            {/* Student Welcome Card */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '24px 32px',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid rgba(0,0,0,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '32px',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#38C757', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  ● Verified Student Active
                </span>
                <h2 style={{ fontSize: '24px', fontWeight: 800, marginTop: '2px', color: '#1F1813' }}>
                  Welcome, {studentName || 'Student'} ({studentRoll})
                </h2>
                <p style={{ fontSize: '13.5px', color: 'var(--color-secondary-text)' }}>
                  Enrolled Grade: <strong>{studentGrade}</strong> · HARI E-TECHNO Special Holiday Camp
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setActiveTab('schedule')}
                  className={`btn-pill ${activeTab === 'schedule' ? 'btn-coral-gradient' : 'btn-white'}`}
                  style={{ fontSize: '13.5px', padding: '8px 18px' }}
                >
                  📅 Today&apos;s Live Classes
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('worksheets')}
                  className={`btn-pill ${activeTab === 'worksheets' ? 'btn-coral-gradient' : 'btn-white'}`}
                  style={{ fontSize: '13.5px', padding: '8px 18px' }}
                >
                  📥 Holiday Worksheets
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('doubtDesk')}
                  className={`btn-pill ${activeTab === 'doubtDesk' ? 'btn-coral-gradient' : 'btn-white'}`}
                  style={{ fontSize: '13.5px', padding: '8px 18px' }}
                >
                  ❓ Doubt Desk
                </button>
              </div>
            </div>

            {/* TAB 1: Live Class Schedule & Join Buttons */}
            {activeTab === 'schedule' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                  <h3 style={{ fontSize: '22px', fontWeight: 800 }}>
                    Today&apos;s Live Sessions &amp; Video Rooms
                  </h3>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setSelectedDay(d)}
                        style={{
                          background: selectedDay === d ? '#FF5E3A' : '#FFFFFF',
                          color: selectedDay === d ? '#FFFFFF' : '#1F1813',
                          border: '1px solid rgba(0,0,0,0.08)',
                          borderRadius: '12px',
                          padding: '6px 14px',
                          fontSize: '12.5px',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                  {DASARA_SCHEDULE.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        background: '#FFFFFF',
                        borderRadius: '24px',
                        padding: '24px',
                        boxShadow: 'var(--shadow-sm)',
                        border: item.status === 'live' ? '2px solid #FF5E3A' : '1px solid rgba(0,0,0,0.06)',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                    >
                      {item.status === 'live' && (
                        <div style={{
                          position: 'absolute',
                          top: '16px',
                          right: '16px',
                          background: '#FF3B30',
                          color: '#FFFFFF',
                          padding: '4px 10px',
                          borderRadius: '9999px',
                          fontSize: '11px',
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <span style={{ width: '6px', height: '6px', background: '#FFFFFF', borderRadius: '50%' }}></span>
                          LIVE NOW
                        </div>
                      )}

                      <div>
                        <span style={{
                          fontSize: '12px',
                          fontWeight: 700,
                          color: '#FF5E3A',
                          background: '#FFEDE9',
                          padding: '4px 10px',
                          borderRadius: '8px',
                          display: 'inline-block',
                          marginBottom: '10px'
                        }}>
                          ⏰ {item.time}
                        </span>

                        <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#1F1813', marginBottom: '6px' }}>
                          {item.subject}
                        </h4>

                        <p style={{ fontSize: '13.5px', color: 'var(--color-secondary-text)', lineHeight: 1.4, marginBottom: '14px' }}>
                          <strong>Topic:</strong> {item.topic}
                        </p>

                        <div style={{ fontSize: '12.5px', color: '#60574D', marginBottom: '8px' }}>
                          👨‍🏫 <strong>Instructor:</strong> {item.instructor}
                        </div>
                        <div style={{ fontSize: '12px', color: '#8C8275', marginBottom: '20px' }}>
                          🎯 <strong>Target:</strong> {item.gradeGroup} · Platform: <strong>{item.platform}</strong>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                        <a
                          href={item.meetLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-pill btn-coral-gradient"
                          style={{
                            flex: 1,
                            fontSize: '13.5px',
                            padding: '10px 16px',
                            textAlign: 'center',
                            textDecoration: 'none'
                          }}
                        >
                          {item.platform === 'Google Meet' ? '🎥 Join Google Meet' : '📹 Join Zoom Room'}
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(item.meetLink);
                            alert('Meeting Link copied to clipboard!');
                          }}
                          className="btn-pill btn-white"
                          title="Copy Link"
                          style={{ padding: '10px 14px', fontSize: '13px' }}
                        >
                          📋
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: Holiday Worksheets */}
            {activeTab === 'worksheets' && (
              <div style={{
                background: '#FFFFFF',
                borderRadius: '28px',
                padding: '32px',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid rgba(0,0,0,0.06)'
              }}>
                <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '8px' }}>
                  📥 Dasara Holiday Practice Sheets &amp; Assignments
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--color-secondary-text)', marginBottom: '24px' }}>
                  Download daily PDFs, solve questions during holidays, and submit solutions on the Doubt Desk.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {WORKSHEETS.map((ws, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px 20px',
                        background: '#FAF8F4',
                        borderRadius: '16px',
                        border: '1px solid rgba(0,0,0,0.04)',
                        flexWrap: 'wrap',
                        gap: '12px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <span style={{
                          background: '#FF5E3A',
                          color: '#FFFFFF',
                          padding: '4px 10px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 800
                        }}>
                          {ws.day}
                        </span>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '15px', color: '#1F1813' }}>
                            {ws.title}
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--color-secondary-text)' }}>
                            File Size: {ws.size} · PDF Format
                          </div>
                        </div>
                      </div>

                      <a
                        href={`https://harietechnoschool.com/spe.html`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-pill btn-white"
                        style={{ fontSize: '13px', padding: '8px 18px', border: '1px solid #1F1813' }}
                      >
                        📄 Download Worksheet ↗
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: Doubt Desk / Teacher Assistance */}
            {activeTab === 'doubtDesk' && (
              <div style={{
                maxWidth: '640px',
                margin: '0 auto',
                background: '#FFFFFF',
                borderRadius: '28px',
                padding: '36px',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid rgba(0,0,0,0.06)'
              }}>
                <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '8px' }}>
                  ❓ 24/7 Dasara Holiday Doubt Desk
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--color-secondary-text)', marginBottom: '24px' }}>
                  Have a question from today&apos;s session or worksheet? Type your question below and connect directly with our faculty on WhatsApp.
                </p>

                {doubtSent && (
                  <div style={{ background: '#E7F7EA', color: '#1B5E39', padding: '12px 16px', borderRadius: '12px', marginBottom: '20px', fontSize: '14px', fontWeight: 600 }}>
                    ✓ Question forwarded to Faculty WhatsApp Desk!
                  </div>
                )}

                <form onSubmit={handleSendDoubt}>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                      Describe Your Question or Math Problem:
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="e.g. In today's Vedic Math class, how do we multiply 98 x 97 using base 100 method?"
                      value={doubtText}
                      onChange={(e) => setDoubtText(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '14px',
                        border: '1.5px solid rgba(0,0,0,0.12)',
                        fontSize: '14px',
                        fontFamily: 'var(--font-sans)',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-pill btn-coral-gradient"
                    style={{ width: '100%', padding: '12px', fontSize: '14.5px' }}
                  >
                    💬 Submit to Teacher on WhatsApp ↗
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
