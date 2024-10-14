import { v2 as cloudinary } from "cloudinary";
import songModel from "../models/songModel.js";

const addSong = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Request files:", req.files); // Debugging: Log the files object

    // Check if files are present
    if (!req.files || !req.files.audio || !req.files.image) {
      return res
        .status(400)
        .json({ message: "Audio and image files are required" });
    }
    const { name, desc, album } = req.body;
    const audioFile = req.files.audio[0];
    const imageFile = req.files.image[0];

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    // Upload audio to Cloudinary
    const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
      resource_type: "video",
    });

    // Save song data in the database
    const newSong = new songModel({
      name,
      desc: desc,
      album,
      imageUrl: imageUpload.secure_url,
      audioUrl: audioUpload.secure_url,
    });

    console.log(name, desc, album, audioUpload, imageUpload);
    await newSong.save();

    res.status(200).json({ message: "Song uploaded successfully", newSong });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Error uploading song", error: error.message });
  }
};

const listSong = async (req, res) => {
  // You can implement this to list the songs stored in the database
};

export { addSong, listSong };
