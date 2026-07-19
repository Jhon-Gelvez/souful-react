// TODO pasar category al imagesApi.create

import { handleUploadFile } from "./handleUploadFile.js";
import { productsApi } from "../api/productsApi.js";
import { productRecordsApi } from "../api/productRecordsApi.js";

export const handleForm = (categories = []) => {
    let formData = {
        title: "",
        description: "",
        price: "",
        category_id: "",
        category_name: "",
    };

    let imageUrl = null;
    let selectedFile = null;

    const { uploadImage } = handleUploadFile();

    const handleFormChange = (e) => {
        let { name, value } = e.target;
        if (name === "category_id") {
            const id = parseInt(value);
            const cat = categories.find((c) => c.id_category === id);
            formData = { ...formData, category_id: id, category_name: cat?.name || "" };
        } else {
            formData = { ...formData, [name]: value };
        }
    };

    const handleFileChange = (e) => {
        selectedFile = e.target.files[0];
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFile) return alert("Please select an image");

        try {
            const imageResult = await uploadImage(selectedFile, formData);

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

            alert("Product created successfully!");
        } catch (error) {
            console.error("Error in process:", error);
        }
    };

    return { formData, selectedFile, imageUrl, handleSubmit, handleFileChange, handleFormChange };
};
