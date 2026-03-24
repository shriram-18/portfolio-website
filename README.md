# Developer Portfolio Website

A completely responsive, production-ready full-stack portfolio website.

## Tech Stack
- **Frontend:** Vanilla HTML5, CSS3, modern ES6+ Javascript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Others:** Nodemailer (For Contact Form Emails), Express-Validator (Data validation), Helmet, CORS, Rate Limiter

## Project Structure
```
portfolio/
├── backend/
│   ├── config/          # DB config
│   ├── controllers/     # API logic
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express routes
│   ├── server.js        # Entry point
│   ├── .env.example     # Environment variables schema
│   └── package.json     # Backend dependencies
└── frontend/
    ├── css/
    │   └── styles.css   # Main styles inc. dark mode
    ├── js/
    │   └── app.js       # Main logic and API fetch
    └── index.html       # Single page layout
```

## Local Setup Instructions

### 1. Database Setup (MongoDB Atlas)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free tier cluster.
2. Under "Database Access", create a new database user with a password.
3. Under "Network Access", allow access from anywhere (`0.0.0.0/0`) or just your local IP.
4. Click "Connect" on your cluster, choose "Connect your application", and copy the connection string. Replace `<username>` and `<password>` with the credentials you created.

### 2. Backend Setup
1. Inside the `backend` folder, copy `.env.example` to `.env`:
   ```bash
   cd backend
   cp .env.example .env
   ```
2. Update the `.env` variables with your real MongoDB string, your email (to receive contact form submissions), and an app password (e.g., Gmail App Password).
3. If not already installed, run:
   ```bash
   npm install
   ```
4. Start the backend:
   ```bash
   npm start
   ```
   *(Assuming you add `"start": "node server.js"` to your `package.json`'s scripts)*

### 3. Frontend Setup
1. In `frontend/js/app.js`, ensure `API_BASE_URL` points to your running backend (e.g., `http://localhost:5000/api` during local development).
2. Open `frontend/index.html` directly in your browser or run a simple local server like Live Server (VS Code Extension).

## API Endpoints

- `GET /api/profile` - Fetches profile info
- `GET /api/projects` - Fetches all projects
- `GET /api/skills` - Fetches all skills
- `POST /api/contact` - Submits the contact form, validates input, saves to DB, and emails you.
- `POST /api/admin/projects` - (Admin only, requires `adminkey` header) Create a project.
- `POST /api/admin/skills` - (Admin only) Create a skill.
- `POST /api/admin/profile` - (Admin only) Seed your profile.

## Deployment Guides

### Deploying the Backend on Render
1. Push your code to a GitHub repository.
2. Go to [Render](https://render.com) and create a "Web Service".
3. Connect your GitHub repo.
4. Set the Root Directory to `backend`.
5. Set the Build Command to `npm install`.
6. Set the Start Command to `node server.js`.
7. Under Environment Variables, add your `.env` variables (e.g., `MONGODB_URI`, `EMAIL_USER`, `EMAIL_PASS`, etc.).
8. Click "Create Web Service". Once deployed, copy your Render URL.

### Deploying the Frontend on Vercel
1. In your frontend files, update `API_BASE_URL` in `app.js` to point to your new Render URL.
2. Go to [Vercel](https://vercel.com) and click "Add New... Project".
3. Import your GitHub repository.
4. Set the Root Directory to `frontend`.
5. No build command is necessary since it is a static vanilla site.
6. Click "Deploy". Your portfolio is now online!

---
*Created by the Google Deepmind Antigravity Assistant.*
