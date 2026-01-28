// Require the cloudinary library
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Return "https" URLs by setting secure: true
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Asegúrate que el nombre coincida con el .env
    api_key:    process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

/////////////////////////
// Uploads an image file
/////////////////////////
const uploadImage = async (imagePath) => {
    // Use the uploaded file's name as the asset's public ID and
    // allow overwriting the asset with new versions
    const options = {
        use_filename: false,
        unique_filename: false,
        overwrite: false,
    };

    try {
        // Upload the image
        const result = await cloudinary.uploader.upload(imagePath, options);
        console.log("//////////");
        console.log(result);
        console.log("//////////");
        return result.public_id;
    } catch (error) {
        console.error(error);
    }
};

/////////////////////////////////////
// Gets details of an uploaded image
/////////////////////////////////////
const getAssetInfo = async (publicId) => {
    // Return colors in the response
    const options = {
        colors: true,
    };

    try {
        // Get details about the asset
        const result = await cloudinary.api.resource(publicId, options);
        console.log(result);
        return result.colors;
    } catch (error) {
        console.error(error);
    }
};

//////////////////////////////////////////////////////////////
// Creates an HTML image tag with a transformation that
// results in a circular thumbnail crop of the image
// focused on the faces, applying an outline of the
// first color, and setting a background of the second color.
//////////////////////////////////////////////////////////////
const createImageTag = (publicId, ...colors) => {
    // Set the effect color and background color
    const [effectColor, backgroundColor] = colors;

    // Create an image tag with transformations applied to the src URL
    let imageTag = cloudinary.image(publicId, {
        transformation: [{ width: 250, height: 250, gravity: "faces", crop: "thumb" }, { radius: "max" }, { effect: "outline:10", color: effectColor }, { background: backgroundColor }],
    });

    return imageTag;
};

function main() {
    //////////////////
    //
    // Main function
    //
    //////////////////
    (async () => {

        let array = ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5h_VloLfpxUwUn1X8OCh9ofMqbflckcWH_RmPBR0lYoOVJqLpgkHZZzAY7Lf_h5Lp2IN9YMzsl7OExTaAxhjUQgkqLwTmWkGFuSUG8vk&s=10","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9OdSZNyHd7mO7aVs2W37eXtveQPsS5uTyZ6X9UmZ8wpsDZR93dGNEK6tjtnSvms0KoEnWT9LpLUK8FLANIRdYXMdEvfztPRft0f_zdxo&s=10","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjqdykraMpVdcZbhOGyINO6LZ4rW4EE_3JfnYA14ttXAchjtazZXvCj5U2Ow0mBREXbbL1lSJFg-EkyLhmCnW1BojR5wnxlbLHPBk6Og&s=10","https://down-co.img.susercontent.com/file/sg-11134202-7rdvc-lz0mspa9of3o5a"]

 

        // Set the image to upload
        const imagePath = array[3];

        // Upload the image
        const publicId = await uploadImage(imagePath);

        // Get the colors in the image
        const colors = await getAssetInfo(publicId);

        // Create an image tag, using two of the colors in a transformation
        const imageTag = await createImageTag(publicId, colors[0][0], colors[1][0]);

        // Log the image tag to the console
        console.log(imageTag);
    })();
}
main();
