import { cloudinary } from "../config/cloudinary.js";

export const deleteImage = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        console.log("Respuesta de Cloudinary:", result);
        return result;
    } catch (error) {
        console.error("Detalle técnico del error en Cloudinary:", error);
        throw new Error("Error al eliminar en Cloudinary ", error);
    }
};
