const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'uploads',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const upload = multer({ storage });

async function uploadImage(req) {
  try {
    if (!req.file) {
      throw new Error('No file uploaded');
    }
    const result = await cloudinary.uploader.upload(req.file.path);
    return result.secure_url;
  } catch (error) {
    console.error(error);
    throw new Error('Image upload failed');
  }
}

module.exports = { uploadImage };
