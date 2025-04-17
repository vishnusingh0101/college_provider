const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT || 3000;

const app = express();

console.log("Starting App");

// Logging
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - Body:`, req.body);
    next();
});
app.use(cors());
app.use(bodyParser.json({ extended: false }));
app.use(morgan('combined', { stream: accessLogStream }));

// Import routes
const errorControl = require('./controller/error');
const userRoute = require('./routes/user');
const passwordRoute = require('./routes/password');
const collegeRoute = require('./routes/getdata');
const paymentRoute = require('./routes/payment');

// API Routes
app.use('/user', userRoute);
app.use('/password', passwordRoute);
app.use('/college', collegeRoute);
app.use('/payment', paymentRoute);

const frontendPath = path.join(__dirname, 'frontend', 'dist');
app.use(express.static(frontendPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// 404 Error Handler
app.use(errorControl.get404);

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("Database Connected");

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (err) {
        console.error("Database Connection Error:", err);
    }
};

startServer();