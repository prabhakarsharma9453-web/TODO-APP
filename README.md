# To-Do List Web App (MERN Stack)

A fully responsive, mobile-first To-Do List application built with the MERN stack and Tailwind CSS.

## Features
- **Mobile-First Design**: Beautiful responsive layout with a centered 420px card for desktop views.
- **CRUD Operations**: Create, read, update, and delete tasks.
- **Real-time Search**: Debounced search functionality to quickly find tasks.
- **Weekly Tracking**: Track progress with a weekly summary, progress bar, and interactive 7-day date strip.
- **Optimistic UI**: Instant state updates when toggling task completion.

## Tech Stack
- **Frontend**: React (Vite), React Router, Tailwind CSS, date-fns, lucide-react.
- **Backend**: Node.js, Express, MongoDB (Mongoose), cors, dotenv.

## Prerequisites
- Node.js installed
- MongoDB URI (local or Atlas)

## Local Setup

### 1. Clone the repository
\`\`\`bash
git clone <repo-url>
cd todo-app
\`\`\`

### 2. Setup Backend
\`\`\`bash
cd server
npm install
\`\`\`
- Create a \`.env\` file in the \`server\` directory:
\`\`\`env
MONGO_URI=your_mongodb_connection_string
PORT=5000
\`\`\`
- Start the backend server:
\`\`\`bash
npm run dev
\`\`\`

### 3. Setup Frontend
\`\`\`bash
cd client
npm install
\`\`\`
- The frontend is configured to use \`http://localhost:5000/api/tasks\` by default. If your backend is deployed elsewhere, create a \`.env\` file in the \`client\` directory:
\`\`\`env
VITE_API_URL=https://your-backend-url.com/api/tasks
\`\`\`
- Start the frontend server:
\`\`\`bash
npm run dev
\`\`\`

## Deployment
- **Frontend (Netlify)**: Connect your GitHub repo to Netlify, set build command to \`npm run build\` and publish directory to \`dist\`. Add \`VITE_API_URL\` to environment variables.
  - Live Link: [Pending Deployment]
- **Backend (Render/Railway)**: Connect your GitHub repo to Render as a Web Service. Set start command to \`node index.js\`. Add \`MONGO_URI\` to environment variables.
  - Live Link: [Pending Deployment]
# TODO-APP
