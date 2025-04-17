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

// === LOGGING ===
console.log("🚀 Starting App...");
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);

// === MIDDLEWARE ===
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined', { stream: accessLogStream }));

app.use((req, res, next) => {
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    console.log(`[${req.method}] ${req.url} - Body:`, req.body);
  }
  next();
});

// === ROUTES ===
const errorControl = require('./controller/error');
const userRoute = require('./routes/user');
const passwordRoute = require('./routes/password');
const collegeRoute = require('./routes/getdata');
const paymentRoute = require('./routes/payment');

app.use('/api/user', userRoute);
app.use('/api/password', passwordRoute);
app.use('/api/college', collegeRoute);
app.use('/api/payment', paymentRoute);

const frontendPath = path.join(__dirname, 'frontend', 'dist');
app.use(express.static(frontendPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.use(errorControl.get404);

const startServer = async () => {
  try {
    if (!process.env.MONGODB) {
      throw new Error('MONGODB URI not defined in .env');
    }

    await mongoose.connect(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected");

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();