import React, { useState } from 'react';

export default function UserModule({
  user,
  favorites,
  lastLogin,
  onUpdateProfile,
  onLogout,
  onHome,
  onFavorites,
}) {
  const [name, setName] = useState(user.name || '');

  const formattedLastLogin = lastLogin?.loggedInAt
    ? new Date(lastLogin.loggedInAt).toLocaleString()
    : 'No previous login saved';

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateProfile(name);
  }

  return (
    <div className="module-page">
      <div className="module-dashboard">
        <header className="module-top">
          <a className="brand" href="#home" onClick={onHome}>
            <span className="brand-mark">
              f<span>✳</span>
            </span>
            <span>
              Food <span className="brand-light">Recipes</span>
              <small>USER MODULE</small>
            </span>
          </a>
          <button className="btn btn-outline" onClick={onLogout}>
            Log out
          </button>
        </header>

        <div className="module-welcome">
          <div className="eyebrow">USER MODULE</div>
          <h1>
            Hello, {user.name.split(' ')[0]}! <em>Welcome back.</em>
          </h1>
          <p>
            Your personal space to discover recipes and save your favourites.
          </p>
        </div>

        <div className="module-tiles">
          <article>
            <span>♡</span>
            <h3>Saved recipes</h3>
            <p>{favorites.length} recipes in your favourites</p>
            <button className="btn btn-dark" onClick={onFavorites}>
              View favourites
            </button>
          </article>

          <article>
            <span>⌕</span>
            <h3>Explore recipes</h3>
            <p>Browse meals, desserts, drinks and more.</p>
            <button className="btn btn-dark" onClick={onHome}>
              Browse recipes
            </button>
          </article>

          <article>
            <span>✦</span>
            <h3>My account</h3>
            <p>{user.email}</p>
            <small>Role: {user.role === 'admin' ? 'Admin' : 'User'}</small>
            <small className="last-login-detail">
              Last login: {formattedLastLogin}
            </small>
          </article>
        </div>

        <section className="module-panel account-edit-panel">
          <h2>Edit my account</h2>
          <p>Change the name displayed on your Food Recipes account.</p>
          <form className="form-stack" onSubmit={handleSubmit}>
            <label>
              User name
              <input
                required
                minLength="2"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your name"
              />
            </label>
            <button className="btn btn-dark submit-btn" type="submit">
              Save user name
            </button>
          </form>
        </section>

        <button className="module-back" onClick={onHome}>
          ← Back to website
        </button>
      </div>
    </div>
  );
}
