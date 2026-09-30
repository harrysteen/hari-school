'use client';

import React, { useState } from 'react';

type StageKey = 'early' | 'primary' | 'junior' | 'prep';

interface StageData {
  badge: string;
  title: string;
  desc: string;
  subjects: Array<{ name: string; metric: string }>;
  sampleTitle: string;
  steps: Array<{ num: number; title: string; text: string }>;
}

const curriculumData: Record<StageKey, StageData> = {
  early: {
    badge: "Ages 4–5 · Stage 1",
    title: "Foundations of Curiosity & Language",
    desc: "Focusing on phonemic awareness, spatial reasoning, emotional literacy, and curiosity-led science through guided group inquiry.",
    subjects: [
      { name: "Emergent Literacy & Storycraft", metric: "4x Weekly" },
      { name: "Number Sense & Visual Math", metric: "4x Weekly" },
      { name: "Natural World Explorations", metric: "2x Weekly" },
      { name: "Socio-Emotional Collaborative Play", metric: "Daily" }
    ],
    sampleTitle: "Unit 1.3: Patterns in the Forest & Numbers",
    steps: [
      { num: 1, title: "Live Socratic Kickoff (15 min):", text: "Identifying Fibonacci spiral patterns in pinecones with the cohort." },
      { num: 2, title: "Collaborative Problem Solving (30 min):", text: "Interactive pattern matching on the virtual canvas with peers." },
      { num: 3, title: "Individual Mastery Check (15 min):", text: "Real-time feedback from the master teacher." },
      { num: 4, title: "Hands-on Physical Project (30 min):", text: "Offline leaf collection and pattern sketchbook drawing." }
    ]
  },
  primary: {
    badge: "Ages 6–8 · Stage 2",
    title: "Core Mathematical Logic & Global Humanities",
    desc: "Deepening mathematical problem solving, cross-cultural history, introductory computational models, and scientific method experimentation.",
    subjects: [
      { name: "Socratic Math & Geometry", metric: "5x Weekly" },
      { name: "Global Humanities & Literature", metric: "4x Weekly" },
      { name: "Computational Thinking & Logic", metric: "3x Weekly" },
      { name: "Earth & Biological Systems", metric: "2x Weekly" }
    ],
    sampleTitle: "Unit 2.4: Ocean Currents & Ancient Navigation",
    steps: [
      { num: 1, title: "Live Socratic Kickoff (15 min):", text: "How Polynesians used wave swells and stellar paths to cross oceans." },
      { num: 2, title: "Hydrodynamic Simulation (30 min):", text: "Cohort experiment on fluid dynamics and thermal convection." },
      { num: 3, title: "Mathematical Triangulation (15 min):", text: "Plotting bearing vectors on interactive spherical maps." },
      { num: 4, title: "Tangible Build (30 min):", text: "Building a floating compass using a magnetized needle and cork." }
    ]
  },
  junior: {
    badge: "Ages 9–10 · Stage 3",
    title: "Scientific Synthesis, Debate & Systems Design",
    desc: "Cultivating analytical writing, algorithmic architecture, planetary science, and structured philosophical debate.",
    subjects: [
      { name: "Advanced Algebraic Foundations", metric: "5x Weekly" },
      { name: "Persuasive Writing & Socratic Debate", metric: "4x Weekly" },
      { name: "Systems Engineering & Robotics", metric: "3x Weekly" },
      { name: "Comparative World Civilizations", metric: "3x Weekly" }
    ],
    sampleTitle: "Unit 3.2: Designing Sustainable Micro-Grids",
    steps: [
      { num: 1, title: "Live Debate (15 min):", text: "Solar vs. Wind vs. Geothermal trade-offs for island communities." },
      { num: 2, title: "Algorithmic Load Balancing (30 min):", text: "Coding energy storage distribution rules in Python/Blocks." },
      { num: 3, title: "Peer Code & Logic Review (15 min):", text: "Stress testing cohort models under simulated cloud cover." },
      { num: 4, title: "Offline Circuit Prototype (30 min):", text: "Wiring a mini solar cell capacitor kit delivered to the child." }
    ]
  },
  prep: {
    badge: "Ages 11–12 · Stage 4",
    title: "Middle Prep & High-Agency Research",
    desc: "Preparing for elite secondary institutions through thesis research, calculus previews, rhetoric, and autonomous capstones.",
    subjects: [
      { name: "Pre-Calculus & Applied Statistics", metric: "5x Weekly" },
      { name: "Classical Rhetoric & Critical Theory", metric: "4x Weekly" },
      { name: "Applied Bio-Engineering & Ethics", metric: "3x Weekly" },
      { name: "Independent Global Capstone Project", metric: "Weekly Mentorship" }
    ],
    sampleTitle: "Unit 4.1: Genetic Sequences & Statistical Modeling",
    steps: [
      { num: 1, title: "Socratic Symposium (20 min):", text: "The ethics of CRISPR gene therapy in agriculture and medicine." },
      { num: 2, title: "Statistical Modeling (25 min):", text: "Analyzing Mendelian inheritance probabilities with real data." },
      { num: 3, title: "Peer Defense (20 min):", text: "Presenting findings and answering counter-arguments from the cohort." },
      { num: 4, title: "Synthesis Thesis (25 min):", text: "Drafting a 500-word position paper for the Bina Student Journal." }
    ]
  }
};

export default function CurriculumMatrix() {
  const [activeStage, setActiveStage] = useState<StageKey>('early');
  const stage = curriculumData[activeStage];

  return (
    <section className="section-curriculum" id="curriculum">
      <div className="container">
        <div className="section-header">
          <span className="badge-tag" style={{ marginBottom: '12px' }}>Accredited Program</span>
          <h2 className="section-title">An internationally accredited, multi-disciplinary pathway.</h2>
          <p className="lead">
            Select a learning stage to explore the core subjects, learning objectives, and sample synchronous modules.
          </p>
        </div>

        <div className="tab-nav" role="tablist">
          <button 
            type="button"
            className={`tab-btn ${activeStage === 'early' ? 'active' : ''}`}
            onClick={() => setActiveStage('early')}
            role="tab"
            aria-selected={activeStage === 'early'}
          >
            Early Years (Ages 4–5)
          </button>
          <button 
            type="button"
            className={`tab-btn ${activeStage === 'primary' ? 'active' : ''}`}
            onClick={() => setActiveStage('primary')}
            role="tab"
            aria-selected={activeStage === 'primary'}
          >
            Primary Foundations (Ages 6–8)
          </button>
          <button 
            type="button"
            className={`tab-btn ${activeStage === 'junior' ? 'active' : ''}`}
            onClick={() => setActiveStage('junior')}
            role="tab"
            aria-selected={activeStage === 'junior'}
          >
            Junior Mastery (Ages 9–10)
          </button>
          <button 
            type="button"
            className={`tab-btn ${activeStage === 'prep' ? 'active' : ''}`}
            onClick={() => setActiveStage('prep')}
            role="tab"
            aria-selected={activeStage === 'prep'}
          >
            Middle Prep (Ages 11–12)
          </button>
        </div>

        <div className="curriculum-content">
          <div className="curriculum-details">
            <span className="stage-badge">{stage.badge}</span>
            <h3>{stage.title}</h3>
            <p>{stage.desc}</p>

            <div className="subject-grid">
              {stage.subjects.map((sub, idx) => (
                <div className="subject-item" key={idx}>
                  <span className="subject-title">{sub.name}</span>
                  <span className="subject-metric">{sub.metric}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="sample-lesson-box">
            <span className="lesson-tag">Sample Synchronous Unit</span>
            <h4>{stage.sampleTitle}</h4>
            <p className="text-meta">90 Minutes Total Duration · Live Cohort</p>

            <ul className="lesson-steps-list">
              {stage.steps.map(step => (
                <li className="lesson-step" key={step.num}>
                  <span className="step-num">{step.num}</span>
                  <div>
                    <strong>{step.title}</strong> {step.text}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
