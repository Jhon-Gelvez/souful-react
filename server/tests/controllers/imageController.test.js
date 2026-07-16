import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../models/imageModel.js", () => ({
    imageModel: {
        get: vi.fn(),
        getById: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
        getByPublicId: vi.fn(),
    },
}));

vi.mock("../../services/deleteImage.js", () => ({
    deleteImage: vi.fn(),
}));

vi.mock("../../services/dbExport.js", () => ({
    dbExport: vi.fn(),
}));

vi.mock("../../services/buildUpdateData.js", () => ({
    buildUpdateData: vi.fn(),
}));

import { imageController } from "../../controllers/imageController.js";
import { imageModel } from "../../models/imageModel.js";
import { deleteImage } from "../../services/deleteImage.js";
import { dbExport } from "../../services/dbExport.js";
import { buildUpdateData } from "../../services/buildUpdateData.js";

const mockRes = () => {
    const res = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
};

const fullImageData = {
    title: "Test",
    alt: "test alt",
    image_url: "http://example.com/img.jpg",
    public_id: "abc123",
    file_size: 1024,
    mime_type: "image/jpeg",
    dimensions: "800x600",
};

beforeEach(() => {
    vi.clearAllMocks();
});

describe("imageController", () => {
    describe("get", () => {
        it("should return all images with status 200", async () => {
            const mockImages = [{ id_image: 1, title: "Test" }];
            imageModel.get.mockResolvedValue(mockImages);
            const req = {};
            const res = mockRes();

            await imageController.get(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockImages);
        });

        it("should return 500 on error", async () => {
            imageModel.get.mockRejectedValue(new Error("DB error"));
            const req = {};
            const res = mockRes();

            await imageController.get(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
        });
    });

    describe("getById", () => {
        it("should return an image by id", async () => {
            const mockImage = { id_image: 1, title: "Test" };
            imageModel.getById.mockResolvedValue(mockImage);
            const req = { params: { id: 1 } };
            const res = mockRes();

            await imageController.getById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockImage);
        });

        it("should return 404 if image not found", async () => {
            imageModel.getById.mockResolvedValue(null);
            const req = { params: { id: 999 } };
            const res = mockRes();

            await imageController.getById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Image not found" });
        });

        it("should return 500 on error", async () => {
            imageModel.getById.mockRejectedValue(new Error("DB error"));
            const req = { params: { id: 1 } };
            const res = mockRes();

            await imageController.getById(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
        });
    });

    describe("create", () => {
        it("should create an image and return 201", async () => {
            imageModel.create.mockResolvedValue({ affectedRows: 1, insertId: 1 });
            const req = { body: fullImageData };
            const res = mockRes();

            await imageController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: "Image created successfully",
                imageId: 1,
                ...fullImageData,
            });
            expect(dbExport).toHaveBeenCalled();
        });

        it("should return 400 if fields are missing", async () => {
            const req = { body: { title: "Test" } };
            const res = mockRes();

            await imageController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "Fields missing" });
        });

        it("should return 400 if affectedRows is 0", async () => {
            imageModel.create.mockResolvedValue({ affectedRows: 0 });
            const req = { body: fullImageData };
            const res = mockRes();

            await imageController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "Image not created" });
        });

        it("should return 500 on error", async () => {
            imageModel.create.mockRejectedValue(new Error("DB error"));
            const req = { body: fullImageData };
            const res = mockRes();

            await imageController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
        });
    });

    describe("update", () => {
        it("should update an image and return 200", async () => {
            buildUpdateData.mockReturnValue({ data: { title: "Updated" } });
            imageModel.update.mockResolvedValue({ affectedRows: 1 });
            const req = { params: { id: 1 }, body: { title: "Updated" } };
            const res = mockRes();

            await imageController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "Image updated successfully",
                id: 1,
                title: "Updated",
            });
            expect(dbExport).toHaveBeenCalled();
        });

        it("should return 400 if no valid fields provided", async () => {
            buildUpdateData.mockReturnValue({ error: "At least one field must be provided for update" });
            const req = { params: { id: 1 }, body: {} };
            const res = mockRes();

            await imageController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "At least one field must be provided for update" });
        });

        it("should return 404 if image not found", async () => {
            buildUpdateData.mockReturnValue({ data: { title: "Updated" } });
            imageModel.update.mockResolvedValue({ affectedRows: 0 });
            const req = { params: { id: 999 }, body: { title: "Updated" } };
            const res = mockRes();

            await imageController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Image not found or no changes" });
        });

        it("should return 500 on error", async () => {
            buildUpdateData.mockReturnValue({ data: { title: "Updated" } });
            imageModel.update.mockRejectedValue(new Error("DB error"));
            const req = { params: { id: 1 }, body: { title: "Updated" } };
            const res = mockRes();

            await imageController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
        });
    });

    describe("delete", () => {
        it("should delete image from DB and Cloudinary", async () => {
            imageModel.getById.mockResolvedValue({ id_image: 1, public_id: "abc123" });
            imageModel.delete.mockResolvedValue({ affectedRows: 1 });
            deleteImage.mockResolvedValue();
            const req = { params: { id: 1 } };
            const res = mockRes();

            await imageController.delete(req, res);

            expect(imageModel.delete).toHaveBeenCalledWith(1);
            expect(deleteImage).toHaveBeenCalledWith("abc123");
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "Image deleted from DB and Cloudinary", id: 1 });
            expect(dbExport).toHaveBeenCalled();
        });

        it("should return 404 if image not found", async () => {
            imageModel.getById.mockResolvedValue(null);
            const req = { params: { id: 999 } };
            const res = mockRes();

            await imageController.delete(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Image not found" });
        });

        it("should return 500 on error", async () => {
            imageModel.getById.mockRejectedValue(new Error("DB error"));
            const req = { params: { id: 1 } };
            const res = mockRes();

            await imageController.delete(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
        });
    });

    describe("getByPublicId", () => {
        it("should return an image by public id", async () => {
            const mockImage = { id_image: 1, public_id: "abc123" };
            imageModel.getByPublicId.mockResolvedValue(mockImage);
            const req = { params: { publicId: "abc123" } };
            const res = mockRes();

            await imageController.getByPublicId(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockImage);
        });

        it("should return 404 if image not found", async () => {
            imageModel.getByPublicId.mockResolvedValue(null);
            const req = { params: { publicId: "notfound" } };
            const res = mockRes();

            await imageController.getByPublicId(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Image not found" });
        });

        it("should return 500 on error", async () => {
            imageModel.getByPublicId.mockRejectedValue(new Error("DB error"));
            const req = { params: { publicId: "abc123" } };
            const res = mockRes();

            await imageController.getByPublicId(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
        });
    });
});
