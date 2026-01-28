import { configCloudinary } from '../config/cloudinary.js'

export const deleteImage = async (publicId) => {
  try {
    const result = await configCloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error('Error al eliminar en Cloudinary ', error);
  }
};
