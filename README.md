# Shriram Patil - Full Stack Portfolio 🚀

A modern, responsive, and production-ready full-stack personal portfolio demonstrating my skills, backend projects, and a robust way to showcase my professional identity. 

**Live Demo:** [portfoliowebsite-lovat-ten.vercel.app](https://portfoliowebsite-lovat-ten.vercel.app/)

---

## ✨ Features

- **Dynamic Content Routing:** Profile, skills, and projects data are driven entirely by a MongoDB backend, meaning updates to the database instantly reflect on the website without code changes.
- **Modern Glassmorphic UI:** A clean, visually pleasing aesthetic using modern CSS variables, glassmorphism, and responsive design principles.
- **Dark/Light Mode:** Seamless toggling between themes with preferences saved to `localStorage`.
- **Working Contact Form:** Integrated with `nodemailer` to securely send user inquiries directly to my personal email address.
- **Rate Limiting & Security:** The API is protected with `helmet`, `cors`, and `express-rate-limit` to prevent abuse.

## 🛠️ Tech Stack

**Frontend:**
- HTML5 & CSS3
- Vanilla JavaScript (ES6+)
- FontAwesome Icons

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- Nodemailer (for emails)
- Helmet, Cors, Express-Rate-Limit (Security & Utilities)

**Deployment:**
- **Hosting:** Vercel (using `@vercel/node` and `@vercel/static`)
- **Database Hosting:** MongoDB Atlas

## 📁 Project Structure

```text
portfolio/
├── backend/                  # Node.js Server Environment
│   ├── config/               # Database connection logic
│   ├── controllers/          # Business logic for all routes
│   ├── models/               # Mongoose schemas (Profile, Project, Skill)
│   ├── routes/               # Express API endpoints
│   ├── server.js             # Entry point / Vercel serverless function
│   └── seed.js               # Utility script to populate DB
├── frontend/                 # Client Interface
│   ├── assets/               # Local files (Resume PDF, Images)
│   ├── css/                  # Stylesheets and theming
│   ├── js/                   # DOM manipulation, theme toggling, API fetching
│   └── index.html            # Main UI layout
├── vercel.json               # Serverless mapping for Vercel deployment
└── README.md
```

## 🚀 Local Development Setup

To run this project locally on your machine, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/shriram-18/portfolio-website.git
cd portfolio-website
```

### 2. Configure Environment Variables
Inside the `backend/` directory, create a `.env` file referencing `.env.example`:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5500
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
ADMIN_KEY=your_admin_secret_key
```

### 3. Install Dependencies
```bash
cd backend
npm install
```

### 4. Seed the Database (Optional)
If you have a fresh database, you can load your initial data using the seeder script:
```bash
node seed.js
```

### 5. Start the Application
Start the backend server:
```bash
npm start
# or npm run dev (if using nodemon)
```

Run the frontend:
Use an extension like **Live Server** in VS Code to serve `frontend/index.html` on `http://localhost:5500`.

## 📬 Contact
- **Email:** patilshriram93@gmail.com (or your preferred email)
- **GitHub:** [@shriram-18](https://github.com/shriram-18)
