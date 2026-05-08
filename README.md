# 🎬 AI Movie Recommender Backend

A Node.js backend API for generating AI-powered movie recommendations using LLM APIs and SQLite database.

## 🚀 Tech Stack

* Node.js
* Native HTTP Module
* SQLite
* OpenRouter / LLM API

## ✨ Features

* AI movie recommendations
* REST API
* SQLite database integration
* JSON response handling
* CORS support
* Error handling
* Lightweight backend architecture

## 📂 Folder Structure

backend/
├── config/
├── utils/
├── server.js
├── package.json
└── movies.db

## ⚙️ Setup

### Clone Repo

```bash
git clone https://github.com/YOUR_USERNAME/movie-ai-api.git
```

### Install Dependencies

```bash
npm install
```

### Create Environment Variables

Create `.env`

```env
OPENROUTER_API_KEY=your_api_key_here
```

### Start Server

```bash
node server.js
```

## 📡 API Endpoint

### GET /

Returns backend status.

### POST /api/recommend

Request:

```json
{
  "prompt": "Sci-fi thriller"
}
```

Response:

```json
{
  "recommendations": [
    {
      "movie": "Interstellar",
      "reason": "Epic sci-fi storytelling"
    }
  ]
}
```

## 🚀 Deployment

Backend deployed on Render.

## 👨‍💻 Author

Rajeev Bartwal
