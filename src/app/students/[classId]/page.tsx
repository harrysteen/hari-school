import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import NoAccess from '@/components/NoAccess';
import { ALL_CLASSES, findClass } from '@/data/classes';
import { canViewClass, getSession } from '@/lib/auth';
import { getRoster } from '@/lib/roster';
import { photoVersion } from '@/lib/student-photos';

type Props = { params: Promise<{ classId: string }> };

const rupees = (n: number) => `₹${n.toLocaleString('en-IN')}`;

// Rendered per request: the page depends on who is logged in
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const schoolClass = findClass((await params).classId);
  if (!schoolClass) return {};
  return { title: `${schoolClass.label} — ${schoolClass.group.name} | HARI E-TECHNO SCHOOL`, robots: { index: false } };
}

export default async function ClassPage({ params }: Props) {
  const { classId } = await params;
  const schoolClass = findClass(classId);
  if (!schoolClass) notFound();

  // Class lists contain children's names: teachers of this class and admins only
  const session = await getSession();
  if (!session) redirect(`/login?next=/students/${classId}`);
  if (!canViewClass(session, classId)) return <NoAccess session={session} />;

  const roster = await getRoster(classId);
  const students = roster?.students ?? [];
  const photos = await Promise.all(students.map((s) => photoVersion(classId, s.id)));
  const { group } = schoolClass;

  // Class fee totals, added up from each student's instalments in Sanity. Admins only.
  const isAdmin = session.role === 'admin';
  const feeTotal = students.reduce((sum, s) => sum + s.fees.total, 0);
  const feePaid = students.reduce((sum, s) => sum + s.fees.paid, 0);
  const feePending = students.reduce((sum, s) => sum + s.fees.pending, 0);
  const feeOverdue = students.reduce((sum, s) => sum + s.fees.overdue, 0);
  const studentsWithDues = students.filter((s) => s.fees.pending > 0).length;
  const studentsOverdue = students.filter((s) => s.fees.overdue > 0).length;
  const paidPct = feeTotal ? Math.round((feePaid / feeTotal) * 100) : 0;
  const index = ALL_CLASSES.findIndex((c) => c.id === schoolClass.id);
  // Only admins can open other classes, so only they get previous/next class buttons
  const prev = session.role === 'admin' ? ALL_CLASSES[index - 1] : undefined;
  const next = session.role === 'admin' ? ALL_CLASSES[index + 1] : undefined;

  return (
    <div style={{ backgroundColor: '#FBF9F4', minHeight: '100vh', color: '#1F1813' }}>
      <PageHeader backHref="/students" backLabel="to Student Corner" />

      <section className="gallery-page-hero">
        <div className="container">
          <span className="badge-tag" style={{ background: '#FFEDE9', color: '#FF5E3A', border: 'none' }}>
            {group.emoji} {group.name}
          </span>
          <h1 className="gallery-page-title">{schoolClass.label}</h1>
          <p className="gallery-page-subtitle">{group.tagline}</p>
        </div>
      </section>

      <section className="container" style={{ paddingBottom: 'clamp(48px, 8vw, 96px)' }}>
        {roster?.isDemo && (
          <div className="demo-banner" role="note">
            <strong>Demo data</strong> · These students and their records are sample data to preview the student dashboard. Click a student to open their dashboard.
          </div>
        )}

        {/* Quick facts */}
        <div className="class-facts">
          <div className="class-fact">
            <div className="class-fact-label">Class Teacher</div>
            <div className="class-fact-value">{roster?.classTeacher ?? 'To be updated'}</div>
          </div>
          <div className="class-fact">
            <div className="class-fact-label">Students</div>
            <div className="class-fact-value">{students.length > 0 ? students.length : 'To be updated'}</div>
          </div>
          <div className="class-fact">
            <div className="class-fact-label">Section</div>
            <div className="class-fact-value">{group.name}</div>
          </div>
        </div>

        {/* Fee summary — admins only */}
        {isAdmin && students.length > 0 && (
          <section aria-labelledby="class-fees-title" style={{ marginBottom: '32px' }}>
            <h2 id="class-fees-title" className="class-students-title">Fees · 2026–27</h2>
            <div className="dash-tiles">
              <div className="dash-tile">
                <div className="dash-tile-label">Total fee</div>
                <div className="dash-tile-value">{rupees(feeTotal)}</div>
                <div className="dash-tile-note">{students.length} students</div>
              </div>
              <div className="dash-tile">
                <div className="dash-tile-label">Collected</div>
                <div className="dash-tile-value">{rupees(feePaid)}</div>
                <div className="dash-tile-note">{paidPct}% of total</div>
              </div>
              <div className="dash-tile">
                <div className="dash-tile-label">Pending</div>
                <div className="dash-tile-value">{rupees(feePending)}</div>
                <div className="dash-tile-note">{studentsWithDues} student{studentsWithDues === 1 ? '' : 's'} yet to pay in full</div>
              </div>
              <div className="dash-tile">
                <div className="dash-tile-label">Overdue</div>
                <div className="dash-tile-value">{rupees(feeOverdue)}</div>
                <div className="dash-tile-note">
                  <span className={`status-pill ${feeOverdue > 0 ? 'status-critical' : 'status-good'}`}>
                    <span className="status-icon" aria-hidden="true">{feeOverdue > 0 ? '!' : '✓'}</span>
                    {feeOverdue > 0 ? `${studentsOverdue} student${studentsOverdue === 1 ? '' : 's'} past due date` : 'Nothing overdue'}
                  </span>
                </div>
              </div>
            </div>
            <div className="fee-meter" role="img" aria-label={`${paidPct}% of the class fee collected`} style={{ marginTop: '16px' }}>
              <div className="fee-meter-fill" style={{ width: `${paidPct}%` }} />
            </div>
          </section>
        )}

        {/* Student list */}
        <div className="class-students">
          <h2 className="class-students-title">Students</h2>
          {students.length > 0 ? (
            <ol className="class-student-grid">
              {students.map((s, i) => (
                <li key={s.id}>
                  <Link href={`/students/${schoolClass.id}/${s.id}`} className="class-student-card is-link">
                    {photos[i]
                      // eslint-disable-next-line @next/next/no-img-element -- private, auth-checked image
                      ? <img className="class-student-avatar" src={`/api/student-photo/${schoolClass.id}/${s.id}?v=${photos[i]}`} alt="" />
                      : <span className="class-student-avatar" aria-hidden="true">{s.name.charAt(0)}</span>}
                    <span style={{ flex: 1 }}>
                      <span className="class-student-name">{s.name}</span>
                      <span className="class-student-roll">
                        Roll No. {s.roll}
                        {isAdmin && (s.fees.pending > 0 ? ` · ${rupees(s.fees.pending)} pending` : ' · Fees paid')}
                      </span>
                    </span>
                    <span className="class-student-go" aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ol>
          ) : (
            <div className="class-empty">
              <div style={{ fontSize: '36px' }} aria-hidden="true">📋</div>
              <div className="class-empty-title">Student list coming soon</div>
              <div className="class-empty-text">
                The {schoolClass.label} student details for 2026–27 will be updated here shortly.
              </div>
            </div>
          )}
        </div>

        {/* Previous / next class */}
        <nav className="class-pager" aria-label="Other classes">
          {prev ? (
            <Link href={`/students/${prev.id}`} className="btn-pill btn-white">← {prev.navLabel}</Link>
          ) : <span />}
          {next ? (
            <Link href={`/students/${next.id}`} className="btn-pill btn-white">{next.navLabel} →</Link>
          ) : <span />}
        </nav>
      </section>
    </div>
  );
}
