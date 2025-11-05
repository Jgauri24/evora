import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(express.json());

function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "2d" }
  );
}

app.get("/api/auth/test", (req, res) => {
  res.json({ message: "Backend Live ✅" });
});

// Signup
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashed },
    });

    return res.json({
      message: "Signup successful",
      token: generateToken(user),
      user,
    });
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid email or password" });

    return res.json({
      message: "Login successful",
      token: generateToken(user),
      user,
    });
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
});

// Server Start
app.listen(process.env.PORT || 4000, () =>
  console.log(`✅ Server running on ${process.env.PORT}`)
);
