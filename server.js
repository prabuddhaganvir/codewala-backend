import express from 'express';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import protectRoute from './middleware/protected.js';




dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "https://codewala-frontend.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use('/api',authRoutes)
app.use('/api/posts',postRoutes);

app.get("https://codewala-frontend.vercel.app/api/me", protectRoute, (req, res) => {
  res.status(200).json({ user: req.user });
});




app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
    connectDB()
})