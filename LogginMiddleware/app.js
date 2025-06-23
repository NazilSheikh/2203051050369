

const express = require('express');
const app = express();
const connectDB = require('./Config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Static Files
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.get('/', (req, res) => {
  res.send("Hello");
});
app.use('/api/users', require('./routes/userRoutes')); 


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});