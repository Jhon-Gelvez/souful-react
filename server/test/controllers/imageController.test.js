import { vi, describe, it, expect, beforeEach } from "vitest";

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

vi.mock("../../services/errorHandler.js", () => ({
    errorHandler: vi.fn(),
}));

vi.mock("../../services/dbExport.js", () => ({
    dbExport: vi.fn(),
}));

vi.mock("../../services/deleteImage.js", () => ({
    deleteImage: vi.fn(),
}));

vi.mock("../../services/buildUpdateData.js", () => ({
    buildUpdateData: vi.fn(),
}));

import { imageModel } from "../../models/imageModel.js";
import { imageController } from "../../controllers/imageController.js";
import { errorHandler } from "../../services/errorHandler.js";
import { buildUpdateData } from "../../services/buildUpdateData.js";
import { deleteImage } from "../../services/deleteImage.js";

describe("imageController", () => {
    let req, res;

    beforeEach(() => {
        vi.clearAllMocks();
        req = { params: {}, body: {} };
        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
    });

    describe("get", () => {
        it("debería retornar 200 con imágenes", async () => {
            const mock = [{ id_image: 1, title: "Test" }];
            imageModel.get.mockResolvedValue(mock);

            await imageController.get(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mock);
        });

        it("debería llamar errorHandler en error", async () => {
            const error = new Error("DB error");
            imageModel.get.mockRejectedValue(error);

            await imageController.get(req, res);

            expect(errorHandler).toHaveBeenCalledWith(error, res);
        });
    });

    describe("getById", () => {
        it("debería retornar 200 con la imagen", async () => {
            req.params.id = 1;
            const mock = { id_image: 1, title: "Test" };
            imageModel.getById.mockResolvedValue(mock);

            await imageController.getById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
        });

        it("debería retornar 404 si no existe", async () => {
            req.params.id = 999;
            imageModel.getById.mockResolvedValue(null);

            await imageController.getById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
        });

        it("debería llamar errorHandler en error", async () => {
            req.params.id = 1;
            const error = new Error("DB error");
            imageModel.getById.mockRejectedValue(error);

            await imageController.getById(req, res);

            expect(errorHandler).toHaveBeenCalledWith(error, res);
        });
    });

    describe("create", () => {
        it("debería retornar 201 al crear", async () => {
            req.body = { title: "Test", alt: "test", image_url: "url", public_id: "pid", file_size: 100, mime_type: "image/png", dimensions: "100x100" };
            const mock = { affectedRows: 1, insertId: 1 };
            imageModel.create.mockResolvedValue(mock);

            await imageController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
        });

        it("debería retornar 400 si faltan campos", async () => {
            req.body = { title: "Test" };

            await imageController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "Fields missing" });
        });

        it("debería llamar errorHandler en error", async () => {
            req.body = { title: "Test", alt: "test", image_url: "url", public_id: "pid", file_size: 100, mime_type: "image/png", dimensions: "100x100" };
            const error = new Error("DB error");
            imageModel.create.mockRejectedValue(error);

            await imageController.create(req, res);

            expect(errorHandler).toHaveBeenCalledWith(error, res);
        });
    });

    describe("update", () => {
        it("debería retornar 200 al actualizar", async () => {
            req.params.id = 1;
            req.body = { title: "Updated" };
            buildUpdateData.mockReturnValue({ data: { title: "Updated" } });
            imageModel.update.mockResolvedValue({ affectedRows: 1 });

            await imageController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
        });

        it("debería retornar 400 si buildUpdateData retorna error", async () => {
            req.params.id = 1;
            req.body = {};
            buildUpdateData.mockReturnValue({ error: "At least one field must be provided for update" });

            await imageController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
        });

        it("debería llamar errorHandler en error", async () => {
            req.params.id = 1;
            req.body = { title: "Updated" };
            buildUpdateData.mockReturnValue({ data: { title: "Updated" } });
            const error = new Error("DB error");
            imageModel.update.mockRejectedValue(error);

            await imageController.update(req, res);

            expect(errorHandler).toHaveBeenCalledWith(error, res);
        });
    });

    describe("delete", () => {
        it("debería retornar 200 al eliminar", async () => {
            req.params.id = 1;
            imageModel.getById.mockResolvedValue({ id_image: 1, public_id: "pid" });
            imageModel.delete.mockResolvedValue({ affectedRows: 1 });
            deleteImage.mockResolvedValue();

            await imageController.delete(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(deleteImage).toHaveBeenCalledWith("pid");
        });

        it("debería retornar 404 si no existe", async () => {
            req.params.id = 999;
            imageModel.getById.mockResolvedValue(null);

            await imageController.delete(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
        });

        it("debería llamar errorHandler en error", async () => {
            req.params.id = 1;
            const error = new Error("DB error");
            imageModel.getById.mockRejectedValue(error);

            await imageController.delete(req, res);

            expect(errorHandler).toHaveBeenCalledWith(error, res);
        });
    });

    describe("getByPublicId", () => {
        it("debería retornar 200 con la imagen", async () => {
            req.params.publicId = "abc123";
            const mock = { id_image: 1, public_id: "abc123" };
            imageModel.getByPublicId.mockResolvedValue(mock);

            await imageController.getByPublicId(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
        });

        it("debería retornar 404 si no existe", async () => {
            req.params.publicId = "noexiste";
            imageModel.getByPublicId.mockResolvedValue(null);

            await imageController.getByPublicId(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
        });

        it("debería llamar errorHandler en error", async () => {
            req.params.publicId = "abc123";
            const error = new Error("DB error");
            imageModel.getByPublicId.mockRejectedValue(error);

            await imageController.getByPublicId(req, res);

            expect(errorHandler).toHaveBeenCalledWith(error, res);
        });
    });
});
