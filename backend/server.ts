import express from 'express';
import cors, { CorsOptions } from 'cors'
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import notesRoutes from './routes/notes';
import { errorHandler } from './middleware/errorHandler';
import serverless from "serverless-http";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const allowedOrigins = [
  'http://localhost:5173',
  'https://notes-lime-nine.vercel.app',
]

// Optional: allow preview deployments like https://notes-<branch>-<hash>.vercel.app
const isAllowedPreview = (origin: string) =>
  /^https:\/\/notes[-\w]*\.vercel\.app$/.test(origin)

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests (no Origin header)
    if (!origin) return callback(null, true)

    const allowed =
      allowedOrigins.includes(origin) || isAllowedPreview(origin)

    if (allowed) return callback(null, true)
    return callback(new Error('Not allowed by CORS'))
  },
  credentials: true, // required if you send cookies or Authorization headers
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204, // some environments prefer 204
}

// CORS must be very early
app.use(cors(corsOptions))
// Explicitly handle preflight for all routes
app.options('*', cors(corsOptions))
// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// Middleware
app.use(helmet());
app.use(limiter);




app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/notes', notesRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling
app.use(errorHandler);

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hd-notes')
//   .then(() => {
//     console.log('Connected to MongoDB');
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error('MongoDB connection error:', error);
//     process.exit(1);
//   });

let isConnected = false;
async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/hd-notes");
    isConnected = true;
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}
connectDB();
// Vercel serverless function handler
// const handler = serverless(app);

module.exports = app;
