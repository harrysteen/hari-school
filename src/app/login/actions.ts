'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ACCOUNTS } from '@/data/accounts-demo';
import { SESSION_COOKIE, SESSION_HOURS, createSessionToken, homeFor, verifyPassword } from '@/lib/auth';

export type LoginState = { error?: string };

// Failed-attempt lockout: 5 wrong passwords locks that ID for 15 minutes.
// In-memory, so it resets when the server restarts — fine for the demo;
// move it to the database together with real accounts.
const MAX_FAILURES = 5;
const LOCK_MINUTES = 15;
const failures = new Map<string, { count: number; lockedUntil: number }>();

// Same hash format as real accounts, so unknown IDs take as long as wrong passwords
const DUMMY_HASH = 'scrypt$00000000000000000000000000000000$' + '0'.repeat(64);

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const loginId = String(formData.get('loginId') ?? '').trim().toUpperCase();
  const password = String(formData.get('password') ?? '');
  if (!loginId || !password) return { error: 'Enter your ID and password.' };

  const record = failures.get(loginId);
  if (record && record.lockedUntil > Date.now()) {
    const minutes = Math.ceil((record.lockedUntil - Date.now()) / 60000);
    return { error: `Too many wrong attempts. Try again in ${minutes} minute${minutes === 1 ? '' : 's'}, or ask your class teacher.` };
  }

  const account = ACCOUNTS.find((a) => a.loginId.toUpperCase() === loginId);
  const passwordOk = verifyPassword(password, account?.passwordHash ?? DUMMY_HASH);
  if (!account || !passwordOk) {
    const count = (record && record.lockedUntil <= Date.now() && record.count >= MAX_FAILURES ? 0 : record?.count ?? 0) + 1;
    failures.set(loginId, { count, lockedUntil: count >= MAX_FAILURES ? Date.now() + LOCK_MINUTES * 60000 : 0 });
    return { error: 'ID or password is incorrect.' };
  }

  failures.delete(loginId);
  const session = { loginId: account.loginId, role: account.role, name: account.name, classId: account.classId, studentId: account.studentId };
  (await cookies()).set(SESSION_COOKIE, createSessionToken(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_HOURS * 3600,
  });

  // Only follow a "next" link that stays on this site and that the user may open
  const next = String(formData.get('next') ?? '');
  const home = homeFor(session);
  redirect(next.startsWith('/students/') && !next.startsWith('//') && (session.role !== 'student' || next === home) ? next : home);
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect('/login');
}
