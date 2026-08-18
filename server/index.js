import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import https from 'https';
import taskRoutes from './routes/tasks.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

// MongoDB Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/todo-app';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      
      // Ping self every 14 minutes to keep Render free tier awake
      setInterval(() => {
        https.get('https://todo-app-kks3.onrender.com/api/tasks').on('error', (err) => {
          console.error('Ping error:', err.message);
        });
      }, 14 * 60 * 1000);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
