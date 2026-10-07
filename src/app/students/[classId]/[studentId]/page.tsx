import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import NoAccess from '@/components/NoAccess';
import StudentPhoto from '@/components/StudentPhoto';
import { findClass } from '@/data/classes';
import { EXAMS, NEXT_EXAM, SUBJECTS, gradeFor, type InstallmentStatus } from '@/data/students-demo';
import { canViewStudent, getSession } from '@/lib/auth';
import { getRoster } from '@/lib/roster';
import { photoVersion } from '@/lib/student-photos';

type Props = { params: Promise<{ classId: string; studentId: string }> };

// Rendered per request: the page depends on who is logged in
export const dynamic = 'force-dynamic';

// Generic title on purpose: metadata is sent before the login check, so no names here
export const metadata: Metadata = { title: 'Student Dashboard | HARI E-TECHNO SCHOOL', robots: { index: false } };

const rupees = (n: number) => `₹${n.toLocaleString('en-IN')}`;
const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

const STATUS: Record<InstallmentStatus, { label: string; icon: string; className: string }> = {
  paid: { label: 'Paid', icon: '✓', className: 'status-good' },
  partial: { label: 'Part paid', icon: '!', className: 'status-serious' },
  overdue: { label: 'Overdue', icon: '!', className: 'status-critical' },
  'due-soon': { label: 'Due soon', icon: '⏱', className: 'status-warning' },
  upcoming: { label: 'Upcoming', icon: '•', className: 'status-neutral' },
};

export default async function StudentDashboard({ params }: Props) {
  const { classId, studentId } = await params;

  // Check the login before looking anything up, so strangers can't probe which students exist
  const session = await getSession();
  if (!session) redirect(`/login?next=/students/${classId}/${studentId}`);
  if (!canViewStudent(session, classId, studentId)) return <NoAccess session={session} />;

  const schoolClass = findClass(classId);
  const roster = await getRoster(classId);
  const student = roster?.students.find((s) => s.id === studentId);
  if (!schoolClass || !student) notFound();
  const classmates = roster?.students ?? [];
  const isStaff = session.role !== 'student';
  const photo = await photoVersion(classId, student.id);

  const { fees, marks, attendance } = student;
  const last = EXAMS.length - 1;
  const avgFor = (examIndex: number) =>
    Math.round(SUBJECTS.reduce((s, sub) => s + marks[sub][examIndex], 0) / SUBJECTS.length);
  const overall = avgFor(last);
  const delta = overall - avgFor(last - 1);
  const working = attendance.reduce((s, m) => s + m.working, 0);
  const present = attendance.reduce((s, m) => s + m.present, 0);
  const attendancePct = working ? Math.round((present / working) * 100) : 0;
  const paidPct = fees.total ? Math.round((fees.paid / fees.total) * 100) : 100;
  const feeState = fees.overdue > 0 ? STATUS.overdue : fees.pending > 0 ? STATUS['due-soon'] : STATUS.paid;

  // Previous/next student buttons are for staff only — students can open just their own page
  const index = classmates.findIndex((s) => s.id === student.id);
  const prev = isStaff ? classmates[index - 1] : undefined;
  const next = isStaff ? classmates[index + 1] : undefined;

  return (
    <div style={{ backgroundColor: '#FBF9F4', minHeight: '100vh', color: '#1F1813' }}>
      {isStaff
        ? <PageHeader backHref={`/students/${classId}`} backLabel={`to ${schoolClass.label}`} />
        : <PageHeader />}

      <main className="container dash">
        {roster?.isDemo && <div className="demo-banner" role="note">
          <strong>Demo data</strong> · This is a sample student created to preview the dashboard. Real student records should only be shown after a parent logs in.
        </div>}

        {/* Profile */}
        <section className="dash-profile">
          <StudentPhoto classId={classId} studentId={student.id} name={student.name} version={photo} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 className="dash-name">{student.name}</h1>
            <div className="dash-meta">
              <span>{schoolClass.label} · Roll No. {student.roll}</span>
              <span>Adm. No. {student.admissionNo}</span>
              <span>{student.parentName}</span>
              <span>{student.usesTransport ? '🚌 School bus' : '🚶 Own transport'}</span>
            </div>
          </div>
        </section>

        {/* Headline tiles */}
        <section className="dash-tiles" aria-label="Summary">
          <div className="dash-tile">
            <div className="dash-tile-label">Overall score (SA1)</div>
            <div className="dash-tile-value">{overall}% <span className="dash-tile-sub">Grade {gradeFor(overall)}</span></div>
            <div className={`dash-delta ${delta > 0 ? 'up' : delta < 0 ? 'down' : ''}`}>
              {delta === 0
                ? 'No change vs FA2'
                : `${delta > 0 ? '▲' : '▼'} ${Math.abs(delta)} ${Math.abs(delta) === 1 ? 'pt' : 'pts'} vs FA2`}
            </div>
          </div>
          <div className="dash-tile">
            <div className="dash-tile-label">Attendance</div>
            <div className="dash-tile-value">{attendancePct}%</div>
            <div className="dash-tile-note">{present} of {working} working days</div>
          </div>
          <div className="dash-tile">
            <div className="dash-tile-label">Fee pending</div>
            <div className="dash-tile-value">{rupees(fees.pending)}</div>
            <div className="dash-tile-note">
              <span className={`status-pill ${feeState.className}`}>
                <span className="status-icon" aria-hidden="true">{feeState.icon}</span>
                {fees.overdue > 0 ? `${rupees(fees.overdue)} overdue` : fees.pending > 0 ? 'Nothing overdue' : 'All clear'}
              </span>
            </div>
          </div>
          <div className="dash-tile">
            <div className="dash-tile-label">Activities</div>
            <div className="dash-tile-value">{student.activities.length}</div>
            <div className="dash-tile-note">{student.achievements.length} achievement{student.achievements.length === 1 ? '' : 's'} this year</div>
          </div>
        </section>

        <div className="dash-grid">
          {/* Fees */}
          <section className="dash-card" aria-labelledby="fees-title">
            <h2 id="fees-title" className="dash-card-title">Fees · 2026–27</h2>
            <div className="fee-summary">
              <span><strong>{rupees(fees.paid)}</strong> paid of {rupees(fees.total)}</span>
              <span className="fee-summary-pct">{paidPct}%</span>
            </div>
            <div className="fee-meter" role="img" aria-label={`${paidPct}% of annual fee paid`}>
              <div className="fee-meter-fill" style={{ width: `${paidPct}%` }} />
            </div>

            <div style={{ overflowX: 'auto' }}>
            <table className="dash-table">
              <thead>
                <tr><th>Instalment</th><th>Due</th><th className="num">Amount</th><th>Status</th></tr>
              </thead>
              <tbody>
                {fees.installments.map((inst) => {
                  const s = STATUS[inst.status];
                  return (
                    <tr key={inst.name}>
                      <td>{inst.name}</td>
                      <td>{formatDate(inst.dueDate)}</td>
                      <td className="num">
                        {rupees(inst.amount)}
                        {inst.status === 'partial' && <div className="dash-small">{rupees(inst.amount - inst.paid)} left</div>}
                      </td>
                      <td>
                        <span className={`status-pill ${s.className}`}>
                          <span className="status-icon" aria-hidden="true">{s.icon}</span>{s.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>

            <h3 className="dash-subtitle">Payment history</h3>
            {fees.payments.length > 0 ? (
              <ul className="pay-list">
                {fees.payments.map((p) => (
                  <li key={p.receipt}>
                    <span>
                      <strong>{rupees(p.amount)}</strong>
                      <span className="dash-small"> · {p.mode} · {p.receipt}</span>
                    </span>
                    <span className="dash-small">{formatDate(p.date)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="dash-small">No payments recorded yet.</p>
            )}
          </section>

          {/* Subject performance chart (latest exam) */}
          <section className="dash-card" aria-labelledby="subjects-title">
            <h2 id="subjects-title" className="dash-card-title">Subject-wise performance</h2>
            <p className="dash-card-sub">{EXAMS[last].name} · {EXAMS[last].month} · hover a bar for all exams</p>
            <div className="hbar-chart">
              <div className="hbar-grid" aria-hidden="true">
                {[0, 25, 50, 75, 100].map((t) => (
                  <span key={t} style={{ left: `${t}%` }}><em>{t}</em></span>
                ))}
              </div>
              {SUBJECTS.map((subject) => {
                const score = marks[subject][last];
                return (
                  <div key={subject} className="hbar-row" tabIndex={0}>
                    <span className="hbar-label">{subject}</span>
                    <span className="hbar-track">
                      <span className="hbar-bar" style={{ width: `${score}%` }} />
                      <span className="hbar-value" style={{ left: `${score}%` }}>{score}%</span>
                    </span>
                    <span className="viz-tip" role="tooltip">
                      <strong>{subject}</strong>
                      {EXAMS.map((exam, e) => (
                        <span key={exam.id}>{exam.id}: {marks[subject][e]}% ({gradeFor(marks[subject][e])})</span>
                      ))}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="dash-small" style={{ marginTop: '14px' }}>Next exam: {NEXT_EXAM}</p>
          </section>
        </div>

        {/* Marks table — the full readable version of the chart */}
        <section className="dash-card" aria-labelledby="marks-title">
          <h2 id="marks-title" className="dash-card-title">Marks by exam</h2>
          <div style={{ overflowX: 'auto' }}>
            <table className="dash-table marks-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  {EXAMS.map((exam) => <th key={exam.id} className="num">{exam.id} <span className="dash-small">{exam.month}</span></th>)}
                  <th className="num">Grade</th>
                </tr>
              </thead>
              <tbody>
                {SUBJECTS.map((subject) => (
                  <tr key={subject}>
                    <td>{subject}</td>
                    {marks[subject].map((m, e) => <td key={e} className="num">{m}%</td>)}
                    <td className="num"><strong>{gradeFor(marks[subject][last])}</strong></td>
                  </tr>
                ))}
                <tr className="marks-total">
                  <td>Average</td>
                  {EXAMS.map((_, e) => <td key={e} className="num">{avgFor(e)}%</td>)}
                  <td className="num"><strong>{gradeFor(overall)}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <div className="dash-grid">
          {/* Attendance */}
          <section className="dash-card" aria-labelledby="attendance-title">
            <h2 id="attendance-title" className="dash-card-title">Attendance by month</h2>
            <p className="dash-card-sub">% of working days present · June to October 2026</p>
            <div className="col-chart">
              {attendance.map((m) => {
                const pct = Math.round((m.present / m.working) * 100);
                return (
                  <div key={m.month} className="col-slot" tabIndex={0}>
                    <span className="col-area">
                      <span className="col-bar" style={{ height: `${pct}%` }}>
                        <span className="col-value">{pct}%</span>
                      </span>
                    </span>
                    <span className="col-label">{m.month}</span>
                    <span className="viz-tip" role="tooltip">
                      <strong>{m.month} 2026</strong>
                      <span>Present {m.present} of {m.working} days</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Extracurricular */}
          <section className="dash-card" aria-labelledby="activities-title">
            <h2 id="activities-title" className="dash-card-title">Extracurricular</h2>
            <div className="activity-list">
              {student.activities.map((a) => (
                <div key={a.name} className="activity-chip">
                  <strong>{a.name}</strong>
                  <span className="dash-small">{a.schedule}</span>
                </div>
              ))}
            </div>

            <h3 className="dash-subtitle">Achievements</h3>
            {student.achievements.length > 0 ? (
              <ul className="achievement-list">
                {student.achievements.map((a) => <li key={a}><span aria-hidden="true">🏅</span> {a}</li>)}
              </ul>
            ) : (
              <p className="dash-small">No achievements recorded yet this year.</p>
            )}

            <h3 className="dash-subtitle">Class teacher&apos;s remark</h3>
            <blockquote className="dash-remark">“{student.remark}”</blockquote>
          </section>
        </div>

        {isStaff && (
          <nav className="class-pager" aria-label="Other students">
            {prev ? <Link href={`/students/${classId}/${prev.id}`} className="btn-pill btn-white">← {prev.name}</Link> : <span />}
            {next ? <Link href={`/students/${classId}/${next.id}`} className="btn-pill btn-white">{next.name} →</Link> : <span />}
          </nav>
        )}
      </main>
    </div>
  );
}
