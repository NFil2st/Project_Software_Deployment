const express = require('express');
const mongoose = require('mongoose');
const routes = require('./src/routes');
const cors = require('cors');

const app = express();


//ให้ Express ใช้งาน CORS ได้
app.use(cors({
  origin: 'http://localhost:5500', 
  credentials: true
}));

app.use(express.json());
app.use('/api', routes);

// ✅ Connect MongoDB
mongoose.connect('mongodb+srv://test:1234@test.nxtathd.mongodb.net/?retryWrites=true&w=majority&appName=test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

const server = app.listen(3000, () => console.log("Server is running on port 3000"));
module.exports = { app, server };
