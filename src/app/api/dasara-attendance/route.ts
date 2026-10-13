export const dynamic = 'force-dynamic';

// Forwards Dasara portal entries to the Google Apps Script web app that writes them into the
// tracking sheet (students: class-wise tabs, teachers: "Teachers" tab). The script URL stays server-side.
export async function POST(req: Request) {
  const url = process.env.DASARA_SHEET_WEBHOOK_URL;
  if (!url) return Response.json({ ok: false, error: 'Sheet logging not configured' }, { status: 503 });

  const body = await req.json().catch(() => null);
  const role = body?.role === 'teacher' ? 'teacher' : 'student';
  const roll = String(body?.roll ?? '').replace(/[^0-9]/g, '').slice(0, 10);
  const name = String(body?.name ?? '').replace(/[^A-Za-z. ]/g, '').trim().slice(0, 60);
  const grade = String(body?.grade ?? '').trim().slice(0, 40);
  const subject = String(body?.subject ?? '').replace(/[^A-Za-z0-9&,.\- ]/g, '').trim().slice(0, 40);
  const missing = role === 'teacher' ? !name || !grade || !subject : !roll || !name || !grade;
  if (missing) return Response.json({ ok: false, error: 'Missing fields' }, { status: 400 });

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role, roll, name, grade, subject, secret: process.env.DASARA_SHEET_SECRET ?? '' }),
      redirect: 'follow',
    });
    const data = await res.json().catch(() => ({ ok: false, error: 'Bad response from sheet' }));
    return Response.json(data, { status: data.ok ? 200 : 502 });
  } catch {
    return Response.json({ ok: false, error: 'Could not reach sheet' }, { status: 502 });
  }
}
