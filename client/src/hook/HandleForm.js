//  recibe datos sobre del formulario y los prepara para enviarlos a handleUploadFile()

import { useState } from "react";
import { handleUploadFile } from "./handleUploadFile";

// le pasamos el archivo y los datos del input desde react y handleUploadFile se encarga del resto

// setea los datos para pasarlos al api en handleUploadFile y los retorna
export const HandleForm = () => {
    // 1. Estados para los textos
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
    });

    const [imageUrl, setImageUrl] = useState(null);

    // 2. Estado para el archivo físico (sin subir aún)
    const [selectedFile, setSelectedFile] = useState(null);

    // 3. Traemos la lógica de subida del hook
    const { uploadImage } = handleUploadFile();

    // aca capturo los datos
    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    // aca capturo el archivo
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) return alert("Por favor selecciona una imagen");

        // IMPORTANTE de aca obtenemos datos como el formato, el peso en bytes, el typo de archivo

        try {
            // PASO A: Subir imagen y obtener URL
            console.log("Subiendo imagen...");
            const cloudinaryData = await uploadImage(selectedFile, formData);

            // TODO
            // PASO B: Enviar todo a tu API Rest
            const bodyForDB = {
                name_product: cloudinaryData.context.custom.caption,
                alt: cloudinaryData.context.custom.alt, 
                price: parseInt(formData.price),
                image_url: cloudinaryData.optimized_url,
                public_id: cloudinaryData.public_id,
                file_size: parseInt(cloudinaryData.bytes),
                mime_type: `${cloudinaryData.resource_type}/${cloudinaryData.format}`,
                dimensions: `${cloudinaryData.width}x${cloudinaryData.height}`,
                // fix
                // solo toma la primera categoria del producto
                // toma el nombre que se pasa del form pero necesitamos el id
                category_id: `${cloudinaryData.tags[0]}`,
            };

            // peticion a al api

            console.log(`Datos para enviar al backend ${JSON.stringify(bodyForDB) }`);

            alert("¡Producto y metadata guardados!");
            // Aquí iría tu fetch('/api/products', { method: 'POST', ... })
        } catch (error) {
            console.error("Error en el proceso:", error);
        }
    };
    return { formData, selectedFile, imageUrl, handleSubmit, handleFileChange, handleFormChange };
};

// no se le esta pasando correctamente el file ni la MediaMetadata
