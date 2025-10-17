const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./src/routes');

const app = express();


//ให้ Express ใช้งาน CORS ได้
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());

// Add debugging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use('/api', routes);

// Add a test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Connect MongoDB
mongoose.connect('mongodb+srv://test:1234@test.nxtathd.mongodb.net/?retryWrites=true&w=majority&appName=test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

const server = app.listen(3000, () => console.log("Server is running on port 3000"));
module.exports = { app, server };
