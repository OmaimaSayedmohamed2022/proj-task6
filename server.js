require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const logEvents = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const allowedOrigins = ['http://localhost:3000',
                        // 'https://www.dandrepairshop.com',
                        // 'https://dandrepairshop.com'
                      ];

// Configure CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
}

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// Add the error handling middleware before the 404 route handler
app.use(errorHandler);

app.use('/auth', require('./routes/authRoutes'))
app.use('/users', require('./routes/userRoutes'))
app.use('/notes', require('./routes/noteRoutes'))


// 404 route handler
app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.send({ message: '404 not found' });
  } else {
    res.type('text').send('404 not found');
  }

  logEvents(`Request to ${req.method} ${req.originalUrl}`, 'request');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

mongoose.connection.on('error', err => {
  console.log(err)
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
});

