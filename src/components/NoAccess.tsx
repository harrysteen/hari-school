import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import { homeFor, type Session } from '@/lib/auth';

// Shown when a logged-in user opens a page their role does not allow
export default function NoAccess({ session }: { session: Session }) {
  return (
    <div style={{ backgroundColor: '#FBF9F4', minHeight: '100vh', color: '#1F1813' }}>
      <PageHeader />
      <main className="container login-wrap">
        <div className="login-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '40px' }} aria-hidden="true">🔒</div>
          <h1 className="login-title">You don&apos;t have access to this page</h1>
          <p className="login-sub">
            You are logged in as <strong>{session.name}</strong>. This account can only open its own
            {session.role === 'student' ? ' dashboard.' : ' class.'}
          </p>
          <Link href={homeFor(session)} className="btn-pill btn-coral-gradient">
            Go to {session.role === 'student' ? 'my dashboard' : 'my class'} →
          </Link>
        </div>
      </main>
    </div>
  );
}
