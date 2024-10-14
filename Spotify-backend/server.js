import express from "express";
import cors from "cors";
import "dotenv/config";
import songRouter from "./src/routes/songroute.js";
import connectDB from "./src/config/mongodb.js";
import connectCloudinary from "./src/config/cloudinary.js";

// Initialize app
const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB()
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit process if DB connection fails
  });
connectCloudinary()
 

// Connect to Cloudinary

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/song", songRouter);
app.use((req, res, next) => {
    console.log('Headers:', req.headers);
    next();
  });
  
app.get("/", (req, res) => res.send("API Working"));

// Start server
const server = app.listen(port, () =>
  console.log(`Server started at port ${port}`)
);
