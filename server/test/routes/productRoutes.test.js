import { vi, describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import express from "express";

vi.mock("../../models/productModel.js", () => ({
    productModel: {
        get: vi.fn(),
        getById: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
        getByName: vi.fn(),
    },
}));

vi.mock("../../services/errorHandler.js", () => ({
    errorHandler: vi.fn((error, res) => res.status(500).json({ message: "Error interno en el servidor" })),
}));

vi.mock("../../services/dbExport.js", () => ({
    dbExport: vi.fn(),
}));

vi.mock("../../services/buildUpdateData.js", () => ({
    buildUpdateData: vi.fn(),
}));

import { productModel } from "../../models/productModel.js";
import { buildUpdateData } from "../../services/buildUpdateData.js";
import productRoutes from "../../routes/productRoutes.js";

const app = express();
app.use(express.json());
app.use(productRoutes);

describe("Product Routes", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("GET /api/products/", () => {
        it("debería retornar 200", async () => {
            productModel.get.mockResolvedValue([{ id_product: 1, name: "Test" }]);

            const res = await request(app).get("/api/products/");

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe("GET /api/products/:id", () => {
        it("debería retornar 200 con un producto", async () => {
            productModel.getById.mockResolvedValue({ id_product: 1, name: "Test" });

            const res = await request(app).get("/api/products/1");

            expect(res.status).toBe(200);
            expect(res.body.name).toBe("Test");
        });

        it("debería retornar 404 si no existe", async () => {
            productModel.getById.mockResolvedValue(null);

            const res = await request(app).get("/api/products/999");

            expect(res.status).toBe(404);
        });
    });

    describe("GET /api/products/name/:name", () => {
        it("debería retornar 200 con un producto", async () => {
            productModel.getByName.mockResolvedValue({ id_product: 1, name: "Test" });

            const res = await request(app).get("/api/products/name/Test");

            expect(res.status).toBe(200);
        });

        it("debería retornar 404 si no existe", async () => {
            productModel.getByName.mockResolvedValue(null);

            const res = await request(app).get("/api/products/name/Inexistente");

            expect(res.status).toBe(404);
        });
    });

    describe("POST /api/products/", () => {
        it("debería retornar 201 al crear", async () => {
            productModel.create.mockResolvedValue({ affectedRows: 1, insertId: 1 });

            const res = await request(app)
                .post("/api/products/")
                .send({ name: "Test", price: 10 });

            expect(res.status).toBe(201);
            expect(res.body.message).toBe("Product created successfully");
        });

        it("debería retornar 400 si faltan campos", async () => {
            const res = await request(app)
                .post("/api/products/")
                .send({ name: "Test" });

            expect(res.status).toBe(400);
        });
    });

    describe("PATCH /api/products/:id", () => {
        it("debería retornar 201 al actualizar", async () => {
            buildUpdateData.mockReturnValue({ data: { name: "Updated" } });
            productModel.update.mockResolvedValue({ affectedRows: 1 });

            const res = await request(app)
                .patch("/api/products/1")
                .send({ name: "Updated" });

            expect(res.status).toBe(201);
        });

        it("debería retornar 400 si no hay campos válidos", async () => {
            buildUpdateData.mockReturnValue({ error: "At least one field must be provided for update" });

            const res = await request(app)
                .patch("/api/products/1")
                .send({});

            expect(res.status).toBe(400);
        });
    });

    describe("DELETE /api/products/:id", () => {
        it("debería retornar 200 al eliminar", async () => {
            productModel.delete.mockResolvedValue({ affectedRows: 1 });

            const res = await request(app).delete("/api/products/1");

            expect(res.status).toBe(200);
            expect(res.body.message).toBe("Product deleted successfully");
        });

        it("debería retornar 404 si no existe", async () => {
            productModel.delete.mockResolvedValue({ affectedRows: 0 });

            const res = await request(app).delete("/api/products/999");

            expect(res.status).toBe(404);
        });
    });
});
