# Food Recipes — React + Vite

A responsive food recipe website with separate Login, Signup, Admin and User modules.

## Run locally in VS Code

1. Extract the ZIP file.
2. Open the `food-recipes-modules` folder in VS Code.
3. Open the VS Code terminal.
4. Run the following commands:

```bash
npm install
npm run dev
```

5. Open the local URL shown in the terminal.

## Production build

```bash
npm run build
```

## Project structure

```text
food-recipes-modules/
├── index.html
├── package.json
├── README.md
└── src/
    ├── index.jsx
    ├── app.jsx
    ├── login.jsx
    ├── signup.jsx
    ├── admin.jsx
    ├── user.jsx
    ├── script.js
    └── style.css
```

## Modules

| File | Purpose |
|---|---|
| `index.html` | Main HTML page and React mount element |
| `src/index.jsx` | React application entry point |
| `src/app.jsx` | Main application, navigation, recipe list, search, filters and recipe details |
| `src/login.jsx` | Login screen |
| `src/signup.jsx` | Registration screen |
| `src/admin.jsx` | Admin dashboard and recipe management |
| `src/user.jsx` | User dashboard and saved favourites |
| `src/script.js` | Shared Local Storage helper functions |
| `src/style.css` | Website styling and responsive layout |

## Included recipe categories

Breakfast, Lunch, Dinner, Healthy, Dessert, Drinks and Sides.
The starter recipe collection includes thirteen recipes across breakfast, lunch, dinner, healthy meals, desserts, drinks and sides.

## Account features

- The login screen remembers the last-used email address on this browser.
- The User module displays the most recent login date and time.
- Users can change their display name in **My account**; the updated name is saved in browser Local Storage.
- Passwords are not included in the last-login record. This project stores demo account data in browser Local Storage and is not suitable for production authentication.

## Admin demonstration

Create an account using `admin@foodrecipeapp.com` to open the Admin module. Other registrations receive the User role. This client-side Local Storage role check is for classroom demonstration only, not production security.


## Account storage update

On the first launch of this updated version, the app clears previously saved
account registrations, the active login session, and the old recent-login
reminder from this browser. This is a one-time reset. New accounts created
through Sign Up are then saved in browser local storage and can be used to log
in again from the same browser.

Passwords in this learning/demo project are stored in browser local storage.
Do not use real or reused passwords; a production app should use a secure
backend with hashed passwords and proper authentication.


## First launch after this update

On the first launch of this updated version, the app clears account data saved by the previous version in this browser (`rn_users`, the active session, and saved login reminders). This happens before React loads the account list. Create a new account after opening the updated project.

After that one-time reset, newly created accounts are saved in this browser and can be used to log in again. Logging out does not delete the account. To test with a completely fresh account list again, clear this site's browser Local Storage in Developer Tools, or change the reset marker in `src/index.jsx`.

**Demo limitation:** account data is stored in browser Local Storage. It is suitable for a student front-end project, not for real user authentication or secure password storage.


## Admin account reset

On the first launch of this update, the previously saved admin account (`admin@foodrecipeapp.com`, or any saved account with the `admin` role) is removed from browser Local Storage. Any active admin session and admin recent-login reminder are also cleared. Regular user accounts are kept. The admin cleanup runs once; it does not remove accounts created afterward.


## Recipe collection

The starter collection now includes 33 recipes across breakfast, lunch, dinner, healthy meals, desserts, drinks and sides. Recipe cards include ingredients and step-by-step instructions.


## Expanded recipe collection

The starter recipe collection now contains 63 recipes across breakfast, lunch, dinner, healthy meals, desserts, drinks and sides. Each recipe includes ingredients and preparation steps.
