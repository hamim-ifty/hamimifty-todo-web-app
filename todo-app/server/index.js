import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import todoRouter from './routes/todoRouter.js';

// Load environment variables
dotenv.config();
const env = process.env.NODE_ENV || 'development';
console.log('Server running in', env, 'mode');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', todoRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ error: err.message });
});

// Start server
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});