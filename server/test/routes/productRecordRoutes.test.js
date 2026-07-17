import { vi, describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import express from "express";

vi.mock("../../models/productRecordModel.js", () => ({
    productRecordModel: {
        get: vi.fn(),
        getById: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
        getByCategory: vi.fn(),
        getByProduct: vi.fn(),
        getByActive: vi.fn(),
        getByInactive: vi.fn(),
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

import { productRecordModel } from "../../models/productRecordModel.js";
import { buildUpdateData } from "../../services/buildUpdateData.js";
import productRecordRoutes from "../../routes/productRecordRoutes.js";

const app = express();
app.use(express.json());
app.use(productRecordRoutes);

describe("ProductRecord Routes", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("GET /api/product-records/", () => {
        it("debería retornar 200", async () => {
            productRecordModel.get.mockResolvedValue([{ id_record: 1 }]);

            const res = await request(app).get("/api/product-records/");

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe("GET /api/product-records/:id", () => {
        it("debería retornar 200 con un registro", async () => {
            productRecordModel.getById.mockResolvedValue({ id_record: 1 });

            const res = await request(app).get("/api/product-records/1");

            expect(res.status).toBe(200);
        });

        it("debería retornar 404 si no existe", async () => {
            productRecordModel.getById.mockResolvedValue(null);

            const res = await request(app).get("/api/product-records/999");

            expect(res.status).toBe(404);
        });
    });

    describe("GET /api/product-records/active", () => {
        it("debería retornar 200", async () => {
            productRecordModel.getByActive.mockResolvedValue([{ id_record: 1, is_active: 1 }]);

            const res = await request(app).get("/api/product-records/active");

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe("GET /api/product-records/inactive", () => {
        it("debería retornar 200", async () => {
            productRecordModel.getByInactive.mockResolvedValue([{ id_record: 1, is_active: 0 }]);

            const res = await request(app).get("/api/product-records/inactive");

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe("GET /api/product-records/category/:categoryId", () => {
        it("debería retornar 200", async () => {
            productRecordModel.getByCategory.mockResolvedValue([{ id_record: 1 }]);

            const res = await request(app).get("/api/product-records/category/1");

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe("GET /api/product-records/product/:productId", () => {
        it("debería retornar 200", async () => {
            productRecordModel.getByProduct.mockResolvedValue([{ id_record: 1 }]);

            const res = await request(app).get("/api/product-records/product/1");

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe("POST /api/product-records/", () => {
        it("debería retornar 201 al crear", async () => {
            productRecordModel.create.mockResolvedValue({ affectedRows: 1, insertId: 1 });

            const res = await request(app)
                .post("/api/product-records/")
                .send({ id_product: 1, id_image: 1, id_category: 1, is_active: 1 });

            expect(res.status).toBe(201);
        });

        it("debería retornar 400 si faltan campos", async () => {
            const res = await request(app)
                .post("/api/product-records/")
                .send({ id_product: 1 });

            expect(res.status).toBe(400);
        });
    });

    describe("PATCH /api/product-records/:id", () => {
        it("debería retornar 200 al actualizar", async () => {
            buildUpdateData.mockReturnValue({ data: { is_active: 0 } });
            productRecordModel.update.mockResolvedValue({ affectedRows: 1 });

            const res = await request(app)
                .patch("/api/product-records/1")
                .send({ is_active: 0 });

            expect(res.status).toBe(200);
        });

        it("debería retornar 400 si no hay campos válidos", async () => {
            buildUpdateData.mockReturnValue({ error: "At least one field must be provided for update" });

            const res = await request(app)
                .patch("/api/product-records/1")
                .send({});

            expect(res.status).toBe(400);
        });
    });

    describe("DELETE /api/product-records/:id", () => {
        it("debería retornar 200 al eliminar", async () => {
            productRecordModel.delete.mockResolvedValue({ affectedRows: 1 });

            const res = await request(app).delete("/api/product-records/1");

            expect(res.status).toBe(200);
        });

        it("debería retornar 404 si no existe", async () => {
            productRecordModel.delete.mockResolvedValue({ affectedRows: 0 });

            const res = await request(app).delete("/api/product-records/999");

            expect(res.status).toBe(404);
        });
    });
});
