import { useState } from "react";

// poner /q_auto/f_auto despues de la /upload en la url entregada hara mas eficiente el peso de la img

// inputFile usa loading y imageBeenUpload para render algunas partes de la UI

// handleForm usa la funcion uploadImage(e)

export const handleUploadFile = () => {
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [imageBeenUpload, setImageBeenUpload] = useState(false);

    const presetName = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    const uploadImage = async (file, metadata) => {
        const files = file.target.files;

        if (!metadata || !files) {
            throw new Error("categoria no encontrada");
        }
        const data = new FormData();
        // anadimos el archivo
        data.append("file", files[0]);
        // aque instancia de Cloudinary lo queremos subir
        data.append("upload_preset", presetName);

        // Cloudinary permite enviar "context" como metadatos clave=valor
        // Formato: "key1=value1|key2=value2"

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
            console.log(result);
            console.log(imageUrl);
            setImageUrl(result.secure_url);
            setImageBeenUpload(true);
            // Retornamos la URL optimizada automáticamente
            return result.secure_url.replace("/upload/", "/upload/f_auto,q_auto/");
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setLoading(false);
        }
    };

    return { uploadImage, loading, imageBeenUpload };
};

// cloudinary.v2.uploader.upload("boots.jpg", { context: "caption=New" }).then((result) => console.log(result));
