# 🚀 StoryForge — Interactive Fantasy Storytelling Platform

**Author:** Stuti

StoryForge is a full-stack MERN application that transforms traditional reading into an interactive adventure. Readers progress through stories chapter by chapter, unlocking hidden relics, notes, maps, and artifacts as they uncover the narrative.

Built with React, Node.js, Express, and MongoDB, StoryForge combines storytelling, gamification, authentication, and content management into a progression-driven reading experience.

## 🌐 Live Demo

**Frontend:** https://YOUR-VERCEL-URL.vercel.app

**GitHub Repository:** https://github.com/HidekiiRyuga/storyforge

---

## 🌟 Features

### ✍️ Author System

* Create and publish stories
* Add, edit, and delete chapters
* Rich chapter-based storytelling
* Create hidden artifacts tied to specific chapters
* Edit and delete artifacts
* Dedicated author dashboard
* Ownership validation and protected editing
* Story management interface

### 📖 Interactive Reader Experience

* Browse and discover stories
* Progress through chapters sequentially
* Chapter unlocking system
* Hidden artifact discovery mechanic
* Relic Cabinet for collected artifacts
* Persistent story-specific reading progress
* Immersive fantasy-themed reading interface

### 🔮 Artifact System

Artifacts act as hidden collectibles that enrich the story world.

Examples include:

* Ancient letters
* Journal entries
* Maps
* Relics
* Secret notes
* Historical records

Artifacts unlock automatically when readers reach designated chapters.

---

### 🔐 Authentication & Security

* JWT Authentication
* Secure user registration and login
* Protected API routes
* Author-only content modification
* Authentication middleware
* Token-based API communication

---

### 🎨 Frontend Experience

* React + Vite architecture
* Context API authentication state management
* Responsive fantasy-themed UI
* Dynamic chapter rendering
* Conditional content unlocking
* Relic collection interface
* Interactive reading flow
* Dark fantasy archive-inspired design

---

## 🛠 Tech Stack

### Frontend

* React.js
* React Router DOM
* Context API
* Axios
* Vite

### Backend

* Node.js
* Express.js
* JWT Authentication
* REST API Architecture

### Database

* MongoDB Atlas
* Mongoose ODM

---

## 🧠 Technical Highlights

* Full-stack MERN architecture
* Story-specific progress tracking system
* Dynamic content unlocking
* Artifact collection system
* JWT-based authentication flow
* Protected backend routes
* CRUD operations for stories, chapters, and artifacts
* MongoDB schema relationships
* Context-based authentication state management
* Responsive UI design
* Modular project structure

---

## ⚙️ System Architecture

```text
User Authentication
        │
        ▼
 Author Dashboard
        │
        ▼
 Story Creation
        │
        ▼
 Chapter Management
        │
        ▼
 Artifact Assignment
        │
        ▼
 Reader Progress System
        │
        ▼
 Artifact Unlocking
        │
        ▼
 Relic Collection
```

---

## 📂 Project Structure

```text
StoryForge
│
├── frontend
│   ├── components
│   ├── pages
│   ├── context
│   ├── assets
│   └── api
│
├── backend
│   ├── models
│   ├── routes
│   ├── middleware
│   └── config
│
└── database
```

---

## 💻 Installation & Setup

### Clone Repository

```bash
git clone <repository-url>
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🎯 Future Enhancements

* Story cover images
* Reader progress bar
* Story genres and filtering
* Favorites and bookmarks
* Story reviews and ratings
* Author analytics dashboard
* Artifact reveal animations
* Enhanced chapter progression system

---

## 👩‍💻 Developer

**Stuti**

B.Tech student and full-stack developer passionate about building interactive digital experiences through storytelling, design, and modern web technologies.

StoryForge showcases authentication systems, dynamic content management, progression-based UX design, and full-stack MERN development.
