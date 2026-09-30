'use client';

import React, { useState } from 'react';

interface TuitionCalculatorProps {
  onOpenAssessment: () => void;
}

type TrackType = 'full' | 'hybrid' | 'steam';
type BillingType = 'annual' | 'term';

const pricingMap: Record<TrackType, { monthly: number; annualMonthly: number }> = {
  full: { monthly: 750, annualMonthly: 640 },
  hybrid: { monthly: 480, annualMonthly: 410 },
  steam: { monthly: 390, annualMonthly: 330 }
};

const timezoneTimings: Record<string, string> = {
  EU: "Monday – Friday, 09:30 AM – 11:00 AM CET",
  US_EST: "Monday – Friday, 09:00 AM – 10:30 AM EST",
  US_PST: "Monday – Friday, 09:00 AM – 10:30 AM PST",
  APAC: "Monday – Friday, 04:30 PM – 06:00 PM SGT"
};

export default function TuitionCalculator({ onOpenAssessment }: TuitionCalculatorProps) {
  const [ageGroup, setAgeGroup] = useState('6-8');
  const [track, setTrack] = useState<TrackType>('full');
  const [timezone, setTimezone] = useState('EU');
  const [billing, setBilling] = useState<BillingType>('annual');

  const price = billing === 'annual' ? pricingMap[track].annualMonthly : pricingMap[track].monthly;
  const timing = timezoneTimings[timezone] || timezoneTimings['EU'];

  return (
    <section className="section-calculator" id="calculator">
      <div className="container">
        <div className="section-header">
          <span className="badge-tag" style={{ marginBottom: '12px' }}>Cohort Finder & Tuition</span>
          <h2 className="section-title">Transparent, all-inclusive global schooling.</h2>
          <p className="lead">
            Customize your child's age group and learning model to view cohort availability, schedule times, and tuition.
          </p>
        </div>

        <div className="calculator-box">
          <div className="calc-inputs">
            <div className="form-group">
              <label className="form-label" htmlFor="calcAgeSelect">Child's Current Age</label>
              <select 
                id="calcAgeSelect" 
                className="calc-select"
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value)}
              >
                <option value="4-5">4–5 Years Old (Early Stage 1)</option>
                <option value="6-8">6–8 Years Old (Primary Stage 2)</option>
                <option value="9-10">9–10 Years Old (Junior Stage 3)</option>
                <option value="11-12">11–12 Years Old (Middle Prep)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Enrollment Track</label>
              <div className="choice-pills">
                <button 
                  type="button"
                  className={`choice-btn ${track === 'full' ? 'selected' : ''}`}
                  onClick={() => setTrack('full')}
                >
                  Full-Time Primary
                </button>
                <button 
                  type="button"
                  className={`choice-btn ${track === 'hybrid' ? 'selected' : ''}`}
                  onClick={() => setTrack('hybrid')}
                >
                  Supplementary Core (Math + Lit)
                </button>
                <button 
                  type="button"
                  className={`choice-btn ${track === 'steam' ? 'selected' : ''}`}
                  onClick={() => setTrack('steam')}
                >
                  STEAM Immersion
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="calcTimezoneSelect">Preferred Time Zone Cohort</label>
              <select 
                id="calcTimezoneSelect" 
                className="calc-select"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
              >
                <option value="EU">European Cohorts (UTC+0 to UTC+2)</option>
                <option value="US_EST">Americas East (UTC-5)</option>
                <option value="US_PST">Americas West (UTC-8)</option>
                <option value="APAC">Asia-Pacific (UTC+8 to UTC+10)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Billing Cycle</label>
              <div className="choice-pills">
                <button 
                  type="button"
                  className={`choice-btn ${billing === 'annual' ? 'selected' : ''}`}
                  onClick={() => setBilling('annual')}
                >
                  Annual (Save 15%)
                </button>
                <button 
                  type="button"
                  className={`choice-btn ${billing === 'term' ? 'selected' : ''}`}
                  onClick={() => setBilling('term')}
                >
                  Term-by-Term
                </button>
              </div>
            </div>
          </div>

          <div className="calc-summary-card">
            <div>
              <span className="badge-tag" style={{ background: '#FFFFFF' }}>Cohort Availability: 3 Seats Remaining</span>
              <div className="calc-price-display">
                <span className="price-val">€{price}</span>
                <span className="price-sub">
                  {billing === 'annual' ? '/ month (billed annually)' : '/ month (billed per term)'}
                </span>
              </div>

              <p className="text-sm" style={{ marginBottom: '16px', fontWeight: 500 }}>
                Timing: {timing}
              </p>

              <ul className="cohort-perks-list">
                <li>1:6 Dedicated Master Educator Cohort</li>
                <li>All Physical STEM & Art Material Kits Included</li>
                <li>Bi-weekly 1-on-1 Parent Cognitive Growth Review</li>
                <li>Accredited Dual International Transcripts</li>
              </ul>
            </div>

            <button 
              type="button" 
              className="btn btn-primary"
              onClick={onOpenAssessment}
              style={{ width: '100%' }}
            >
              Reserve Seat for Next Term
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
