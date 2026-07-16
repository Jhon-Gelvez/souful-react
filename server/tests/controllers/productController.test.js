import { describe, it, expect, vi, beforeEach } from "vitest";

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

vi.mock("../../services/dbExport.js", () => ({
    dbExport: vi.fn(),
}));

vi.mock("../../services/buildUpdateData.js", () => ({
    buildUpdateData: vi.fn(),
}));

import { productController } from "../../controllers/productController.js";
import { productModel } from "../../models/productModel.js";
import { dbExport } from "../../services/dbExport.js";
import { buildUpdateData } from "../../services/buildUpdateData.js";

const mockRes = () => {
    const res = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
};

beforeEach(() => {
    vi.clearAllMocks();
});

describe("productController", () => {
    describe("get", () => {
        it("should return all products with status 200", async () => {
            const mockProducts = [{ id_product: 1, name: "Canvas", price: 50 }];
            productModel.get.mockResolvedValue(mockProducts);
            const req = {};
            const res = mockRes();

            await productController.get(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockProducts);
        });

        it("should return 500 on error", async () => {
            productModel.get.mockRejectedValue(new Error("DB error"));
            const req = {};
            const res = mockRes();

            await productController.get(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
        });
    });

    describe("getById", () => {
        it("should return a product by id", async () => {
            const mockProduct = { id_product: 1, name: "Canvas", price: 50 };
            productModel.getById.mockResolvedValue(mockProduct);
            const req = { params: { id: 1 } };
            const res = mockRes();

            await productController.getById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockProduct);
        });

        it("should return 404 if product not found", async () => {
            productModel.getById.mockResolvedValue(null);
            const req = { params: { id: 999 } };
            const res = mockRes();

            await productController.getById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Product not found" });
        });

        it("should return 500 on error", async () => {
            productModel.getById.mockRejectedValue(new Error("DB error"));
            const req = { params: { id: 1 } };
            const res = mockRes();

            await productController.getById(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
        });
    });

    describe("create", () => {
        it("should create a product and return 201", async () => {
            productModel.create.mockResolvedValue({ affectedRows: 1, insertId: 1 });
            const req = { body: { name: "Canvas", price: 50 } };
            const res = mockRes();

            await productController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: "Product created successfully",
                productId: 1,
                name: "Canvas",
                price: 50,
            });
            expect(dbExport).toHaveBeenCalled();
        });

        it("should return 400 if name is missing", async () => {
            const req = { body: { price: 50 } };
            const res = mockRes();

            await productController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "Name and price are required" });
        });

        it("should return 400 if price is missing", async () => {
            const req = { body: { name: "Canvas" } };
            const res = mockRes();

            await productController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "Name and price are required" });
        });

        it("should return 400 if affectedRows is 0", async () => {
            productModel.create.mockResolvedValue({ affectedRows: 0 });
            const req = { body: { name: "Canvas", price: 50 } };
            const res = mockRes();

            await productController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "Product not created" });
        });

        it("should return 500 on error", async () => {
            productModel.create.mockRejectedValue(new Error("DB error"));
            const req = { body: { name: "Canvas", price: 50 } };
            const res = mockRes();

            await productController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
        });
    });

    describe("update", () => {
        it("should update a product and return 201", async () => {
            buildUpdateData.mockReturnValue({ data: { name: "Updated" } });
            productModel.update.mockResolvedValue({ affectedRows: 1 });
            const req = { params: { id: 1 }, body: { name: "Updated" } };
            const res = mockRes();

            await productController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: "Product updated successfully",
                id: 1,
                name: "Updated",
            });
            expect(dbExport).toHaveBeenCalled();
        });

        it("should return 400 if no valid fields provided", async () => {
            buildUpdateData.mockReturnValue({ error: "At least one field must be provided for update" });
            const req = { params: { id: 1 }, body: {} };
            const res = mockRes();

            await productController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "At least one field must be provided for update" });
        });

        it("should return 404 if product not found", async () => {
            buildUpdateData.mockReturnValue({ data: { name: "Updated" } });
            productModel.update.mockResolvedValue({ affectedRows: 0 });
            const req = { params: { id: 999 }, body: { name: "Updated" } };
            const res = mockRes();

            await productController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Product not found or no changes" });
        });

        it("should return 500 on error", async () => {
            buildUpdateData.mockReturnValue({ data: { name: "Updated" } });
            productModel.update.mockRejectedValue(new Error("DB error"));
            const req = { params: { id: 1 }, body: { name: "Updated" } };
            const res = mockRes();

            await productController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
        });
    });

    describe("delete", () => {
        it("should delete a product and return 200", async () => {
            productModel.delete.mockResolvedValue({ affectedRows: 1 });
            const req = { params: { id: 1 } };
            const res = mockRes();

            await productController.delete(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "Product deleted successfully",
                id: 1,
            });
            expect(dbExport).toHaveBeenCalled();
        });

        it("should return 404 if product not found", async () => {
            productModel.delete.mockResolvedValue({ affectedRows: 0 });
            const req = { params: { id: 999 } };
            const res = mockRes();

            await productController.delete(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Product not found" });
        });

        it("should return 500 on error", async () => {
            productModel.delete.mockRejectedValue(new Error("DB error"));
            const req = { params: { id: 1 } };
            const res = mockRes();

            await productController.delete(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
        });
    });

    describe("getByName", () => {
        it("should return a product by name", async () => {
            const mockProduct = { id_product: 1, name: "Canvas", price: 50 };
            productModel.getByName.mockResolvedValue(mockProduct);
            const req = { params: { name: "Canvas" } };
            const res = mockRes();

            await productController.getByName(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockProduct);
        });

        it("should return 404 if product not found", async () => {
            productModel.getByName.mockResolvedValue(null);
            const req = { params: { name: "NotExists" } };
            const res = mockRes();

            await productController.getByName(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Product not found" });
        });

        it("should return 500 on error", async () => {
            productModel.getByName.mockRejectedValue(new Error("DB error"));
            const req = { params: { name: "Canvas" } };
            const res = mockRes();

            await productController.getByName(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
        });
    });
});
