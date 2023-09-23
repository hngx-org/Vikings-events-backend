const cloudinary = require('cloudinary');
const DataUri = require('datauri/parser');
const path = require('path');

exports.upload = async (files) => {
  try {
    const urls = [];
    const dtauri = new DataUri();
    console.log(dtauri);
    for (const file of files) {
      const dataUri = dtauri.format(path.extname(file.originalname), file.buffer);

      const final_file = dataUri.content;

      const image = await cloudinary.v2.uploader.upload_large(final_file);

      urls.push(image.secure_url);
    }

    return urls;
  } catch (error) {
    console.log(error);
  }
};
