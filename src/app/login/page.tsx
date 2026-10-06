import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import { getSession, homeFor } from '@/lib/auth';
import LoginForm from './LoginForm';

export const metadata: Metadata = {
  title: 'Login — Student Corner | HARI E-TECHNO SCHOOL',
  robots: { index: false },
};

type Props = { searchParams: Promise<{ next?: string }> };

export default async function LoginPage({ searchParams }: Props) {
  const session = await getSession();
  if (session) redirect(homeFor(session));
  const { next } = await searchParams;

  return (
    <div style={{ backgroundColor: '#FBF9F4', minHeight: '100vh', color: '#1F1813' }}>
      <PageHeader />
      <main className="container login-wrap">
        <div className="login-card">
          <span className="badge-tag" style={{ background: '#FFEDE9', color: '#FF5E3A', border: 'none' }}>
            🔒 Student Corner
          </span>
          <h1 className="login-title">Log in</h1>
          <p className="login-sub">
            Students: use your admission number. Teachers: use your teacher ID. Your password is given by the school office.
          </p>
          <LoginForm next={next} />
          <p className="login-help">
            Forgot your password? Ask your class teacher or the school office to reset it.
          </p>
        </div>
      </main>
    </div>
  );
}
