import Link from 'next/link';
import Image from 'next/image';
import { getSession } from '@/lib/auth';
import { logout } from '@/app/login/actions';

// Header for inner pages: school logo, the logged-in user (if any) and a "Back" button
export default async function PageHeader({ backHref = '/', backLabel = 'to Main Site' }: { backHref?: string; backLabel?: string }) {
  const session = await getSession();

  return (
    <header className="site-nav">
      <div className="container nav-wrapper">
        <Link href="/" className="logo-link">
          <Image src="/images/school-logo.png" alt="Hari E-Techno School emblem" width={52} height={52} className="logo-emblem" priority />
          <div className="logo-text">
            <Image src="/images/school-name.png" alt="Hari Educational Institutions" width={1600} height={110} className="logo-name" priority />
            <span className="logo-sub-text">RAJANAGARAM • AP</span>
          </div>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {session && (
            <form action={logout} className="header-user">
              <span className="header-user-name hide-on-phone">👤 {session.name}</span>
              <button type="submit" className="btn-pill btn-outline-dark header-logout">Log out</button>
            </form>
          )}
          <Link href={backHref} className="btn-pill btn-white" style={{ fontSize: '13.5px', padding: '8px 16px' }}>
            ← Back<span className="hide-on-phone"> {backLabel}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
