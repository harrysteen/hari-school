import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import { CLASS_GROUPS } from '@/data/classes';

export const metadata: Metadata = {
  title: 'Student Corner — HARI E-TECHNO SCHOOL, Rajanagaram',
  description: 'Class-wise student information for Pre-Primary, Primary School, Middle School and Intermediate College at HARI E-TECHNO SCHOOL, Rajanagaram.',
};

export default function StudentsPage() {
  return (
    <div style={{ backgroundColor: '#FBF9F4', minHeight: '100vh', color: '#1F1813' }}>
      <PageHeader />

      <section className="gallery-page-hero">
        <div className="container">
          <span className="badge-tag" style={{ background: '#FFEDE9', color: '#FF5E3A', border: 'none' }}>
            🎓 Student Corner
          </span>
          <h1 className="gallery-page-title">
            Our <span className="text-coral">Students</span>
          </h1>
          <p className="gallery-page-subtitle">
            Class pages and student dashboards are private. Students log in with their admission number; class teachers with their teacher ID.
          </p>
          <Link href="/login" className="btn-pill btn-coral-gradient" style={{ marginTop: '18px' }}>
            🔒 Student / Teacher Login
          </Link>
        </div>
      </section>

      <section className="container" style={{ paddingBottom: 'clamp(48px, 8vw, 96px)' }}>
        <div className="students-groups">
          {CLASS_GROUPS.map((group) => (
            <div key={group.id} id={group.id} className="students-group-card">
              <div className="students-group-head">
                <span className="students-group-emoji" aria-hidden="true">{group.emoji}</span>
                <div>
                  <h2 className="students-group-name">{group.name}</h2>
                  <div className="students-group-tagline">{group.tagline}</div>
                </div>
              </div>
              <div className="students-class-links">
                {group.classes.map((c) => (
                  <Link key={c.id} href={`/students/${c.id}`} className="students-class-chip">
                    {c.navLabel} <span aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
