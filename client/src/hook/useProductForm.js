import { useState } from "react";
import { productsApi } from "../api/productsApi.js";
import { productRecordsApi } from "../api/productRecordsApi.js";
import { imagesApi } from "../api/imagesApi.js";

const INITIAL_FORM = { title: "", description: "", price: "", category_id: "" };

export const useProductForm = (categories = [], onNotification) => {
    const [formData, setFormData] = useState({ ...INITIAL_FORM });
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [uploading, setUploading] = useState(false);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const resetForm = () => {
        setFormData({ ...INITIAL_FORM });
        setSelectedFile(null);
        setPreviewUrl("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            if (onNotification) onNotification({ message: "Please select an image", type: "error" });
            return;
        }

        setUploading(true);
        try {
            const uploadData = new FormData();
            uploadData.append("file", selectedFile);
            uploadData.append("title", formData.title);
            uploadData.append("alt", formData.description);
            const cat = categories.find((c) => c.id_category === parseInt(formData.category_id));
            uploadData.append("category", cat?.name || "");

            const imageResult = await imagesApi.create(uploadData);
            if (typeof imageResult === "string" || imageResult?.error) {
                throw new Error(imageResult.message || imageResult || "Error uploading image");
            }

            const productResult = await productsApi.create({
                name: formData.title,
                price: parseInt(formData.price),
            });

            await productRecordsApi.create({
                id_product: productResult.productId,
                id_image: imageResult.imageId,
                id_category: parseInt(formData.category_id),
                is_active: 1,
            });

            resetForm();
            if (onNotification) onNotification({ message: "Product created successfully!", type: "success" });
        } catch (error) {
            console.error("Error in process:", error);
            if (onNotification) onNotification({ message: "Error creating product: " + error.message, type: "error" });
        } finally {
            setUploading(false);
        }
    };

    return { formData, previewUrl, uploading, handleFormChange, handleFileChange, handleSubmit, resetForm };
};
