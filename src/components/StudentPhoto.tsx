'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  classId: string;
  studentId: string;
  name: string;
  version: number | null; // photo's last-modified time; null when there's no photo yet
};

export default function StudentPhoto({ classId, studentId, name, version }: Props) {
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const url = `/api/student-photo/${classId}/${studentId}`;

  async function send(init: RequestInit) {
    setBusy(true);
    setError('');
    try {
      const res = await fetch(url, init);
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setError(body?.error ?? 'Something went wrong. Please try again.');
        return;
      }
      router.refresh();
    } catch {
      setError('Could not reach the server. Please try again.');
    } finally {
      setBusy(false);
      if (input.current) input.current.value = '';
    }
  }

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError('Photo must be 5 MB or smaller.');
      e.target.value = '';
      return;
    }
    const form = new FormData();
    form.append('photo', file);
    send({ method: 'POST', body: form });
  }

  function onRemove() {
    if (confirm(`Remove ${name}'s photo?`)) send({ method: 'DELETE' });
  }

  return (
    <div className="dash-photo">
      {version ? (
        // eslint-disable-next-line @next/next/no-img-element -- private, auth-checked image; not for next/image
        <img className="dash-avatar dash-avatar-img" src={`${url}?v=${version}`} alt={`Photo of ${name}`} />
      ) : (
        <span className="dash-avatar" aria-hidden="true">{name.charAt(0)}</span>
      )}
      <div className="dash-photo-actions">
        <button type="button" className="dash-photo-btn" onClick={() => input.current?.click()} disabled={busy}>
          {busy ? 'Saving…' : version ? 'Change photo' : '📷 Add photo'}
        </button>
        {version && !busy && (
          <button type="button" className="dash-photo-btn is-quiet" onClick={onRemove}>Remove</button>
        )}
      </div>
      <input
        ref={input}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        hidden
        onChange={onPick}
        aria-label={`Upload a photo of ${name}`}
      />
      {error && <p className="dash-photo-error" role="alert">{error}</p>}
    </div>
  );
}
