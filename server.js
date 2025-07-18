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
    origin:"http://localhost:5173",
    credentials: true, // Allow cookies to be sent with requests
}));


app.use('/api',authRoutes)
app.use('/api/posts',postRoutes);

app.get("/api/me", protectRoute, (req, res) => {
  res.status(200).json({ user: req.user });
});




app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
    connectDB()
})