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

            let result = await response.json();
            console.log(result);
            let defaultUrl = result.secure_url;
            const optimizedUrl = defaultUrl.replace("/upload/", "/upload/f_auto,q_auto/");

            setImageUrl(optimizedUrl);
            setImageBeenUpload(true);

            return {
                ...result,
                optimized_url: optimizedUrl,
            };
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setLoading(false);
        }
    };

    return { uploadImage, loading, imageBeenUpload, imageUrl, alt };
};
// 3 / february / 2026 sube correctamente las tags,el title(caption),la description (alt)

// {title: 'urabe', description: 'img de urabe mikoto', price: '1000', category: 'anime', image: 'https://res.cloudinary.com/dnucajsxn/image/upload/f_auto,q_auto/v1770130089/g2ebzk3bqskknm5pyd9p.jpg'}
// category
// :
// "anime"
// description
// :
// "img de urabe mikoto"
// image
// :
// "https://res.cloudinary.com/dnucajsxn/image/upload/f_auto,q_auto/v1770130089/g2ebzk3bqskknm5pyd9p.jpg"
// price
// :
// "1000"
// title
// :
// "urabe"
// [[Prototype]]
// :
// Object
