# Task Ledger — Frontend

[![Live Demo](https://img.shields.io/badge/demo-live-green)](https://task-ledger-frontend.vercel.app)

A modern, responsive task‑tracking interface built with **React** and **Vite**, consuming the [Task Ledger Backend API](https://task-ledger-backend.vercel.app).  
It provides a real‑time, no‑refresh experience for **creating, editing, deleting, filtering, and sorting** tasks – with instant feedback via toast notifications.

---

## 🚀 Live Demo

[https://task-ledger-frontend.vercel.app](https://task-ledger-frontend.vercel.app)

---

## ✨ Features

- **Full CRUD** – Create, Read, Update, Delete tasks
- **Instant UI updates** – No page reload; state updates optimistically
- **Filtering** – By status (`pending`, `in-progress`, `completed`) and priority (`low`, `medium`, `high`)
- **Sorting** – By `title`, `dueDate`, `priority`, or `createdAt`
- **Inline editing** – Edit any task via a slide‑over panel
- **Status change** – Dropdown on each card to change status immediately
- **Responsive design** – Works on desktop, tablet, and mobile
- **Toast notifications** – Success/error feedback using `react-toastify`
- **Animated UI** – Smooth transitions using `framer-motion` and `react-icons`
- **Environment‑configurable** – Easily switch between local and deployed backends

---

## 🛠️ Tech Stack

- **React 18** – UI library
- **Vite** – Build tool & dev server
- **Axios** – HTTP client
- **Framer Motion** – Animations
- **React Icons** – Icon library
- **React Toastify** – Toast notifications
- **Tailwind CSS** – Styling (utility‑first CSS framework)

---

## 📁 Folder Structure

```
frontend/
├── .env
├── package.json
├── vite.config.js
├── index.html
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── api/
│   │   └── taskApi.js
│   ├── components/
│   │   ├── TaskList.jsx
│   │   ├── TaskItem.jsx
│   │   ├── TaskForm.jsx
│   │   ├── FilterBar.jsx
│   │   └── common/
│   │       ├── Button.jsx
│   │       ├── Input.jsx
│   │       └── StatusIcon.jsx
│   ├── hooks/
│   │   └── useTasks.js
│   └── utils/
│       └── constants.js
```

---

## 🧑‍💻 Getting Started

### Installation

1. Clone the repository and navigate to the frontend folder.
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173` (or the port shown in the terminal).

---

## 🔗 Connecting to Your Backend

The `.env` file controls which API endpoint the frontend talks to.  
Open `.env` and set `VITE_API_BASE_URL` to the base URL where your backend is running (including the `/api` prefix if your routes are mounted under that path).

Example:
```env
VITE_API_BASE_URL=http://localhost:5000/api
                          or
VITE_API_BASE_URL=https://task-ledger-backend.vercel.app
```

> **Note:** Your frontend uses axios to call endpoints like `/tasks`, `/tasks/:id`, etc. So the full request URL becomes `VITE_API_BASE_URL + /tasks`.

If your backend is deployed (e.g., on Vercel), set:
```env
VITE_API_BASE_URL=https://your-backend.vercel.app/api
```

### CORS

Ensure your Express backend allows requests from your frontend origin.  
For local development, add:
```js
app.use(cors({ origin: 'http://localhost:5173' }));
```
For production, add your deployed frontend URL.

---

## 🧪 API Client

The `src/api/taskApi.js` module wraps all backend calls using an axios instance configured with the base URL from environment variables.

All functions expect the backend’s response shape: `{ success: boolean, data: any, message?: string }` and throw errors with human‑readable messages.

---

## 📦 Build & Deploy

To create a production build:
```bash
npm run build
```

The output will be in the `dist/` folder – ready to deploy to any static hosting provider (Vercel, Netlify, etc.).

---

## 🤝 Contributing

This project is part of a technical assignment. For any suggestions, feel free to open an issue or pull request.

---
