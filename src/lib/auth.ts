import 'server-only';
import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

export type Role = 'student' | 'teacher' | 'admin';

export type Session = {
  loginId: string;
  role: Role;
  name: string;
  classId?: string;    // teacher: the class they teach; student: their class
  studentId?: string;  // student only: their dashboard id
  exp: number;         // expiry, unix seconds
};

export const SESSION_COOKIE = 'hes_session';
export const SESSION_HOURS = 8;

function secret() {
  const s = process.env.AUTH_SECRET;
  if (!s || s.length < 32) throw new Error('AUTH_SECRET is missing or shorter than 32 characters (set it in .env.local).');
  return s;
}

// ---- Passwords: stored only as salted scrypt hashes ("scrypt$<salt>$<hash>") ----

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex');
  return `scrypt$${salt}$${scryptSync(password, salt, 32).toString('hex')}`;
}

export function verifyPassword(password: string, stored: string) {
  const [scheme, salt, hash] = stored.split('$');
  if (scheme !== 'scrypt' || !salt || !hash) return false;
  const expected = Buffer.from(hash, 'hex');
  const actual = scryptSync(password, salt, expected.length);
  return timingSafeEqual(actual, expected);
}

// ---- Session token: base64url(JSON) + "." + HMAC-SHA256 signature ----

const sign = (payload: string) => createHmac('sha256', secret()).update(payload).digest('base64url');

export function createSessionToken(session: Omit<Session, 'exp'>) {
  const full: Session = { ...session, exp: Math.floor(Date.now() / 1000) + SESSION_HOURS * 3600 };
  const payload = Buffer.from(JSON.stringify(full)).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

function readSessionToken(token: string | undefined): Session | null {
  if (!token) return null;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return null;
  const expected = Buffer.from(sign(payload));
  const given = Buffer.from(signature);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  try {
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString()) as Session;
    return session.exp > Date.now() / 1000 ? session : null;
  } catch {
    return null;
  }
}

export async function getSession() {
  return readSessionToken((await cookies()).get(SESSION_COOKIE)?.value);
}

// ---- Permissions (checked on the server for every protected page) ----

export const canViewClass = (s: Session, classId: string) =>
  s.role === 'admin' || (s.role === 'teacher' && s.classId === classId);

export const canViewStudent = (s: Session, classId: string, studentId: string) =>
  canViewClass(s, classId) || (s.role === 'student' && s.classId === classId && s.studentId === studentId);

// Where each role lands after logging in
export const homeFor = (s: Pick<Session, 'role' | 'classId' | 'studentId'>) =>
  s.role === 'student' ? `/students/${s.classId}/${s.studentId}`
    : s.role === 'teacher' ? `/students/${s.classId}`
    : '/students';
