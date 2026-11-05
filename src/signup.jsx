import React from 'react';

export default function SignupModule({
  form,
  setForm,
  onSubmit,
  onLogin,
  onHome,
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

        <div className="eyebrow centered">JOIN OUR KITCHEN</div>
        <h1>Create your account</h1>
        <p>Save favourites and build your own recipe collection.</p>

        <form onSubmit={onSubmit} className="form-stack">
          <label>
            Full name
            <input
              required
              minLength="2"
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
              placeholder="Your name"
            />
          </label>

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
              placeholder="Create password"
            />
          </label>

          <button className="btn btn-dark submit-btn" type="submit">
            Create account ↗
          </button>
        </form>

        <p className="module-switch">
          Already registered? <button onClick={onLogin}>Login</button>
        </p>
        <button className="module-back" onClick={onHome}>
          ← Back to Food Recipes
        </button>
      </div>
    </div>
  );
}
