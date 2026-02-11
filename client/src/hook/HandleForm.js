//  recibe datos sobre del formulario y los prepara para enviarlos a handleUploadFile()

import { useState } from "react";
import { handleUploadFile } from "./handleUploadFile";
import { createItem } from "../api/itemApi";


// le pasamos el archivo y los datos del input desde react y handleUploadFile se encarga del resto

// setea los datos para pasarlos al api en handleUploadFile y los retorna
export const HandleForm = () => {
    // 1. Estados para los textos
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        category_id: "",
        categoryName: "",
    });

    const [imageUrl, setImageUrl] = useState(null);

    // 2. Estado para el archivo físico (sin subir aún)
    const [selectedFile, setSelectedFile] = useState(null);

    // 3. Traemos la lógica de subida del hook
    const { uploadImage } = handleUploadFile();

    // aca capturo los datos
    // Dentro de HandleForm.js
    const handleFormChange = (e) => {
        const { name, value } = e.target;

        if (name === "category_id") {
            // Accedemos al texto del <option> que el usuario seleccionó
            const selectedText = e.target.options[e.target.selectedIndex].text;

            setFormData({
                ...formData,
                [name]: value, // Guarda el ID (ej: "1")
                categoryName: selectedText, // Guarda el Nombre (ej: "anime")
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
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
            // guardamos la url
            setImageUrl(cloudinaryData.optimized_url);

            // TODO
            // PASO B: Enviar todo a tu API Rest
            const bodyForDB = {
                name_product: cloudinaryData.context?.custom?.caption || formData.title,
                alt: cloudinaryData.context?.custom?.alt || formData.description,
                price: parseInt(formData.price),
                image_url: cloudinaryData.optimized_url,
                public_id: cloudinaryData.public_id,
                file_size: parseInt(cloudinaryData.bytes),
                mime_type: `${cloudinaryData.resource_type}/${cloudinaryData.format}`,
                dimensions: `${cloudinaryData.width}x${cloudinaryData.height}`,
                category_id: parseInt(formData.category_id),
            };

            // peticion a al api

            console.log(`Datos para enviar al backend ${JSON.stringify(bodyForDB)}`);

            // Llamamos a la función createItem 
            const dbResult = await createItem(bodyForDB);

            console.log("Respuesta de la DB:", dbResult);
            alert("¡Producto creado con éxito en Nube y DB!");
            
        } catch (error) {
            console.log(selectedFile, formData);

            console.error("Error en el proceso:", error);
        }
    };
    return { formData, selectedFile, imageUrl, handleSubmit, handleFileChange, handleFormChange };
};
