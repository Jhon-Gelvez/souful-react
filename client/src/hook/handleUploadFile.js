import { imagesApi } from "../api/imagesApi.js";

export const handleUploadFile = () => {
    let loading = false;
    let imageBeenUpload = false;
    let imageUrl = "";

    const uploadImage = async (file, metadata) => {
        if (!file || !metadata) {
            throw new Error("File and metadata are required");
        }

        const data = new FormData();
        data.append("file", file);
        data.append("title", metadata.title || "");
        data.append("alt", metadata.description || "");
        data.append("category", metadata.category_name || "");

        loading = true;

        try {
            const response = await imagesApi.create(data);

            if (typeof response === "string" || response.error) {
                throw new Error(response.message || response || "Error subiendo imagen");
            }

            imageUrl = response.image_url;
            imageBeenUpload = true;

            return response;
        } catch (error) {
            console.error("Error uploading image:", error);
            throw error;
        } finally {
            loading = false;
        }
    };

    return { uploadImage, loading, imageBeenUpload, imageUrl };
};
