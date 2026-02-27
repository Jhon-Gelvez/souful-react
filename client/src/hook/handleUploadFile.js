// toma los datos que le pasen y los envia por el APIrest

// inputFile usa loading y imageBeenUpload para render algunas partes de la UI
// handleForm usa la funcion uploadImage(e)

export const handleUploadFile = () => {
    // Variables de estado (en JS puro no disparan re-renders automáticos)
    let imageUrl = "";
    let loading = false;
    let imageBeenUpload = false;
    let alt = "";

    // Mantenemos la compatibilidad con Vite para variables de entorno
    const presetName = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    const uploadImage = async (file, metadata) => {
        // obtenemos el alt para la imagen render en el form
        alt = metadata.description;

        if (!metadata || !file) {
            throw new Error("categoria no encontrada");
        }
        
        const data = new FormData();
        // añadimos el archivo
        data.append("file", file);
        // a que instancia de Cloudinary lo queremos subir
        data.append("upload_preset", presetName);

        const contextData = `alt=${metadata.description}|caption=${metadata.title}`;
        data.append("context", contextData);

        // nota: en tu código original usabas metadata.category, 
        // asegúrate que el objeto que pases tenga esa propiedad o cámbialo a categoryName
        data.append("tags", `${metadata.categoryName || metadata.category}`);

        loading = true;
        console.log("Cargando..."); // Feedback manual

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: "POST",
                body: data,
            });

            if (!response.ok) throw new Error("Error en la subida a Cloudinary");

            let result = await response.json();
            console.log("Resultado Cloudinary:", result);
            
            let defaultUrl = result.secure_url;
            const optimizedUrl = defaultUrl.replace("/upload/", "/upload/f_auto,q_auto/");

            imageUrl = optimizedUrl;
            imageBeenUpload = true;

            return {
                ...result,
                optimized_url: optimizedUrl,
            };
        } catch (error) {
            console.error("Error uploading image:", error);
            throw error;
        } finally {
            loading = false;
            console.log("Carga finalizada.");
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
