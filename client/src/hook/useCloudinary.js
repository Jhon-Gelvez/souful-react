import { useState } from "react";

// poner /q_auto/f_auto despues de la /upload en la url entregada hara mas eficiente el peso de la img

export const useCloudinary = () => {
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [imageBeenUpload, setImageBeenUpload] = useState(false);

    const presetName = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

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
            setImageBeenUpload(true);
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, image, imageBeenUpload, uploadImage };
};