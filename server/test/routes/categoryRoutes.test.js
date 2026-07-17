import { vi, describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import express from "express";

vi.mock("../../models/categoryModel.js", () => ({
    categoryModel: {
        get: vi.fn(),
        getById: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
    },
}));

vi.mock("../../services/errorHandler.js", () => ({
    errorHandler: vi.fn((error, res) => res.status(500).json({ message: "Error interno en el servidor" })),
}));

vi.mock("../../services/dbExport.js", () => ({
    dbExport: vi.fn(),
}));

import { categoryModel } from "../../models/categoryModel.js";
import categoryRoutes from "../../routes/categoryRoutes.js";

const app = express();
app.use(express.json());
app.use(categoryRoutes);

describe("Category Routes", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("GET /api/categories/", () => {
        it("debería retornar 200", async () => {
            categoryModel.get.mockResolvedValue([{ id_category: 1, name: "Test" }]);

            const res = await request(app).get("/api/categories/");

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe("GET /api/categories/:id", () => {
        it("debería retornar 200 con una categoría", async () => {
            categoryModel.getById.mockResolvedValue({ id_category: 1, name: "Test" });

            const res = await request(app).get("/api/categories/1");

            expect(res.status).toBe(200);
        });

        it("debería retornar 404 si no existe", async () => {
            categoryModel.getById.mockResolvedValue(null);

            const res = await request(app).get("/api/categories/999");

            expect(res.status).toBe(404);
        });
    });

    describe("POST /api/categories/", () => {
        it("debería retornar 201 al crear", async () => {
            categoryModel.create.mockResolvedValue({ affectedRows: 1, insertId: 1 });

            const res = await request(app)
                .post("/api/categories/")
                .send({ name: "Nueva" });

            expect(res.status).toBe(201);
        });

        it("debería retornar 400 si falta name", async () => {
            const res = await request(app)
                .post("/api/categories/")
                .send({});

            expect(res.status).toBe(400);
        });
    });

    describe("PATCH /api/categories/:id", () => {
        it("debería retornar 200 al actualizar", async () => {
            categoryModel.update.mockResolvedValue({ affectedRows: 1 });

            const res = await request(app)
                .patch("/api/categories/1")
                .send({ name: "Actualizada" });

            expect(res.status).toBe(200);
        });

        it("debería retornar 400 si falta name", async () => {
            const res = await request(app)
                .patch("/api/categories/1")
                .send({});

            expect(res.status).toBe(400);
        });
    });

    describe("DELETE /api/categories/:id", () => {
        it("debería retornar 200 al eliminar", async () => {
            categoryModel.delete.mockResolvedValue({ affectedRows: 1 });

            const res = await request(app).delete("/api/categories/1");

            expect(res.status).toBe(200);
        });

        it("debería retornar 404 si no existe", async () => {
            categoryModel.delete.mockResolvedValue({ affectedRows: 0 });

            const res = await request(app).delete("/api/categories/999");

            expect(res.status).toBe(404);
        });
    });
});
