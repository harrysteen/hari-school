'use client';

import React, { useState } from 'react';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AssessmentModal({ isOpen, onClose }: AssessmentModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [formData, setFormData] = useState({
    parentName: '',
    parentEmail: '',
    childInfo: '',
    focusArea: 'Deep Mathematical Thinking & Problem Solving',
    schoolingModel: 'Homeschooling / Worldschooling Family',
    date: '2026-10-15',
    time: '10:00 AM – 10:30 AM'
  });

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
    }, 300);
  };

  return (
    <div 
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-content">
        <button 
          type="button"
          className="modal-close" 
          onClick={handleClose}
          aria-label="Close assessment wizard"
        >
          ×
        </button>
        
        {step < 4 && (
          <div className="wizard-progress">
            <div className={`prog-bar ${step >= 1 ? 'filled' : ''}`} />
            <div className={`prog-bar ${step >= 2 ? 'filled' : ''}`} />
            <div className={`prog-bar ${step >= 3 ? 'filled' : ''}`} />
          </div>
        )}

        {/* Step 1 */}
        {step === 1 && (
          <div>
            <h3>Schedule a 1-on-1 Cognitive Assessment</h3>
            <p className="text-sm text-muted" style={{ marginTop: '4px', marginBottom: '20px' }}>
              Step 1 of 3: Tell us about your child to find the right developmental cohort.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label">Parent / Guardian Full Name</label>
                <input 
                  type="text" 
                  className="calc-input" 
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  placeholder="e.g. Alex Morgan" 
                  required 
                />
              </div>
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label">Email Address</label>
                <input 
                  type="email" 
                  className="calc-input" 
                  value={formData.parentEmail}
                  onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                  placeholder="alex@example.com" 
                  required 
                />
              </div>
              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label className="form-label">Child&apos;s Name & Date of Birth</label>
                <input 
                  type="text" 
                  className="calc-input" 
                  value={formData.childInfo}
                  onChange={(e) => setFormData({ ...formData, childInfo: e.target.value })}
                  placeholder="Maya · March 2020" 
                  required 
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Continue to Learning Profile →
              </button>
            </form>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div>
            <h3>Learning Profile & Interests</h3>
            <p className="text-sm text-muted" style={{ marginTop: '4px', marginBottom: '20px' }}>
              Step 2 of 3: How does your child best engage with ideas?
            </p>

            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Primary Academic Focus Area</label>
              <select 
                className="calc-select"
                value={formData.focusArea}
                onChange={(e) => setFormData({ ...formData, focusArea: e.target.value })}
              >
                <option>Deep Mathematical Thinking & Problem Solving</option>
                <option>Literacy, Creative Writing & Socratic Debate</option>
                <option>STEAM & Hands-on Science Exploration</option>
                <option>Holistic Dual-Language Foundations</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label className="form-label">Current Schooling Model</label>
              <select 
                className="calc-select"
                value={formData.schoolingModel}
                onChange={(e) => setFormData({ ...formData, schoolingModel: e.target.value })}
              >
                <option>Homeschooling / Worldschooling Family</option>
                <option>Traditional Brick-and-Mortar School</option>
                <option>Montessori / Waldorf Environment</option>
                <option>Looking for Complete Full-Time Schooling</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => setStep(1)} 
                style={{ flex: 1 }}
              >
                Back
              </button>
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={() => setStep(3)} 
                style={{ flex: 2 }}
              >
                Select Date & Time →
              </button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div>
            <h3>Confirm Assessment Slot</h3>
            <p className="text-sm text-muted" style={{ marginTop: '4px', marginBottom: '20px' }}>
              Step 3 of 3: Select a 30-minute introductory session with a Bina Master Educator.
            </p>

            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Select Date</label>
              <input 
                type="date" 
                className="calc-input" 
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label className="form-label">Select Time (Your Timezone)</label>
              <select 
                className="calc-select"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              >
                <option>10:00 AM – 10:30 AM</option>
                <option>02:00 PM – 02:30 PM</option>
                <option>04:30 PM – 05:00 PM</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => setStep(2)} 
                style={{ flex: 1 }}
              >
                Back
              </button>
              <button 
                type="button" 
                className="btn btn-accent-purple" 
                onClick={() => setStep(4)} 
                style={{ flex: 2 }}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: 'var(--color-3)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              fontSize: '28px',
              fontWeight: 900
            }}>
              ✓
            </div>
            <h3>Assessment Booked!</h3>
            <p className="text-sm text-muted" style={{ marginTop: '8px', marginBottom: '24px' }}>
              A confirmation email for {formData.parentEmail || 'your email'} and preparatory orientation materials have been sent.
            </p>
            <button 
              type="button" 
              className="btn btn-primary" 
              onClick={handleClose}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
