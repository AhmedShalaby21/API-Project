import express, { json } from 'express';
import connectDB from './config/db.js';
import authRoutes from './src/routes/auth.routes.js';
import organizationRoutes from './src/routes/organization.routes.js'
import { config } from 'dotenv';
import cors from 'cors'


config();

// Connect to MongoDB
connectDB();

const app = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes); 

// Use organization routes
app.use('/api/organizations', organizationRoutes);

// Root route for testing
app.get('/', (req, res) => {
    res.send('API is running');
  });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
