const cloudinary = require('cloudinary');
const DataUri = require('datauri/parser');
const path = require('path');

exports.upload = async (files) => {
  try {
    const urls = [];
    let dtauri = new DataUri();
    console.log(dtauri);
    for (const file of files) {
      let dataUri = dtauri.format(path.extname(file.originalname), file.buffer);

      let final_file = dataUri.content;

      let image = await cloudinary.v2.uploader.upload_large(final_file);

      urls.push(image.secure_url);
    }

    return urls;
  } catch (error) {
    console.log(error);
  }
};
