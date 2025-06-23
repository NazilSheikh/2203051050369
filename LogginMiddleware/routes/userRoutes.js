const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Register Route
router.post('/evaluation-service/register', async (req, res) => {
  try {
    const { name, email, mobileno, githubUsername, rollno, collegeName, accessCode } = req.body;

    if (!name || !email || !accessCode || !githubUsername || !mobileno || !rollno) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedAccessCode = await bcrypt.hash(accessCode, salt);

    const newUser = await User.create({
      name,
      email,
      mobileno,
      githubUsername,
      rollno,
      collegeName,
      accessCode: hashedAccessCode
    });

    const token = jwt.sign(
      { email: newUser.email, userid: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie("token", token, { httpOnly: true });
    res.status(201).json({ message: "Registered Successfully" });

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Login Route
router.post('/evaluation-service/auth', async (req, res) => {
  try {
    const { email, accessCode } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("User not found");

    const match = await bcrypt.compare(accessCode, user.accessCode);
    if (!match) return res.status(401).send("Invalid credentials");

    const token = jwt.sign(
      { email: user.email, userid: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ message: "Logged in Successfully", token });

  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

