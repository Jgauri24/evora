🎪 EventSphere – Universal Event Discovery & Booking Platform

EventSphere is a modern, intuitive, full-stack event discovery and booking platform built with React, Node.js, Express, and MySQL/PostgreSQL.
It enables users to explore events across categories, book seats effortlessly, manage profiles, and view detailed participation analytics—everything in one seamless, responsive interface.

🌟 Features
🔐 Authentication
-Secure login & signup using JWT
-Password hashing with bcrypt
-Protected routes (user + admin)

🎫 Event Management

-Browse all events
-Dynamic event details page
-“Book Now” flow
-Admin CRUD for events

🔎 Search, Filter & Sort

-Search events by name, location, type
-Filter by:

Category
Date
Price range
Online/Offline mode

-Sort by:

Price
Date
Popularity

📊 User Dashboard

Total events attended
Category-wise analytics
Past & upcoming bookings
All stats shown on a single-scroll dashboard

👤 Profile

User profile details
Update name, bio, avatar
View booking history
Delete account

⚡ Performance

Pagination for thousands of events
Optimized API calls
Fast server-side filters

🌐 Hosting Ready

Frontend: Vercel 
Backend: Render 
Database: Aiven MySQL

🛠️ Tech Stack
Frontend

React.js
React Router
Tailwind CSS
Axios

Backend

Node.js
Express.js
Prisma ORM
JWT (jsonwebtoken)
bcrypt
CORS
dotenv
Database

MySQL

Prisma schema & migrations

📁 Project Structure
EventSphere/
│
├── frontend/                       # React frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.js
│   │   │   ├── Events.js
│   │   │   ├── EventDetails.js
│   │   │   ├── Login.js
│   │   │   └── Signup.js
│   │   ├── components/
│   │   ├── utils/api.js          # Axios instance with JWT
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── backend/                       # Express backend
│   ├── index.js                  # Entry point
│   ├── routes/                   # API routes
│   ├── controllers/              # Logic
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── client.js
│   ├── middleware/
│   ├── .env
│   └── package.json
│
├── package.json
└── README.md

🚀 Getting Started
🔧 Prerequisites

Node.js (v16+ recommended)
npm 
MySQL
Git

🧩 Installation
1️⃣ Clone Repository
git clone https://github.com/Jgauri24/Evora.git
cd EventSphere

⚙️ Backend Setup
cd backend
npm install

Create .env file:
DATABASE_URL="mysql://username:password@:port/dbname"
JWT_SECRET="super-secret-token"
PORT=5000

Run Prisma:
npx prisma migrate dev --name init

Start Backend:
npm start


Backend runs at: http://localhost:5000

🎨 Frontend Setup
cd ../frontend
npm install

Optional .env file:
REACT_APP_API_URL="http://localhost:5000"

Start Frontend:
npm start


App opens at http://localhost:5173

🔐 Authentication Flow
Signup

User provides name, email, password
Password hashed using bcrypt
Stored in DB
Server returns JWT
Token stored in localStorage
Login
Email + password validated
Server returns JWT
Stored in localStorage → used in all Axios calls
Protected APIs
JWT sent in Authorization: Bearer <token>

Logout

localStorage cleared → redirect to login

🗄️ Database Schema (Sample)
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  role      String   @default("user")
  bookings  Booking[]
  createdAt DateTime @default(now())
}


(Event, Booking, Profile models will also exist)

🔌 API Endpoints
🧑‍💻 AUTH
Method	Endpoint	Description
POST	/api/auth/signup	Register user
POST	/api/auth/login	Login & return JWT
🎫 EVENTS
Method	Endpoint	Description
GET	/api/events	Get all events (search, filters, sort, pagination)
GET	/api/events/:id	Event details
POST	/api/events	Add event (Admin)
PUT	/api/events/:id	Update event (Admin)
DELETE	/api/events/:id	Delete event (Admin)
POST	/api/events/:id/book	Book event
🧾 USER BOOKINGS
Method	Endpoint	Description
GET	/api/user/bookings	Get all bookings
DELETE	/api/user/bookings/:id	Cancel booking
👤 PROFILE
Method	Endpoint	Description
GET	/api/profile	Get profile info
PUT	/api/profile	Update profile
DELETE	/api/profile/delete	Delete account
🛡️ Security Features

✔ bcrypt password hashing
✔ JWT authentication
✔ CORS protection
✔ Input validation
✔ Role-based access (User/Admin)
✔ Protected API routes

🐛 Troubleshooting
❌ P1001 – Can't reach database server

Check:

MySQL/PostgreSQL running

Correct host, port, username, password

DATABASE_URL properly encoded

SSL mode required? Add:

?sslmode=require

❌ CORS error

Ensure React URL matches backend origin

Backend must include:

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

❌ JWT missing

Check if token stored in localStorage

Check Axios interceptor

📦 Build & Deployment
Frontend Build
cd frontend
npm run build

Deployment Options
Layer	Options
Frontend	Vercel, Netlify
Backend	Render, Railway
Database	Aiven MySQL, Neon, PlanetScale, Railway
🤝 Contributing

Fork the repo
Create a branch
Commit your changes
Push & open a Pull Request

📜 License

MIT License.
Feel free to use and modify.

👤 Author

Gauri Jindal
GitHub: https://github.com/Jgauri24

Acknowledgments
Tailwind CSS for beautiful, utility-first styling
Prisma for database ORM
Express.js community for excellent documentation
React for the amazing UI library