'use client';

import { useActionState } from 'react';
import { login, type LoginState } from './actions';

export default function LoginForm({ next }: { next?: string }) {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(login, {});

  return (
    <form action={formAction} className="login-form">
      <input type="hidden" name="next" value={next ?? ''} />

      <label className="login-label" htmlFor="loginId">Student / Teacher ID</label>
      <input
        id="loginId"
        name="loginId"
        className="login-input"
        placeholder="e.g. HES-2026-XXX"
        autoComplete="username"
        autoCapitalize="characters"
        required
      />

      <label className="login-label" htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        className="login-input"
        autoComplete="current-password"
        required
      />

      {state.error && <p className="login-error" role="alert">{state.error}</p>}

      <button type="submit" className="btn-pill btn-coral-gradient login-submit" disabled={pending}>
        {pending ? 'Checking…' : 'Log in'}
      </button>
    </form>
  );
}
