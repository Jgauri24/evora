import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

const prisma = new PrismaClient();

// ---------------- SIGNUP ----------------
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashed }
    });

    res.json({
      message: "Signup successful",
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- LOGIN ----------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      message: "Login successful",
      user,
      token: generateToken(user),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- SET ROLE ----------------
export const setRole = async (req, res) => {
  try {
    const { role, adminKey } = req.body;


    if (role === "admin") {
      console.log("Set Role Debug:", {
        receivedAdminKey: adminKey,
        envAdminKey: process.env.ADMIN_KEY,
        match: adminKey?.trim() === process.env.ADMIN_KEY?.trim()
      });

      if (!adminKey || adminKey.trim() !== process.env.ADMIN_KEY?.trim()) {
        return res.status(403).json({ message: "Invalid Admin Key" });
      }
    }

    const updated = await prisma.user.update({
      where: { id: req.user.id },
      data: { role },
    });

    res.json({
      message: "Role updated",
      user: updated,
      token: generateToken(updated),
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
