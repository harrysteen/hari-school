import { canViewStudent, getSession } from '@/lib/auth';
import { findStudentInClass } from '@/lib/roster';
import { MAX_PHOTO_BYTES, deletePhoto, imageTypeOf, readPhoto, savePhoto } from '@/lib/student-photos';

type Ctx = { params: Promise<{ classId: string; studentId: string }> };

export const dynamic = 'force-dynamic';

// Same rule as the dashboard: staff of the class, admins, or the student's own login
async function authorise(ctx: Ctx) {
  const { classId, studentId } = await ctx.params;
  const session = await getSession();
  if (!session) return { error: new Response('Not logged in', { status: 401 }) };
  if (!canViewStudent(session, classId, studentId) || !(await findStudentInClass(classId, studentId))) {
    return { error: new Response('Not found', { status: 404 }) };
  }
  return { classId, studentId };
}

export async function GET(_req: Request, ctx: Ctx) {
  const auth = await authorise(ctx);
  if ('error' in auth) return auth.error;
  const photo = await readPhoto(auth.classId, auth.studentId);
  if (!photo) return new Response('No photo', { status: 404 });
  return new Response(new Uint8Array(photo.bytes), {
    headers: {
      'Content-Type': photo.type,
      // Private: never cached by shared proxies. URLs carry ?v=<mtime>, so a long browser cache is safe.
      'Cache-Control': 'private, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

export async function POST(req: Request, ctx: Ctx) {
  const auth = await authorise(ctx);
  if ('error' in auth) return auth.error;

  const form = await req.formData().catch(() => null);
  const file = form?.get('photo');
  if (!(file instanceof File) || file.size === 0) return Response.json({ error: 'Choose a photo to upload.' }, { status: 400 });
  if (file.size > MAX_PHOTO_BYTES) return Response.json({ error: 'Photo must be 5 MB or smaller.' }, { status: 413 });

  const bytes = new Uint8Array(await file.arrayBuffer());
  if (!imageTypeOf(bytes)) return Response.json({ error: 'Use a JPG, PNG or WebP image.' }, { status: 415 });

  await savePhoto(auth.classId, auth.studentId, bytes);
  return Response.json({ ok: true });
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const auth = await authorise(ctx);
  if ('error' in auth) return auth.error;
  await deletePhoto(auth.classId, auth.studentId);
  return Response.json({ ok: true });
}
