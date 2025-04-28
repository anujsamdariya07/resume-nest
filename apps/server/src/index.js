import express from 'express';
import cors from 'cors';
import resumeRoutes from './routes/resumeRoutes.js';
import dotenv from 'dotenv';
import { dbConnect } from './lib/dbConnect.js';

dotenv.config();
dbConnect();

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());

app.use('/api/resumes', resumeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening at port: ${PORT}...`);
});
