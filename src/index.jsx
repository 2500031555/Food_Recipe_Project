import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.jsx';
import './style.css';

// Clear accounts from the previous version BEFORE React loads saved accounts.
// This runs once; accounts created after this reset remain available for login.
try {
  if (localStorage.getItem('rn_accounts_reset_v3') !== 'done') {
    [
      'rn_users',
      'rn_session',
      'rn_recent_login',
      'rn_last_login',
      'rn_login_history_reset',
      'rn_accounts_reset_v2',
    ].forEach((key) => localStorage.removeItem(key));
    localStorage.setItem('rn_accounts_reset_v3', 'done');
  }
} catch {
  // The app can still load if browser storage is unavailable.
}

// Remove the previously registered admin account and any admin session.
// Keep normal user accounts created after the earlier account reset.
try {
  if (localStorage.getItem('rn_admin_reset_v1') !== 'done') {
    const savedUsers = JSON.parse(localStorage.getItem('rn_users') || '[]');
    const remainingUsers = Array.isArray(savedUsers)
      ? savedUsers.filter((account) =>
          account?.role !== 'admin' &&
          account?.email?.toLowerCase() !== 'admin@foodrecipeapp.com'
        )
      : [];
    localStorage.setItem('rn_users', JSON.stringify(remainingUsers));

    const savedSession = JSON.parse(localStorage.getItem('rn_session') || 'null');
    if (
      savedSession?.role === 'admin' ||
      savedSession?.email?.toLowerCase() === 'admin@foodrecipeapp.com'
    ) {
      localStorage.removeItem('rn_session');
    }

    const recentLogin = JSON.parse(localStorage.getItem('rn_recent_login') || 'null');
    if (recentLogin?.email?.toLowerCase() === 'admin@foodrecipeapp.com') {
      localStorage.removeItem('rn_recent_login');
    }

    localStorage.setItem('rn_admin_reset_v1', 'done');
  }
} catch {
  // The app can still load if browser storage is unavailable.
}

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
