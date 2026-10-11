'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ClassSlot {
  startHour: number; // 24h, IST
  endHour: number;
  platform: 'Google Meet' | 'Zoom';
  meetLink: string;
}

// One live hour per class. Keys must match the <option> values of the class dropdown.
// Fixed daily Meet rooms owned by kumarraj6304467271@gmail.com (Google Calendar recurring events).
const CLASS_SCHEDULE: Record<string, ClassSlot> = {
  'Class 1': { startHour: 8, endHour: 9, platform: 'Google Meet', meetLink: 'https://meet.google.com/pdu-afxb-ndc' },
  'Class 2': { startHour: 9, endHour: 10, platform: 'Google Meet', meetLink: 'https://meet.google.com/fbm-kmvf-ywr' },
  'Class 3': { startHour: 10, endHour: 11, platform: 'Google Meet', meetLink: 'https://meet.google.com/zog-fwhw-dwn' },
  'Class 4': { startHour: 11, endHour: 12, platform: 'Google Meet', meetLink: 'https://meet.google.com/mqb-remi-qrd' },
  'Class 5': { startHour: 12, endHour: 13, platform: 'Google Meet', meetLink: 'https://meet.google.com/whs-xvho-xdh' },
  'Class 6': { startHour: 13, endHour: 14, platform: 'Google Meet', meetLink: 'https://meet.google.com/aor-hxyc-biw' },
  'Class 7': { startHour: 14, endHour: 15, platform: 'Google Meet', meetLink: 'https://meet.google.com/sba-ztes-isr' },
  'Class 8': { startHour: 15, endHour: 16, platform: 'Google Meet', meetLink: 'https://meet.google.com/rip-zcge-iyj' },
};

// "How to join" help video on the login card. Either a YouTube embed URL
// (https://www.youtube.com/embed/<id>) or a file in /public, e.g. '/videos/how-to-join.mp4'.
// Leave empty to hide the video section.
const HOW_TO_JOIN_VIDEO: string = '';

const formatHour = (h: number) => `${((h + 11) % 12) + 1}:00 ${h < 12 ? 'AM' : 'PM'}`;

// Current time of day in India as fractional hours, regardless of the viewer's device timezone
const istHourNow = () => {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  return get('hour') + get('minute') / 60 + get('second') / 3600;
};

const slotStatus = (slot: ClassSlot, now: number): 'live' | 'upcoming' | 'completed' =>
  now >= slot.endHour ? 'completed' : now >= slot.startHour ? 'live' : 'upcoming';

// Seconds until the next start (today, or tomorrow once today's class is over), or until the end while live
const countdownSeconds = (slot: ClassSlot, now: number) => {
  const status = slotStatus(slot, now);
  const target = status === 'live' ? slot.endHour : status === 'upcoming' ? slot.startHour : slot.startHour + 24;
  return Math.max(0, Math.round((target - now) * 3600));
};

const formatCountdown = (total: number) => {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${h}h ${pad(m)}m ${pad(s)}s`;
};

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
  const [activeTab, setActiveTab] = useState<'schedule' | 'worksheets' | 'doubtDesk'>('schedule');
  const [doubtText, setDoubtText] = useState('');
  const [doubtSent, setDoubtSent] = useState(false);
  const [nowHour, setNowHour] = useState(istHourNow);

  // Tick every second to drive the countdown and flip the card to LIVE / Ended on time
  useEffect(() => {
    const id = setInterval(() => setNowHour(istHourNow()), 1000);
    return () => clearInterval(id);
  }, []);

  const mySlot = CLASS_SCHEDULE[studentGrade];
  const myStatus = mySlot ? slotStatus(mySlot, nowHour) : null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentRoll || !studentName.trim()) {
      alert('Please enter your Roll Number and your name');
      return;
    }
    // Record the entry in the class-wise tracking sheet; never block the student on it
    fetch('/api/dasara-attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roll: studentRoll, name: studentName.trim(), grade: studentGrade }),
      keepalive: true,
    }).catch(() => {});
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

          <div className="nav-side-actions">
            <Link href="/" className="btn-pill btn-white nav-back-btn">
              ← Back<span className="hide-on-phone"> to Main Site</span>
            </Link>
            {isLoggedIn && (
              <button 
                type="button" 
                onClick={() => setIsLoggedIn(false)}
                className="btn-pill btn-outline-dark"
                style={{ fontSize: '12.5px', padding: '6px 14px' }}
              >
                Sign Out<span className="hide-on-phone"> ({studentRoll})</span>
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
              Enter your Roll Number and name to access your live classroom links and daily holiday materials.
            </p>

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-dark)', display: 'block', marginBottom: '6px' }}>
                  Student Roll Number *
                </label>
                <input
                  type="text"
                  required
                  inputMode="numeric"
                  pattern="[0-9]+"
                  maxLength={10}
                  title="Numbers only"
                  placeholder="e.g. 104"
                  value={studentRoll}
                  onChange={(e) => setStudentRoll(e.target.value.replace(/[^0-9]/g, ''))}
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
                  Student Name *
                </label>
                <input
                  type="text"
                  required
                  pattern="[A-Za-z. ]+"
                  maxLength={60}
                  title="Letters only"
                  placeholder="e.g. K. Sai Varun"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value.replace(/[^A-Za-z. ]/g, ''))}
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
              {' '}or <a href="tel:6304467271" style={{ color: '#FF5E3A', fontWeight: 700 }}>63044 67271</a>
            </div>

            {HOW_TO_JOIN_VIDEO && (
              <div style={{ marginTop: '24px', textAlign: 'left' }}>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#1F1813', marginBottom: '8px' }}>
                  🎬 How to join your class (watch first)
                </div>
                {HOW_TO_JOIN_VIDEO.includes('youtube.com/embed/') ? (
                  <iframe
                    src={HOW_TO_JOIN_VIDEO}
                    title="How to join your Dasara live class"
                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ width: '100%', aspectRatio: '16 / 9', border: 0, borderRadius: '16px' }}
                  />
                ) : (
                  <video
                    src={HOW_TO_JOIN_VIDEO}
                    controls
                    playsInline
                    preload="metadata"
                    style={{ width: '100%', borderRadius: '16px', background: '#000' }}
                  />
                )}
              </div>
            )}
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
                <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '20px' }}>
                  Your Live Class · {studentGrade}
                </h3>

                {mySlot && myStatus ? (
                  <div
                    style={{
                      maxWidth: '520px',
                      background: '#FFFFFF',
                      borderRadius: '24px',
                      padding: '24px',
                      boxShadow: 'var(--shadow-sm)',
                      border: myStatus === 'live' ? '2px solid #FF5E3A' : '1px solid rgba(0,0,0,0.06)',
                      position: 'relative'
                    }}
                  >
                    {myStatus === 'live' && (
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
                      ⏰ {formatHour(mySlot.startHour)} – {formatHour(mySlot.endHour)}
                    </span>

                    <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#1F1813', marginBottom: '6px' }}>
                      {studentGrade} Dasara Live Session
                    </h4>

                    <p style={{ fontSize: '13.5px', color: 'var(--color-secondary-text)', lineHeight: 1.4, marginBottom: '20px' }}>
                      {myStatus === 'live' && 'Your class is running now. Join right away!'}
                      {myStatus !== 'live' && `Your class starts at ${formatHour(mySlot.startHour)}. Please join 5 minutes early.`}
                      {' '}Platform: <strong>{mySlot.platform}</strong>
                    </p>

                    <div style={{
                      background: myStatus === 'live' ? '#FFEDE9' : '#FAF8F4',
                      borderRadius: '16px',
                      padding: '14px 16px',
                      marginBottom: '20px',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-secondary-text)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {myStatus === 'live' ? 'Class ends in' : 'Your class starts in'}
                      </div>
                      <div style={{ fontSize: '28px', fontWeight: 900, color: '#FF5E3A', fontVariantNumeric: 'tabular-nums', marginTop: '2px' }}>
                        {formatCountdown(countdownSeconds(mySlot, nowHour))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      <a
                        href={mySlot.meetLink}
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
                        {mySlot.platform === 'Google Meet' ? '🎥 Join Google Meet' : '📹 Join Zoom Room'}
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(mySlot.meetLink);
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
                ) : (
                  <div style={{
                    maxWidth: '520px',
                    background: '#FFFFFF',
                    borderRadius: '24px',
                    padding: '24px',
                    boxShadow: 'var(--shadow-sm)',
                    border: '1px solid rgba(0,0,0,0.06)',
                    fontSize: '14px',
                    color: 'var(--color-secondary-text)',
                    lineHeight: 1.5
                  }}>
                    The live class timing for <strong>{studentGrade}</strong> has not been announced yet.
                    Please call the coordinator at <a href="tel:07799114947" style={{ color: '#FF5E3A', fontWeight: 700 }}>077991 14947</a>
                    {' '}or <a href="tel:6304467271" style={{ color: '#FF5E3A', fontWeight: 700 }}>63044 67271</a>.
                  </div>
                )}
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
