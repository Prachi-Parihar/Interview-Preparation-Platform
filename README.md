# 🚀 AI Interview Preparation Platform

An AI-powered interview preparation platform designed to help users practice interviews, analyze resumes, receive personalized feedback, and build career-focused learning roadmaps.

Built with the MERN stack, AI agents, and a microservices architecture, the platform brings interview preparation and career development tools together in one place.

## ✨ Features

### 🎯 AI-Powered Interview Practice
- Practice HR and technical interviews.
- Generate interview questions based on the selected interview type.
- Interact with AI-powered interview agents.
- Receive feedback and summaries to improve interview performance.

### 📊 Interview Reports & Feedback
- Review interview performance.
- Get AI-generated feedback and summaries.
- Identify strengths and areas for improvement.
- Use feedback to prepare for future interviews.

### 📄 Resume Builder
- Create and edit professional resumes.
- Organize personal details, education, experience, projects, and skills.
- Preview resume content in a structured format.

### 🔍 AI Resume Analysis & ATS Scoring
- Analyze uploaded resumes.
- Review resume skills and relevant information.
- Get resume scores and recommendations.
- Identify areas that may need improvement.

### 🗺️ Personalized Learning Roadmap
- Generate learning roadmaps based on career goals and skills.
- Break learning goals into structured modules.
- Explore recommended learning resources.
- Discover relevant YouTube learning videos where supported.

### 🔐 Authentication
- User authentication and access management.
- Firebase integration for supported authentication flows.

### ⚙️ Microservices Architecture
- API Gateway for routing requests to backend services.
- Separate authentication, interview, resume, and roadmap services.
- Shared backend utilities.
- Redis integration for supported caching or data-management workflows.

## 🛠️ Tech Stack

**Frontend**
- React.js
- Vite
- JavaScript
- CSS
- Redux Toolkit

**Backend**
- Node.js
- Express.js
- REST APIs
- Microservices Architecture
- API Gateway

**Database & Storage**
- MongoDB
- Mongoose
- Redis

**AI Integration**
- Large Language Models (LLMs)
- AI agents for interview, feedback, resume analysis, and roadmap generation
- LangGraph-based workflows, where configured

**Authentication & Tools**
- Firebase
- Git and GitHub
- npm
- VS Code
- Docker Compose for configured services

## 🏗️ Project Architecture

The application separates frontend functionality from backend services. The API Gateway acts as the entry point for supported client requests and routes them to the relevant services.

```text
AI Interview Preparation Platform
│
├── Frontend (React + Vite)
│   ├── Dashboard
│   ├── Interview Practice
│   ├── Interview Reports
│   ├── Resume Builder
│   └── Learning Roadmap
│
└── Backend
    ├── API Gateway
    ├── Auth Service
    ├── Interview Service
    │   ├── Interview Agent
    │   ├── Feedback Agent
    │   └── Summary Agent
    ├── Resume Service
    │   └── Resume Analysis Agent
    ├── Roadmap Service
    │   ├── Roadmap Agent
    │   └── Resource Agent
    └── Shared Utilities
        └── Redis Integration
```

## 📂 Project Structure

```text
AI Interview Platform/
│
├── backend/
│   ├── gateway/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── index.js
│   │
│   ├── services/
│   │   ├── authService/
│   │   ├── interviewService/
│   │   ├── resumeService/
│   │   └── roadmapService/
│   │
│   ├── shared/
│   │   └── redis/
│   │
│   ├── docker-compose.yml
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── apis/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── data/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js and npm
- MongoDB or a configured MongoDB Atlas database
- Git
- Docker, if using the provided Docker Compose configuration
- Required credentials for the AI and authentication integrations you enable

### 1. Clone the Repository

```bash
git clone https://github.com/Prachi-Parihar/Interview-Preparation-Platform.git
cd Interview-Preparation-Platform
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3. Install Backend Dependencies

Open a separate terminal in the project root and install the dependencies required by the backend services according to their individual `package.json` files.

For example:

```bash
cd backend/gateway
npm install
```

Repeat for the authentication, interview, resume, and roadmap services where needed.

### 4. Configure Environment Variables

Create the required `.env` files for the relevant services using the variable names expected by their configuration files.

Configure your own credentials for the database, AI provider, Firebase, Redis, and any external integrations you use.

**Never commit API keys, private credentials, service account files, or production secrets to GitHub.**

### 5. Start the Application

Start the required backend services using the development commands defined in their respective `package.json` files. Start MongoDB and Redis if required by your configuration.

Then run the frontend:

```bash
cd frontend
npm run dev
```

Open the local URL displayed by Vite in your terminal.

*Note: Exact environment variables, startup commands, ports, and service dependencies depend on the project's current configuration.*

## 🔮 Future Improvements

- Improve the user experience and responsive design.
- Expand AI interview customization and feedback.
- Enhance roadmap personalization and learning-resource recommendations.
- Improve error handling and service integration.
- Add more interview categories and career preparation features.

## 