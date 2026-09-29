import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from '@alternatefutures/ac-auth-react';
import './index.css';
import { App } from './App';
import { auth } from './auth';

function onSignedIn(returnTo: string | null) {
  // The provider finished the sign-in on /callback: continue where the user wanted to go.
  window.history.replaceState(null, '', returnTo && returnTo.startsWith('/') ? returnTo : '/');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* theme="inherit": the components use this app's stylesheet (the web app's palette). */}
    <AuthProvider client={auth} theme="inherit" onSignedIn={onSignedIn}>
      <App />
    </AuthProvider>
  </StrictMode>,
);
