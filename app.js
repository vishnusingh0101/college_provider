const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

console.log("🚀 Starting App...");

// === Logging Setup ===
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);

// === Middleware ===
app.use(cors());
app.use(bodyParser.json({ extended: false }));
app.use(morgan('combined', { stream: accessLogStream }));

// Optional: log POST/PUT bodies (skip GETs)
app.use((req, res, next) => {
  if (req.method !== 'GET') {
    console.log(`${req.method} ${req.url} - Body:`, req.body);
  }
  next();
});

// === Routes ===
const errorControl = require('./controller/error');
const userRoute = require('./routes/user');
const passwordRoute = require('./routes/password');
const collegeRoute = require('./routes/getdata');
const paymentRoute = require('./routes/payment');

app.use('/user', userRoute);
app.use('/password', passwordRoute);
app.use('/college', collegeRoute);
app.use('/payment', paymentRoute);

// === Serve React Frontend ===
const frontendPath = path.join(__dirname, 'frontend', 'dist');
app.use(express.static(frontendPath));

// React Fallback for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// === 404 Error Handler (for API routes only) ===
app.use(errorControl.get404);

// === Start Server with MongoDB Connection ===
const startServer = async () => {
  try {
    if (!process.env.MONGODB) {
      throw new Error('❌ MONGODB URI not found in .env');
    }

    await mongoose.connect(process.env.MONGODB);
    console.log("✅ MongoDB Connected");

    app.listen(port, () => {
      console.log(`✅ Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
  }
};

startServer();