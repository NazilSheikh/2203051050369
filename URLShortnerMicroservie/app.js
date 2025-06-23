

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

const ShortURL = require('./models/ShortURL');

app.get('/:shortcode', async (req, res) => {
  try {
    const { shortcode } = req.params;
    const urlDoc = await ShortURL.findOne({ shortcode });

    if (!urlDoc) {
      return res.status(404).send('Shortcode not found');
    }

    if (new Date() > urlDoc.expiresAt) {
      return res.status(410).send('Link expired');
    }

    return res.redirect(urlDoc.originalUrl);
  } catch (err) {
    console.error('Redirect Error:', err);
    res.status(500).send('Internal server error');
  }
});





// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
