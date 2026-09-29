# Alternate Clouds sign-in starter (Vite + React)

A single-page React app where users sign in with their Alternate Clouds
account. PKCE runs in the browser, tokens stay in memory, the components
take the platform's design tokens.

For an app with a server, prefer the Next.js starter
(`alternate-auth-starter-next`): it keeps tokens out of the browser.

## Five minutes to a signed-in page

1. Create a client. In the Alternate Clouds web app open **Organization ›
   Developer**, create a **public** client with redirect URI
   `http://localhost:5173/callback` and post-logout redirect URI
   `http://localhost:5173/`. Copy the client id.

2. Get the app:

   ```bash
   npx degit alternatefutures/alternate-auth-starter-vite-react my-app
   cd my-app && npm install
   ```

3. Configure it:

   ```bash
   cp .env.example .env.local
   ```

   Set `VITE_ALTERNATE_CLOUDS_CLIENT_ID` to your client id.

4. Run it and sign in:

   ```bash
   npm run dev
   ```

   Open http://localhost:5173, click **Continue with Alternate Clouds**, sign
   in on the Alternate Clouds page, approve, and you are back on the
   dashboard.

## What is where

| File | Role |
|---|---|
| `src/auth.ts` | `createAuthClient()`: issuer, client id, redirect URI, scopes. |
| `src/main.tsx` | `<AuthProvider client={auth}>`; the provider finishes the sign-in when the page is `/callback`. |
| `src/App.tsx` | `<SignedIn>` / `<SignedOut>`, `<SignIn>`, `<UserButton>`, the dashboard built from `@alternatefutures/ui`. |
| `src/index.css` | Tailwind v4 + the Alternate Futures design tokens (`@alternatefutures/tokens/theme.css`). |

## Calling an API with the user's token

```ts
const token = await auth.getAccessToken(); // refreshes when needed, null when signed out
```

The access token is opaque and valid for the Alternate Clouds userinfo
endpoint; your own API can verify the ID token (`auth.getSession()` gives
`tokens.idToken`) with the issuer's published keys.

## Learn more

- Guide: https://docs.alternatefutures.ai/guides/add-sign-in
- Packages: `@alternatefutures/ac-auth-react`, `@alternatefutures/ac-auth`
