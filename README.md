# Planplate-recipe-and-meal-planner

Planplate is a responsive recipe discovery and meal-planning web application. It uses **TheMealDB** to search recipes and show ingredients and instructions, **Firebase** for account authentication and saved favourites, and browser storage for the weekly meal plan and shopping-list progress.

## Features

- Search recipes by name
- Browse meal categories
- View recipe images, categories, ingredients, and instructions
- Register, log in, and log out with email/password or Google
- Save and remove favourites while signed in
- Add recipes to Monday-Sunday meal slots for breakfast, lunch, or dinner
- Generate a consolidated shopping list from planned recipes
- Check off and print shopping-list items
- Keep the weekly planner and shopping-list progress in local storage
- Protected routes for favourites, the meal planner, and the shopping list
- Loading, error, empty, and not-found states

## Tech Stack

- React 
- React Router 
- Vite 
- Tailwind CSS 
- Firebase Authentication
- Cloud Firestore
- Firebase Hosting
- TheMealDB API
- Vitest, Testing Library, jsdom, and V8 coverage

## Pages and Routes

| Route | Description |
| --- | --- |
| `/` | Home page and recipe preview |
| `/Discover` | Recipe search and category browser |
| `/recipe/:recipeId` | Recipe details and ingredient/instruction view |
| `/Login` | Email/password and Google login |
| `/Register` | Account registration |
| `/Favourite` | Signed-in user's saved favourites |
| `/Planner` | Signed-in user's weekly meal planner |
| `/Shopping-List` | Signed-in user's generated shopping list |
| `*` | Not-found page |

`/Favourite`, `/Planner`, and `/Shopping-List` require authentication. Visitors who open a protected route are redirected to `/Login` and returned to their intended destination after login.

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm
- A Firebase project
- Firebase Authentication providers enabled for Email/Password and Google
- A Firestore database

### 1. Clone and install

```bash
git clone https://github.com/bakhita579/Planplate-recipe-and-meal-planner.git
cd Planplate-recipe-and-meal-planner
npm install
```

### 2. Configure Firebase

Copy the example environment file:

```bash
cp .env.example .env
```

Set the following values in `.env` using the Web App configuration for your Firebase project:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

Restart the Vite development server after changing environment variables.

### 3. Start the development server

```bash
npm run dev
```

The development server is configured to run at `http://localhost:3000`.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server on port 3000 |
| `npm run build` | Create a production build in `dist` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm test` | Run the test suite once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run coverage` | Run tests and generate coverage reports |

## Tests

The test suite covers authentication, protected routes, recipe services, validators, ingredient extraction, and Firebase-backed favourites.

```bash
npm test
npm run lint
npm run build
```

Vitest is configured through `vite.config.js` with jsdom and `src/tests/setup.js`. Coverage output is written to the `coverage` directory.

## Data Sources and Storage

### TheMealDB

Recipe data is fetched at runtime from `https://www.themealdb.com/api/json/v1/1`. The app uses:

- `search.php` for text search
- `list.php` for categories
- `filter.php` for category filtering
- `lookup.php` for full recipe details and ingredients

TheMealDB is external and may be unavailable or subject to API limits.

### Firebase

Firebase Authentication identifies users. Favourite documents are stored under:

```text
users/{uid}/favourites/{idMeal}
```

Firestore access is restricted to the authenticated owner of each user document by `firebase.rules`.

### Browser Storage

The weekly meal plan and shopping progress are stored locally in the browser:

- `planplate_planner` - planned meals
- `planplate_weekly_planner` - legacy planner format
- `planplate_checked` - checked shopping-list items
- `planplate_favourites` - local favourite IDs used by recipe cards

Planner entries support migration from the legacy object format and are shared across open tabs through browser storage events.

## Deployment

The repository is configured for Firebase Hosting:

- Firebase Hosting publishes `dist`
- `firebase.json` rewrites all paths to `index.html` for React Router
- `.firebaserc` uses the `planplate-meals` Firebase project

Build and deploy with the Firebase CLI:

```bash
npm install -g firebase-tools
npm run build
firebase login
firebase deploy
```

To deploy only a specific Firebase service:

```bash
firebase deploy --only hosting
firebase deploy --only firestore:rules
```

Before deploying, enable the required authentication providers and confirm that `VITE_FIREBASE_*` variables are available to the build environment.

## Project Structure

```text
src/
├── App.jsx                 # Routes
├── main.jsx                # React and provider setup
├── App.css                 # Application component styles
├── index.css               # Tailwind CSS entry
├── Layouts/                # Navbar, layout, and footer
├── components/             # Recipe cards, dialogs, and auth components
├── context/                # Authentication and favourites providers
├── hooks/                  # Shared React context hooks
├── pages/                  # Route-level pages
├── services/               # Firebase and external API services
├── utils/                  # Validation and auth error helpers
└── tests/                  # Shared test setup
```

## Contributing

1. Create a feature branch.
2. Make focused changes and update tests or documentation when needed.
3. Run linting, tests, and a production build.
4. Open a pull request with a clear summary and verification steps.

## License

This project is licensed under the MIT License
