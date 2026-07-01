# Task Ledger — Frontend

A React + Vite frontend for your Task Manager API (`getTasks` / `createTask` / `updateTask` / `deleteTask`). Every action — filing, editing, deleting, changing status, filtering, sorting — updates the screen instantly with no page reload, and reports success or failure via toast notifications (react-toastify).

## Setup

```bash
npm install
cp .env.example .env   # then edit VITE_API_BASE_URL if your API isn't on localhost:5000
npm run dev
```

Opens at `http://localhost:5173`.

## Connecting to your backend

`.env` controls where the app looks for your API:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

Adjust the port/path to match how you mount your `taskController` routes (e.g. `app.use('/api/tasks', taskRoutes)` → base URL should be `http://localhost:5000/api`, since the client calls `/tasks`).

### CORS

Your Express backend needs to allow requests from the Vite dev origin. If you don't already have this, add to your backend:

```js
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173' }));
```

## What's included

- **`src/api/taskApi.js`** — axios client wrapping all four endpoints, normalizing your `{ success, message, data }` response shape and surfacing backend validation errors (e.g. missing title, invalid dueDate, 404s) as readable messages.
- **`src/App.jsx`** — owns task state, filters, and sort; updates local state directly on create/update/delete/status-change so the list reflects changes immediately rather than re-fetching everything.
- **`src/components/FilterBar.jsx`** — status/priority filters and the `sortBy` dropdown, mapped 1:1 to your backend's `allowedSortFields`.
- **`src/components/TaskForm.jsx`** — slide-over panel for creating and editing entries, with client-side title validation matching your backend rule.
- **`src/components/TaskList.jsx` / `TaskItem.jsx`** — responsive card grid with an inline status-change dropdown, edit, and delete (with confirmation).

## Notes

- Status changes on a card use optimistic UI (updates immediately, rolls back with a toast if the request fails).
- Deleting asks for confirmation via a browser confirm dialog before calling the API.
- Responsive down to narrow phone widths — the sidebar collapses into a top bar under 860px.
