import { createAuthClient } from '@alternatefutures/ac-auth';

/**
 * One client for the whole app. Public client: PKCE in the browser, no
 * secret. Tokens stay in memory (a reload shows the sign-in button again;
 * one click brings the user straight back because consent is remembered).
 * Pass `sessionStorage: 'session'` to keep the session across reloads.
 */
export const auth = createAuthClient({
  issuer: import.meta.env.VITE_ALTERNATE_CLOUDS_ISSUER,
  clientId: import.meta.env.VITE_ALTERNATE_CLOUDS_CLIENT_ID,
  redirectUri: `${window.location.origin}/callback`,
  postLogoutRedirectUri: `${window.location.origin}/`,
  scope: ['openid', 'profile', 'email', 'wallet'],
});
