import { imageModel } from "../models/imageModel.js";
import { uploadImage } from "../services/uploadImage.js";
import { deleteImage } from "../services/deleteImage.js";
import { dbExport } from "../services/dbExport.js";
import { buildUpdateData } from "../services/buildUpdateData.js";
import { errorHandler } from "../services/errorHandler.js";

export const imageController = {
    get: async (req, res) => {
        try {
            const images = await imageModel.get();
            res.status(200).json(images);
        } catch (error) {
            errorHandler(error, res);
        }
    },
    getById: async (req, res) => {
        const { id } = req.params;
        try {
            const image = await imageModel.getById(id);
            if (!image) {
                return res.status(404).json({ message: "Image not found" });
            }
            res.status(200).json(image);
        } catch (error) {
            errorHandler(error, res);
        }
    },
    create: async (req, res) => {
        if (!req.file) {
            return res.status(400).json({ message: "No file provided" });
        }

        const { title, alt, category } = req.body;
        if (!title || !alt) {
            return res.status(400).json({ message: "Fields missing" });
        }

        try {
            const cloudResult = await uploadImage(req.file.buffer, { title, alt, category });

            const optimizedUrl = cloudResult.secure_url.replace("/upload/", "/upload/f_auto,q_auto/");
            const mime_type = `${cloudResult.resource_type}/${cloudResult.format}`;
            const dimensions = `${cloudResult.width}x${cloudResult.height}`;

            const result = await imageModel.create({
                title,
                alt,
                image_url: optimizedUrl,
                public_id: cloudResult.public_id,
                file_size: cloudResult.bytes,
                mime_type,
                dimensions,
            });

            if (!result || result.affectedRows === 0) {
                return res.status(400).json({ message: "Image not created" });
            }

            res.status(201).json({
                message: "Image created successfully",
                imageId: result.insertId,
                title,
                alt,
                image_url: optimizedUrl,
                public_id: cloudResult.public_id,
                file_size: cloudResult.bytes,
                mime_type,
                dimensions,
            });
            dbExport();
        } catch (error) {
            errorHandler(error, res);
        }
    },
    update: async (req, res) => {
        const { id } = req.params;
        let updateData = buildUpdateData(req.body, ["title", "alt", "image_url", "public_id", "file_size", "mime_type", "dimensions"]);

        if (updateData.error) {
            return res.status(400).json({ message: updateData.error });
        }

        updateData = updateData.data;

        try {
            const result = await imageModel.update(id, updateData);
            if (!result || result.affectedRows === 0) {
                return res.status(404).json({ message: "Image not found or no changes" });
            }
            res.status(200).json({ message: "Image updated successfully", id, ...updateData });
            dbExport();
        } catch (error) {
            errorHandler(error, res);
        }
    },
    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const image = await imageModel.getById(id);
            if (!image) {
                return res.status(404).json({ message: "Image not found" });
            }

            await imageModel.delete(id);
            await deleteImage(image.public_id);

            res.status(200).json({ message: "Image deleted from DB and Cloudinary", id });
            dbExport();
        } catch (error) {
            errorHandler(error, res);
        }
    },
    getByPublicId: async (req, res) => {
        const { publicId } = req.params;
        try {
            const image = await imageModel.getByPublicId(publicId);
            if (!image) {
                return res.status(404).json({ message: "Image not found" });
            }
            res.status(200).json(image);
        } catch (error) {
            errorHandler(error, res);
        }
    },
};
