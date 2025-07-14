# Link Saver

A modern, secure, and beautiful bookmark manager built with React, Tailwind CSS, and IndexedDB. Save, organize, and summarize your favorite links with drag-and-drop reordering, dark mode, and more—all in your browser.

---

## Features

- **User Authentication**: Register and log in securely. Passwords are hashed with bcryptjs and never stored in plain text. Auth tokens are stored in cookies.
- **Bookmark Management**: Add, view, search, and delete bookmarks. Each bookmark stores the page title, favicon, OpenGraph tags, and a summary (via Jina AI API).
- **Drag-and-Drop Reordering**: Easily reorder your bookmarks with a visible drag handle. Order is persisted per user.
- **Responsive & Accessible UI**: Fully responsive design with Tailwind CSS, supporting both light and dark mode.
- **Dark Mode**: Toggle dark mode from the header. Theme preference is saved in IndexedDB and respected on all pages.
- **Persistent Storage**: All data (users, bookmarks, theme) is stored in the browser using IndexedDB for privacy and offline support.
- **OpenGraph Metadata**: Automatically fetches and displays OpenGraph tags (title, description, image, etc) for each bookmark.
- **Summarization**: Each bookmark is summarized using the Jina AI API and the summary is shown in the card.

---

## Tech Stack

- **React 18** (functional components, hooks)
- **Tailwind CSS** (utility-first styling, dark mode)
- **IndexedDB** (persistent browser storage)
- **bcryptjs** (password hashing)
- **js-cookie** (auth token storage)
- **react-dnd** (drag-and-drop)
- **Jina AI API** (bookmark summarization)
- **Vite** (fast dev/build tooling)

---

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm

### Installation

1. **Install dependencies**
   ```sh
   cd frontend
   npm install
   ```

2. **Start the development server**
   ```sh
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173) by default.

3. **Build for production**
   ```sh
   npm run build
   ```

---

## Usage

### Register & Login
- Register with your name, email, and password (min 6 chars). Passwords are hashed and never stored in plain text.
- Log in with your email and password. Auth tokens are stored in cookies for security.

### Add Bookmarks
- Enter a URL in the "Add New Bookmark" form.
- The app fetches the page title, favicon, OpenGraph tags, and a summary (via Jina AI API).
- Bookmarks are displayed as cards with all metadata and summary.

### Drag-and-Drop Reordering
- Use the ☰ handle (or drag anywhere on the card) to reorder bookmarks.
- The new order is saved and persists per user.
- Drag-and-drop is disabled while searching.

### Search & Delete
- Use the search box to filter bookmarks by title or URL.
- Click the trash icon to delete a bookmark (confirmation required).

### Dark Mode
- Toggle dark/light mode from the header. Theme is saved and applied everywhere.

---

## Project Structure

- `src/contexts/AuthContext.jsx` — Auth logic, context, and provider
- `src/utils/auth.js` — Auth helpers (token, password hashing)
- `src/utils/bookmarks.js` — Bookmark CRUD and order persistence
- `src/utils/idb.js` — Minimal IndexedDB wrapper
- `src/utils/urlParser.js` — Metadata extraction (title, favicon, OpenGraph)
- `src/components/BookmarkForm.jsx` — Add bookmark form
- `src/components/BookmarkCard.jsx` — Bookmark card UI
- `src/components/Header.jsx` — Header, dark mode toggle, user/logout
- `src/pages/Dashboard.jsx` — Main dashboard, drag-and-drop, search
- `src/pages/Login.jsx` — Login page
- `src/pages/Register.jsx` — Registration page
- `src/components/ProtectedRoute.jsx` — Route protection
- `src/components/Router.jsx` — Simple router

---

## Security & Privacy
- All data is stored locally in your browser (IndexedDB, cookies).
- Passwords are hashed with bcryptjs before storage.
- No data is sent to a backend server (except for bookmark summarization via Jina AI API).

---

## Customization
- **Theming**: Easily customize Tailwind config for your brand.
- **Storage**: Swap IndexedDB for another storage if needed.
- **API**: Replace Jina AI with your own summarization endpoint.

---

## License

MIT 