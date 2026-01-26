import { useState } from "react";

// poner /q_auto/f_auto despues de la /upload en la url entregada hara mas eficiente el peso de la img

export const useCloudinary = () => {
    const [image, setImage] = useState(""); //12 Creamos estado local que guarde la url de la imagen subida
    const [loading, setLoading] = useState(false); //7 Creamos un estado local con valor incial boolean "false" para saber si la imagen esta cargando.
    const [imageBeenUpload, setImageBeenUpload] = useState(false);

    const presetName = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    // Añadimos los setters como parámetros
    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", presetName);

        setLoading(true);

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: "POST",
                body: data,
            });

            const file = await response.json();
            setImage(file.secure_url);
            setLoading(false);
            setImageBeenUpload(true);
            return file.secure_url; // Es buena práctica retornar la URL
        } catch (error) {
            console.error("Error uploading image:", error);
            setLoading(false);
            throw error;
        }
        return { loading, image, imageBeenUpload , uploadImage};
    };
};
