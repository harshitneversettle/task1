## Live at : https://task1-phi-two.vercel.app
# Task Manager Web App


A responsive task management single-page application built as part of a Software Engineer Intern hiring assignment.
The app allows users to manage tasks efficiently with CRUD operations, filtering, and persistent storage.

---

##  Features

*  Add new tasks
*  Edit existing tasks
*  Mark tasks as completed / pending
*  Delete tasks
*  Filter tasks (All / Pending / Completed)
*  Persistent storage using **localStorage**
*  Google OAuth login 
*  Input sanitization using DOMPurify (XSS prevention)
*  Fully responsive UI (mobile + desktop)

---

## 🛠️ Tech Stack

* **Frontend:** React + TypeScript
* **Styling:** Tailwind CSS
* **Authentication:** Google OAuth (`@react-oauth/google`)
* **State Management:** React Hooks (`useState`, `useRef`)
* **Storage:** Browser localStorage
* **Security:** DOMPurify (XSS protection)

---

##  Key Design Decisions

### 1. Local Storage for Persistence

* Tasks are stored per user using their email as key.
* Ensures data persists across page reloads without backend.

### 2. State-Driven UI

* All UI updates are handled via React state (`useState`)
* Avoided direct mutation → ensures predictable rendering

### 3. Input Sanitization

* Used `DOMPurify` to sanitize user inputs before storing
* Prevents XSS attacks

### 4. UUID Strategy

* Used `Date.now()` for unique task IDs
* Lightweight and sufficient for this scope

### 5. Filtering Logic

* Separate filtered state (`selectedTasks`) for better UI control

---

##  Authentication Flow

* User logs in using Google OAuth
* Access token is used to fetch user profile
* User data stored in React state
* Tasks are scoped per user (email-based storage)

---

##  Project Structure

```
src/
 ├── components/
 │    ├── Navbar.tsx        # Google login/logout
 │    ├── TaskInput.tsx     # Task CRUD + UI
 │
 ├── types/
 │    ├── googleUser.ts
 │    ├── tasksUser.ts
 │
 ├── App.tsx
 └── main.tsx
```

---

##  Getting Started

## Installation steps 
## manual installation 

### 1. Clone the repo

```bash
git clone https://github.com/harshitneversettle/task1
cd task-manager
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app

```bash
npm run dev
```

---

## Docker installation 

```bash
docker run -e VITE_CLIENT_ID={your_client_id_here} -p 5173:5173 harshitneversettle/task1:dev
```

##  Deployment

Deployed using:

* Vercel (https://task1-phi-two.vercel.app/)

---

##  Future Improvements

* Backend integration (Node.js + DB)
* Drag & drop task ordering
* Due dates & reminders
* Dark/light theme toggle
* Optimistic UI updates

---

##  Author

Harshit
Software Engineer Intern Candidate

---
