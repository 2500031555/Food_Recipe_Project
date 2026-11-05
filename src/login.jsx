import React from 'react';

export default function LoginModule({
  form,
  setForm,
  onSubmit,
  onSignup,
  onHome,
  recentLogin,
}) {
  return (
    <div className="module-page">
      <div className="module-card">
        <a className="brand" href="#home" onClick={onHome}>
          <span className="brand-mark">
            f<span>✳</span>
          </span>
          <span>
            Food <span className="brand-light">Recipes</span>
            <small>GOOD FOOD. GOOD MOOD.</small>
          </span>
        </a>

        <div className="eyebrow centered">WELCOME BACK</div>
        <h1>Login to your account</h1>
        <p>Sign in to continue discovering recipes.</p>

        {recentLogin?.email && (
          <div className="recent-login-card">
            <strong>Previous login</strong>
            <span>{recentLogin.email}</span>
            <small>{recentLogin.loggedInAt ? new Date(recentLogin.loggedInAt).toLocaleString() : 'Saved account'}</small>
            <small>Your email is filled in below. Enter your password to continue.</small>
          </div>
        )}

        <form onSubmit={onSubmit} className="form-stack">
          <label>
            Email address
            <input
              required
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm({ ...form, email: event.target.value })
              }
              placeholder="you@example.com"
            />
          </label>

          <label>
            Password
            <input
              required
              minLength="4"
              type="password"
              value={form.password}
              onChange={(event) =>
                setForm({ ...form, password: event.target.value })
              }
              placeholder="Enter password"
            />
          </label>

          <button className="btn btn-dark submit-btn" type="submit">
            Login ↗
          </button>
        </form>

        <p className="module-switch">
          Don't have an account? <button onClick={onSignup}>Sign up</button>
        </p>
        <button className="module-back" onClick={onHome}>
          ← Back to Food Recipes
        </button>
      </div>
    </div>
  );
}
