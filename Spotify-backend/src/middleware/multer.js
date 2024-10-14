import multer from 'multer';
import path from 'path';

// Define the storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination for uploads
    cb(null, 'uploads/'); // Ensure the 'uploads' folder exists
  },
  filename: function (req, file, cb) {
    // Create a unique filename for the uploaded files
    cb(null, Date.now() + path.extname(file.originalname)); // Add the file extension
  },
});

// Multer upload configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 50 }, // Limit file size to 50MB
  fileFilter: function (req, file, cb) {
    // Accept only image and audio files
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('audio/')) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error('Unsupported file type'), false); // Reject other file types
    }
  },
}).fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]);
songRouter.post('/add', (req, res, next) => {
    upload(req, res, function (err) {
      if (err) {
        console.log('Multer error:', err); // Log any multer errors
        return res.status(400).send(err.message);
      }
      next();
    });
  }, addSong);

// Export the upload middleware
export default upload;
