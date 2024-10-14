import { addSong } from '../controllers/songControllers.js';
import express from 'express';
import upload from '../middleware/multer.js';

const songRouter = express.Router();

// Route to handle song uploads with image and audio fields
songRouter.post('/add', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), addSong);

export default songRouter;
