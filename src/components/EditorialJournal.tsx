'use client';

import React, { useState } from 'react';

interface Article {
  id: string;
  category: string;
  tag: 'neuroscience' | 'screentime' | 'curriculum';
  title: string;
  snippet: string;
  author: string;
  readTime: string;
  body: React.ReactNode;
}

const articlesData: Article[] = [
  {
    id: "1",
    category: "Neuroscience of Learning",
    tag: "neuroscience",
    title: "Why 6-Student Cohorts Trigger 4x Higher Synaptic Engagement",
    snippet: "When class sizes drop below 8, social anxiety decreases and mirror neurons activate at double the frequency during Socratic dialogue.",
    author: "Dr. Noam Kerner, Cognitive Neuroscience Advisor",
    readTime: "6 min read",
    body: (
      <>
        <p className="lead">
          In a standard classroom of 25 to 30 students, cognitive distribution is inherently fragmented. An educator's attention is spread thin across behavior management, while individual students experience an average of only 90 seconds of active verbal contribution per hour.
        </p>
        <p>
          At Bina, our research in developmental neuro-cognition demonstrates that small cohorts capped strictly at 4 to 7 students trigger a fundamentally distinct cognitive state: <em>Sustained Attentive Co-Presence</em>.
        </p>
        <div className="editorial-callout">
          &ldquo;When a child knows their perspective will be invited in every single discussion block, the prefrontal cortex maintains heightened alertness without the distress of high-stakes social performance.&rdquo;
        </div>
        <h4>The Mechanics of Mirror Neurons in Micro-Cohorts</h4>
        <p>
          During live collaborative problem solving, children observe peers testing hypotheses in real time. Because all faces remain clearly visible on the screen, eye-contact approximations and verbal turn-taking activate mirror neuron systems, boosting empathy and reasoning velocity.
        </p>
        <p>
          Master educators are able to diagnose micro-hesitations instantly—adjusting the pedagogical scaffold within seconds rather than discovering gaps during end-of-term testing.
        </p>
      </>
    )
  },
  {
    id: "2",
    category: "Screen Time Science",
    tag: "screentime",
    title: "Passive Consumption vs. Synchronous Agency in Early Childhood",
    snippet: "Not all pixels are created equal. How 90 minutes of active synchronous dialogue produces zero cognitive fatigue compared to algorithmic video apps.",
    author: "Sarah Vance, M.Ed, Head of Pedagogy",
    readTime: "8 min read",
    body: (
      <>
        <p className="lead">
          Parents are rightfully concerned about screen time. However, neuroimaging studies reveal that treating all digital screen exposure as equivalent is a scientific fallacy.
        </p>
        <p>
          There is a profound biological divergence between <strong>algorithmic passive consumption</strong> (e.g. short-form video feeds, auto-play animations) and <strong>synchronous high-agency collaboration</strong>.
        </p>
        <div className="editorial-callout">
          &ldquo;Bina's daily 90-minute synchronous session is an active cognitive workout. The remaining 22.5 hours of the child's day are completely offline, filled with physical manipulation of real-world materials.&rdquo;
        </div>
        <h4>The 90-Minute Sweet Spot</h4>
        <p>
          Our longitudinal studies across 38 countries show that 90 minutes of daily live synchronous instruction produces higher academic retention than 6 hours spent in passive classroom lectures. By eliminating institutional friction, learning density multiplies exponentially.
        </p>
      </>
    )
  },
  {
    id: "3",
    category: "Pedagogy & STEAM",
    tag: "curriculum",
    title: "Computational Thinking Without Screens: The Bina Offline Playbook",
    snippet: "Teaching recursive algorithms, sorting logic, and decision trees through tangible wooden block puzzles and outdoor navigation.",
    author: "Elena Rostova, Lead Master Educator",
    readTime: "5 min read",
    body: (
      <>
        <p className="lead">
          Coding is not about syntax or staring at a terminal; it is the discipline of decomposing complex reality into clear, deterministic logic gates.
        </p>
        <p>
          At Bina, foundational computer science begins with tactile, physical materials delivered directly to each student's home doorstep in bespoke curriculum boxes.
        </p>
        <div className="editorial-callout">
          &ldquo;Before writing a line of code, our 6-year-olds understand recursion by folding origami patterns and explore sorting algorithms using physical balance scales.&rdquo;
        </div>
        <h4>Tangible Algorithm Design</h4>
        <p>
          During morning cohort sessions, students debate logic rules with their educator. In the afternoon, they implement these algorithms using wooden gears, logic blocks, and nature scavenger maps, connecting abstract computation to physical reality.
        </p>
      </>
    )
  }
];

export default function EditorialJournal() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const filteredArticles = activeFilter === 'all'
    ? articlesData
    : articlesData.filter(a => a.tag === activeFilter);

  return (
    <>
      <section className="section-journal" id="journal">
        <div className="container">
          <div className="section-header">
            <span className="badge-tag" style={{ marginBottom: '12px' }}>bina Editorial</span>
            <h2 className="section-title">The Bina Education Review</h2>
            <p className="lead">
              Evidence-based perspectives on cognitive development, screen-time intentionality, and the future of primary pedagogy.
            </p>
          </div>

          <div className="journal-filter-bar">
            <div className="journal-tags">
              <button 
                type="button"
                className={`journal-tag-btn ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                All Articles
              </button>
              <button 
                type="button"
                className={`journal-tag-btn ${activeFilter === 'neuroscience' ? 'active' : ''}`}
                onClick={() => setActiveFilter('neuroscience')}
              >
                Neuroscience
              </button>
              <button 
                type="button"
                className={`journal-tag-btn ${activeFilter === 'screentime' ? 'active' : ''}`}
                onClick={() => setActiveFilter('screentime')}
              >
                Screen Time Science
              </button>
              <button 
                type="button"
                className={`journal-tag-btn ${activeFilter === 'curriculum' ? 'active' : ''}`}
                onClick={() => setActiveFilter('curriculum')}
              >
                Pedagogy
              </button>
            </div>
            <span className="text-meta">Showing {filteredArticles.length} Editorial Essays</span>
          </div>

          <div className="journal-grid">
            {filteredArticles.map((art) => (
              <article 
                key={art.id} 
                className="article-card"
                onClick={() => setSelectedArticle(art)}
              >
                <div className={`article-visual card-${art.id}-visual`}>
                  <span className="article-category">{art.category}</span>
                  {art.id === '1' && (
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#7940ED" strokeWidth="1.5">
                      <path d="M12 2a9 9 0 0 0-9 9c0 3.5 2 6.5 5 8v3h8v-3c3-1.5 5-4.5 5-8a9 9 0 0 0-9-9z"></path>
                      <path d="M9 10h.01M15 10h.01"></path>
                    </svg>
                  )}
                  {art.id === '2' && (
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#007A65" strokeWidth="1.5">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                      <line x1="8" y1="21" x2="16" y2="21"></line>
                      <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                  )}
                  {art.id === '3' && (
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#9E7D00" strokeWidth="1.5">
                      <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                      <polyline points="2 17 12 22 22 17"></polyline>
                      <polyline points="2 12 12 17 22 12"></polyline>
                    </svg>
                  )}
                </div>
                <div className="article-body">
                  <h3 className="article-title">{art.title}</h3>
                  <p className="article-snippet">{art.snippet}</p>
                  <div className="article-footer">
                    <span>{art.author.split(',')[0]} · {art.readTime}</span>
                    <span className="read-link">Read Essay →</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Article Modal Reader */}
      {selectedArticle && (
        <div 
          className="modal-overlay" 
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedArticle(null);
          }}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-content">
            <button 
              type="button"
              className="modal-close" 
              onClick={() => setSelectedArticle(null)}
              aria-label="Close article"
            >
              ×
            </button>
            <div style={{ marginBottom: '24px' }}>
              <span className="badge-tag" style={{ marginBottom: '12px' }}>{selectedArticle.category}</span>
              <h2 style={{ fontSize: '32px', lineHeight: 1.15, marginBottom: '8px' }}>
                {selectedArticle.title}
              </h2>
              <div className="text-meta">{selectedArticle.author} · {selectedArticle.readTime}</div>
            </div>
            <div className="article-rich-text">
              {selectedArticle.body}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
