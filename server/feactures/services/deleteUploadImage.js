// Require the cloudinary library
const cloudinary = require("cloudinary").v2;
require('dotenv').config()

// Return "https" URLs by setting secure: true
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Asegúrate que el nombre coincida con el .env
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

const deleteImage = async (publicId) => {
    cloudinary.uploader.destroy(publicId).then((result) => console.log(result));
};

function main() {
    const publicId = "ulqemaywgjmeof57225x";
    deleteImage(publicId);
}

main()
