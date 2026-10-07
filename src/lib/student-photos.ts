import 'server-only';
import { mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

// Student photos are children's images, so they live outside /public and are
// only served through /api/student-photo after a login check.
const PHOTO_DIR = path.join(process.cwd(), 'student-photos');

export const MAX_PHOTO_BYTES = 5 * 1024 * 1024;

const SAFE_ID = /^[a-z0-9-]+$/i;

function photoPath(classId: string, studentId: string) {
  if (!SAFE_ID.test(classId) || !SAFE_ID.test(studentId)) throw new Error('Invalid id');
  return path.join(PHOTO_DIR, classId, studentId);
}

// Detect the real image type from the file's first bytes instead of trusting the upload's name
export function imageTypeOf(bytes: Uint8Array): string | null {
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'image/jpeg';
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return 'image/png';
  if (String.fromCharCode(...bytes.slice(0, 4)) === 'RIFF' && String.fromCharCode(...bytes.slice(8, 12)) === 'WEBP') return 'image/webp';
  return null;
}

// Returns the photo's last-modified time (used to bust the browser cache), or null if there's no photo
export async function photoVersion(classId: string, studentId: string) {
  try {
    return Math.floor((await stat(photoPath(classId, studentId))).mtimeMs);
  } catch {
    return null;
  }
}

export async function readPhoto(classId: string, studentId: string) {
  try {
    const bytes = await readFile(photoPath(classId, studentId));
    const type = imageTypeOf(bytes);
    return type ? { bytes, type } : null;
  } catch {
    return null;
  }
}

export async function savePhoto(classId: string, studentId: string, bytes: Uint8Array) {
  const file = photoPath(classId, studentId);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, bytes);
}

export async function deletePhoto(classId: string, studentId: string) {
  await rm(photoPath(classId, studentId), { force: true });
}
