import React from 'react';

export default function AdminModule({
  user,
  recipes,
  users,
  favorites,
  recipeForm,
  setRecipeForm,
  onSubmit,
  onDelete,
  onLogout,
  onHome,
  categories,
}) {
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
              <small>ADMIN MODULE</small>
            </span>
          </a>
          <button className="btn btn-outline" onClick={onLogout}>
            Log out
          </button>
        </header>

        <div className="module-welcome">
          <div className="eyebrow">ADMIN MODULE · CONTROL PANEL</div>
          <h1>
            Admin <em>Dashboard.</em>
          </h1>
          <p>
            Manage the Food Recipes collection and keep the community inspired.
          </p>
        </div>

        <div className="admin-stats module-stats">
          <div>
            <strong>{recipes.length}</strong>
            <span>Published recipes</span>
          </div>
          <div>
            <strong>{users.length}</strong>
            <span>Registered users</span>
          </div>
          <div>
            <strong>{favorites.length}</strong>
            <span>Saved favourites</span>
          </div>
        </div>

        <div className="module-admin-grid">
          <section className="module-panel">
            <h2>Add a recipe</h2>
            <form onSubmit={onSubmit} className="form-stack admin-form">
              <label>
                Recipe title
                <input
                  required
                  value={recipeForm.title}
                  onChange={(event) =>
                    setRecipeForm({
                      ...recipeForm,
                      title: event.target.value,
                    })
                  }
                  placeholder="e.g. Sunday lemon cake"
                />
              </label>

              <div className="form-row">
                <label>
                  Category
                  <select
                    value={recipeForm.category}
                    onChange={(event) =>
                      setRecipeForm({
                        ...recipeForm,
                        category: event.target.value,
                      })
                    }
                  >
                    {categories
                      .filter((category) => category !== 'All recipes')
                      .map((category) => (
                        <option key={category}>{category}</option>
                      ))}
                  </select>
                </label>

                <label>
                  Prep time (min)
                  <input
                    type="number"
                    min="1"
                    value={recipeForm.time}
                    onChange={(event) =>
                      setRecipeForm({
                        ...recipeForm,
                        time: event.target.value,
                      })
                    }
                  />
                </label>
              </div>

              <label>
                Description
                <textarea
                  required
                  rows="2"
                  value={recipeForm.description}
                  onChange={(event) =>
                    setRecipeForm({
                      ...recipeForm,
                      description: event.target.value,
                    })
                  }
                />
              </label>

              <label>
                Image URL
                <input
                  type="url"
                  value={recipeForm.image}
                  onChange={(event) =>
                    setRecipeForm({
                      ...recipeForm,
                      image: event.target.value,
                    })
                  }
                  placeholder="https://..."
                />
              </label>

              <label>
                Ingredients (one per line)
                <textarea
                  required
                  rows="3"
                  value={recipeForm.ingredients}
                  onChange={(event) =>
                    setRecipeForm({
                      ...recipeForm,
                      ingredients: event.target.value,
                    })
                  }
                />
              </label>

              <label>
                Steps (one per line)
                <textarea
                  required
                  rows="3"
                  value={recipeForm.steps}
                  onChange={(event) =>
                    setRecipeForm({
                      ...recipeForm,
                      steps: event.target.value,
                    })
                  }
                />
              </label>

              <button className="btn btn-dark submit-btn" type="submit">
                Publish recipe ↗
              </button>
            </form>
          </section>

          <section className="module-panel">
            <h2>Recipe management</h2>
            <p>Review and remove published recipes.</p>
            <div className="module-recipe-list">
              {recipes.map((recipe) => (
                <div key={recipe.id}>
                  <img src={recipe.image} alt={recipe.title} />
                  <span>
                    {recipe.title}
                    <small>
                      {recipe.category} · {recipe.time} min
                    </small>
                  </span>
                  <button
                    className="delete-btn"
                    onClick={() => onDelete(recipe.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        <button className="module-back" onClick={onHome}>
          ← View public website
        </button>
      </div>
    </div>
  );
}
