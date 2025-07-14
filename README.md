# Link Saver 🔗  
**A Modern Bookmark Manager with Summarization**

Link Saver is a secure, full-featured bookmark management web application built with React and IndexedDB. It enables users to save, organize, summarize, and reorder their favorite links—right from the browser. Featuring drag-and-drop reordering, dark mode, and role-based authentication, it’s designed for productivity and privacy.

---

## 📌 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Screenshots](#screenshots)
- [Author](#author)
- [Security & Privacy](#security--privacy)
- [Customization](#customization)

---

## ✨ Features

- 🔐 **Authentication**: Secure registration and login with password hashing (`bcryptjs`) and JWT token management using cookies
- 🔖 **Bookmark Management**: Add, view, search, and delete bookmarks with metadata like title, favicon, and OpenGraph tags
- 📑 **AI Summarization**: Automatically summarizes bookmarked content via **Jina AI API**
- 🧲 **Drag-and-Drop Reordering**: Reorder bookmarks with `react-dnd`, and persist their order locally per user
- 🌙 **Dark Mode**: Toggle light/dark mode, with preferences stored in **IndexedDB**
- 📱 **Responsive UI**: Tailwind CSS ensures mobile-first, clean design
- 🛡 **No Server-Side Storage**: All user data remains on the client for maximum privacy

---

## 🛠 Tech Stack

**Frontend**
- React.js 18 (Hooks, Functional Components)
- Tailwind CSS
- Vite

**Storage**
- IndexedDB (via a minimal wrapper)
- js-cookie (for token handling)

**Authentication**
- bcryptjs (password hashing)
- JWT-based client authentication

**Other Libraries**
- react-dnd (drag-and-drop functionality)
- Jina AI API (content summarization)
- OpenGraph Scraper (custom utility for metadata)

---

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/RohitShalgar4/Link_Saver.git
cd Link_Saver

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🎮 Usage 

- Register/Login with a name, email, and password (min 6 characters)

- Add bookmarks via URL; metadata and summaries are fetched automatically

- Reorder bookmarks with drag-and-drop (drag handle ☰)

- Search bookmarks by title or URL

- Delete bookmarks with confirmation

- Toggle Dark Mode from the header

- Theme and bookmarks persist in local storage (IndexedDB)

## 📁 Folder Structure

```bash
link-saver/
│
├── src/
│   ├── components/
│   │   ├── BookmarkCard.jsx
│   │   ├── BookmarkForm.jsx
│   │   ├── Header.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── Router.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── utils/
│   │   ├── auth.js
│   │   ├── bookmarks.js
│   │   ├── idb.js
│   │   └── urlParser.js
│   └── App.jsx
│
└── README.md

```

## 📸 Screenshots

### 🔐 Authentication Flow
<img src="https://res.cloudinary.com/dt0ugqbrf/image/upload/v1752511126/Login_durljv.png" alt="Login" width="700"/>
<img src="https://res.cloudinary.com/dt0ugqbrf/image/upload/v1752511127/Register_oum9so.png" alt="Register" width="700"/>

### 🖥️ Main Interface
<img src="https://res.cloudinary.com/dt0ugqbrf/image/upload/v1752511127/Add_Bookmark_wppnw6.png" alt="Add Bookmark" width="700"/>

### 🧠 AI Summarization
<img src="https://res.cloudinary.com/dt0ugqbrf/image/upload/v1752511127/Drag_n_Drop_h35qan.png" alt="AI Summarization" width="700"/>


## 👨‍💻 Author

- Rohit Shalgar
- Email: rohitshalgar@example.com
- GitHub: @RohitShalgar4

## 🔒 Security & Privacy

- Passwords are hashed before being stored locally using bcryptjs

- Authentication tokens are handled with secure cookies

- No server-side data storage — all data lives in the user's browser (IndexedDB)

- The only outbound request is to the Jina AI API for summarization

## 🛠️ Customization
- 🎨 Branding: Tailwind CSS configuration can be customized for your brand's palette and layout

- 🤖 Summarization API: Swap the Jina API with your own AI summarizer if needed

- 💾 Storage: Easily replace IndexedDB with localStorage or a cloud-based solution

