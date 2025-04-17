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

// app.get('/', (req, res) => {
//     res.send('Hello from the app!');
//   });
  
//   app.listen(80, '0.0.0.0', () => {
//     console.log('Server running on port 80');
//   });


// Import routes
const errorControl = require('./controller/error');
const userRoute = require('./routes/user');
const passwordRoute = require('./routes/password');
const collegeRoute = require('./routes/getdata'); 
const paymentRoute = require('./routes/payment'); 

console.log("Starting App");

// Setup logging
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - Body:`, req.body);
    next();
});
app.use(cors());
app.use(bodyParser.json({ extended: false }));
app.use(morgan('combined', { stream: accessLogStream }));

// Routes
app.use('/user', userRoute);
app.use('/password', passwordRoute);
app.use('/college', collegeRoute);
app.use('/payment', paymentRoute);
app.use('/', (req, res) => {
    res.send('Hello from the app!');
  });

// 404 handler
app.use(errorControl.get404);

// MongoDB connection & server start
const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("Database Connected");

        app.listen(3000,() => {
            console.log("Server running on port 3000");
        });
    } catch (err) {
        console.error("Database Connection Error:", err);
    }
};

startServer();