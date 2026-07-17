import { vi, describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import express from "express";

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
    errorHandler: vi.fn((error, res) => res.status(500).json({ message: "Error interno en el servidor" })),
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
import { buildUpdateData } from "../../services/buildUpdateData.js";
import imageRoutes from "../../routes/imageRoutes.js";

const app = express();
app.use(express.json());
app.use(imageRoutes);

describe("Image Routes", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("GET /api/images/", () => {
        it("debería retornar 200", async () => {
            imageModel.get.mockResolvedValue([{ id_image: 1, title: "Test" }]);

            const res = await request(app).get("/api/images/");

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe("GET /api/images/:id", () => {
        it("debería retornar 200 con una imagen", async () => {
            imageModel.getById.mockResolvedValue({ id_image: 1, title: "Test" });

            const res = await request(app).get("/api/images/1");

            expect(res.status).toBe(200);
        });

        it("debería retornar 404 si no existe", async () => {
            imageModel.getById.mockResolvedValue(null);

            const res = await request(app).get("/api/images/999");

            expect(res.status).toBe(404);
        });
    });

    describe("GET /api/images/public/:publicId", () => {
        it("debería retornar 200", async () => {
            imageModel.getByPublicId.mockResolvedValue({ id_image: 1, public_id: "abc123" });

            const res = await request(app).get("/api/images/public/abc123");

            expect(res.status).toBe(200);
        });

        it("debería retornar 404 si no existe", async () => {
            imageModel.getByPublicId.mockResolvedValue(null);

            const res = await request(app).get("/api/images/public/noexiste");

            expect(res.status).toBe(404);
        });
    });

    describe("POST /api/images/", () => {
        it("debería retornar 201 al crear", async () => {
            imageModel.create.mockResolvedValue({ affectedRows: 1, insertId: 1 });

            const res = await request(app)
                .post("/api/images/")
                .send({ title: "Test", alt: "test", image_url: "url", public_id: "pid", file_size: 100, mime_type: "image/png", dimensions: "100x100" });

            expect(res.status).toBe(201);
        });

        it("debería retornar 400 si faltan campos", async () => {
            const res = await request(app)
                .post("/api/images/")
                .send({ title: "Test" });

            expect(res.status).toBe(400);
        });
    });

    describe("PATCH /api/images/:id", () => {
        it("debería retornar 200 al actualizar", async () => {
            buildUpdateData.mockReturnValue({ data: { title: "Updated" } });
            imageModel.update.mockResolvedValue({ affectedRows: 1 });

            const res = await request(app)
                .patch("/api/images/1")
                .send({ title: "Updated" });

            expect(res.status).toBe(200);
        });

        it("debería retornar 400 si no hay campos válidos", async () => {
            buildUpdateData.mockReturnValue({ error: "At least one field must be provided for update" });

            const res = await request(app)
                .patch("/api/images/1")
                .send({});

            expect(res.status).toBe(400);
        });
    });

    describe("DELETE /api/images/:id", () => {
        it("debería retornar 200 al eliminar", async () => {
            imageModel.getById.mockResolvedValue({ id_image: 1, public_id: "pid" });
            imageModel.delete.mockResolvedValue({ affectedRows: 1 });

            const res = await request(app).delete("/api/images/1");

            expect(res.status).toBe(200);
        });

        it("debería retornar 404 si no existe", async () => {
            imageModel.getById.mockResolvedValue(null);

            const res = await request(app).delete("/api/images/999");

            expect(res.status).toBe(404);
        });
    });
});
