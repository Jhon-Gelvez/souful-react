// toma los datos que le pasen y los envia por el APIrest

import { useState } from "react";

// inputFile usa loading y imageBeenUpload para render algunas partes de la UI
// handleForm usa la funcion uploadImage(e)

export const handleUploadFile = () => {
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [imageBeenUpload, setImageBeenUpload] = useState(false);
    const [alt, setAlt] = useState("");

    const presetName = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    const uploadImage = async (file, metadata) => {
        // obtenemos el atl para la imagen render en el form
        setAlt(metadata.description);

        if (!metadata || !file) {
            throw new Error("categoria no encontrada");
        }
        const data = new FormData();
        // anadimos el archivo
        data.append("file", file);
        // aque instancia de Cloudinary lo queremos subir
        data.append("upload_preset", presetName);

        const contextData = `alt=${metadata.description}|caption=${metadata.title}`;
        data.append("context", contextData);

        data.append("tags", `${metadata.category}`);

        setLoading(true);

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: "POST",
                body: data,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error?.message || "Error al subir a Cloudinary");
            }

            console.log("este es el resultado de la peticion ", result);
            setImageUrl(result.secure_url.replace("/upload/", "/upload/f_auto,q_auto/"));
            setImageBeenUpload(true);
            // Retornamos la URL optimizada automáticamente
            return result.secure_url.replace("/upload/", "/upload/f_auto,q_auto/");
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setLoading(false);
        }
    };

    return { uploadImage, loading, imageBeenUpload, imageUrl, alt };
};
