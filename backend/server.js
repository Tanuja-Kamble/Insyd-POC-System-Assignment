const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const { startWorker } = require('./worker');
require('dotenv').config();

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

// connect to mongo
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/insyd_notifications';

console.log("🔍 Trying to connect to MongoDB...");
console.log("👉 MONGO_URI =", MONGO_URI); // just to confirm what Render is reading

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error: ', err.message);
    process.exit(1); // stop app if DB doesn’t connect
  });

// routes
app.use('/api/events', require('./routes/events'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/users', require('./routes/users'));

app.get('/', (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  // start background worker after server starts
  startWorker();
});
