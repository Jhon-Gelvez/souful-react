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
            const imageUrl = await uploadImage(selectedFile, {
                title: formData.title,
                description: formData.description,
                category: formData.category,
            });

            // PASO B: Enviar todo a tu API Rest
            const finalData = { ...formData, image: imageUrl };
            console.log("Enviando al backend (no implementado):", finalData);
            alert("¡Producto y metadata guardados!");
            // Aquí iría tu fetch('/api/products', { method: 'POST', ... })
        } catch (error) {
            console.error("Error en el proceso:", error);
        }
    };
    return { formData, selectedFile, imageUrl, handleSubmit, handleFileChange, handleFormChange };
};

// no se le esta pasando correctamente el file ni la MediaMetadata
