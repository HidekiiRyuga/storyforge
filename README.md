# 🚀 StoryForge — Interactive Storytelling Platform

**Author:** Stuti

StoryForge is a full-stack MERN application that enables users to create, publish, and explore interactive stories with dynamic content unlocking. Unlike traditional reading platforms, StoryForge introduces a progression-based storytelling experience where readers unlock hidden artifacts while reading chapters.

This project demonstrates end-to-end full-stack development, authentication systems, protected routing, dynamic content management, and interactive UI design.

---

## 🌟 Core Features

### ✍️ Author System

* Create and publish stories
* Add, edit, and delete chapters
* Add chapter titles and structured content
* Attach hidden artifacts to specific chapters
* Dedicated author dashboard
* Content ownership validation (only authors can edit their stories)

### 📖 Reader Experience

* Browse available stories
* Chapter-based reading interface
* Unlock hidden artifacts after reading chapters
* Dynamic story rendering based on progression
* Interactive storytelling structure

### 🔐 Authentication & Security

* JWT-based authentication
* Secure user registration and login
* Protected routes for dashboard and editing
* Backend authorization middleware

### 🎨 Frontend Architecture

* Component-based React structure
* Context API for authentication state
* Axios interceptors for token handling
* Conditional UI rendering based on authentication
* Clean dark-themed interface

---

## 🛠 Tech Stack

### Frontend

* React.js
* React Router
* Context API
* Axios
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* RESTful API Design

### Database

* MongoDB Atlas

---

## 🧠 Technical Highlights

* Full authentication lifecycle implementation
* Protected backend routes with middleware
* Nested MongoDB document management
* CRUD operations across stories and chapters
* Conditional rendering based on user state
* Secure token-based API communication
* Interactive content unlocking logic
* Modular and scalable project structure

---

## ⚙️ Architecture Overview

```
User Authentication
      ↓
Author Dashboard → Story Creation
      ↓
Chapter Management
      ↓
Artifact Attachment
      ↓
Reader Unlock System
```

---

## 💻 Installation & Setup

### Clone repository

```
git clone <repo-link>
```

### Backend setup

```
cd backend
npm install
npm run dev
```

Create `.env` file in backend:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

### Frontend setup

```
cd frontend
npm install
npm run dev
```

---

## 👩‍💻 Author

**Stuti**
Full-stack developer building interactive digital experiences with modern web technologies.
