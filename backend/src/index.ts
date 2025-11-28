import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './utils/prisma';
import userRoutes from './routes/userRoutes';
import tipRoutes from './routes/tipRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tips', tipRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Crypto Tips API is running' });
});

// Start server
const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
