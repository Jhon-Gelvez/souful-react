import { vi, describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import express from "express";

vi.mock("../../models/saleModel.js", () => ({
    saleModel: {
        get: vi.fn(),
        getById: vi.fn(),
        create: vi.fn(),
        delete: vi.fn(),
        getByUser: vi.fn(),
        getByProduct: vi.fn(),
    },
}));

vi.mock("../../services/errorHandler.js", () => ({
    errorHandler: vi.fn((error, res) => res.status(500).json({ message: "Error interno en el servidor" })),
}));

vi.mock("../../services/dbExport.js", () => ({
    dbExport: vi.fn(),
}));

import { saleModel } from "../../models/saleModel.js";
import saleRoutes from "../../routes/saleRoutes.js";

const app = express();
app.use(express.json());
app.use(saleRoutes);

describe("Sale Routes", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("GET /api/sales/", () => {
        it("debería retornar 200", async () => {
            saleModel.get.mockResolvedValue([{ id_sale: 1 }]);

            const res = await request(app).get("/api/sales/");

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe("GET /api/sales/:id", () => {
        it("debería retornar 200 con una venta", async () => {
            saleModel.getById.mockResolvedValue({ id_sale: 1 });

            const res = await request(app).get("/api/sales/1");

            expect(res.status).toBe(200);
        });

        it("debería retornar 404 si no existe", async () => {
            saleModel.getById.mockResolvedValue(null);

            const res = await request(app).get("/api/sales/999");

            expect(res.status).toBe(404);
        });
    });

    describe("GET /api/sales/user/:userId", () => {
        it("debería retornar 200 con ventas del usuario", async () => {
            saleModel.getByUser.mockResolvedValue([{ id_sale: 1 }]);

            const res = await request(app).get("/api/sales/user/1");

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe("GET /api/sales/product/:productId", () => {
        it("debería retornar 200 con ventas del producto", async () => {
            saleModel.getByProduct.mockResolvedValue([{ id_sale: 1 }]);

            const res = await request(app).get("/api/sales/product/1");

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe("POST /api/sales/", () => {
        it("debería retornar 201 al crear", async () => {
            saleModel.create.mockResolvedValue({ affectedRows: 1, insertId: 1 });

            const res = await request(app)
                .post("/api/sales/")
                .send({ id_user: 1, id_record: 1 });

            expect(res.status).toBe(201);
        });

        it("debería retornar 400 si faltan campos", async () => {
            const res = await request(app)
                .post("/api/sales/")
                .send({ id_user: 1 });

            expect(res.status).toBe(400);
        });
    });

    describe("DELETE /api/sales/:id", () => {
        it("debería retornar 200 al eliminar", async () => {
            saleModel.delete.mockResolvedValue({ affectedRows: 1 });

            const res = await request(app).delete("/api/sales/1");

            expect(res.status).toBe(200);
        });

        it("debería retornar 404 si no existe", async () => {
            saleModel.delete.mockResolvedValue({ affectedRows: 0 });

            const res = await request(app).delete("/api/sales/999");

            expect(res.status).toBe(404);
        });
    });
});
