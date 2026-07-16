import { describe, it, expect, vi, beforeEach } from "vitest";

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

vi.mock("../../services/dbExport.js", () => ({
    dbExport: vi.fn(),
}));

import { saleController } from "../../controllers/saleController.js";
import { saleModel } from "../../models/saleModel.js";
import { dbExport } from "../../services/dbExport.js";

const mockRes = () => {
    const res = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
};

beforeEach(() => {
    vi.clearAllMocks();
});

describe("saleController", () => {
    describe("get", () => {
        it("should return all sales with status 200", async () => {
            const mockSales = [{ id_sale: 1, id_user: 1 }];
            saleModel.get.mockResolvedValue(mockSales);
            const req = {};
            const res = mockRes();

            await saleController.get(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockSales);
        });

        it("should return 500 on error", async () => {
            saleModel.get.mockRejectedValue(new Error("DB error"));
            const req = {};
            const res = mockRes();

            await saleController.get(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
        });
    });

    describe("getById", () => {
        it("should return a sale by id", async () => {
            const mockSale = { id_sale: 1, id_user: 1 };
            saleModel.getById.mockResolvedValue(mockSale);
            const req = { params: { id: 1 } };
            const res = mockRes();

            await saleController.getById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockSale);
        });

        it("should return 404 if sale not found", async () => {
            saleModel.getById.mockResolvedValue(null);
            const req = { params: { id: 999 } };
            const res = mockRes();

            await saleController.getById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Sale not found" });
        });

        it("should return 500 on error", async () => {
            saleModel.getById.mockRejectedValue(new Error("DB error"));
            const req = { params: { id: 1 } };
            const res = mockRes();

            await saleController.getById(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
        });
    });

    describe("create", () => {
        it("should create a sale and return 201", async () => {
            saleModel.create.mockResolvedValue({ affectedRows: 1, insertId: 1 });
            const body = { id_user: 1, id_record: 2, total_paid: 100 };
            const req = { body };
            const res = mockRes();

            await saleController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: "Sale created successfully",
                saleId: 1,
                ...body,
            });
            expect(dbExport).toHaveBeenCalled();
        });

        it("should return 400 if id_user is missing", async () => {
            const req = { body: { id_record: 2 } };
            const res = mockRes();

            await saleController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "id_user and id_record are required" });
        });

        it("should return 400 if id_record is missing", async () => {
            const req = { body: { id_user: 1 } };
            const res = mockRes();

            await saleController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "id_user and id_record are required" });
        });

        it("should return 400 if affectedRows is 0", async () => {
            saleModel.create.mockResolvedValue({ affectedRows: 0 });
            const req = { body: { id_user: 1, id_record: 2 } };
            const res = mockRes();

            await saleController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "Sale not created" });
        });

        it("should return 500 on error", async () => {
            saleModel.create.mockRejectedValue(new Error("DB error"));
            const req = { body: { id_user: 1, id_record: 2 } };
            const res = mockRes();

            await saleController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
        });
    });

    describe("delete", () => {
        it("should delete a sale and return 200", async () => {
            saleModel.delete.mockResolvedValue({ affectedRows: 1 });
            const req = { params: { id: 1 } };
            const res = mockRes();

            await saleController.delete(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "Sale deleted successfully",
                id: 1,
            });
            expect(dbExport).toHaveBeenCalled();
        });

        it("should return 404 if sale not found", async () => {
            saleModel.delete.mockResolvedValue({ affectedRows: 0 });
            const req = { params: { id: 999 } };
            const res = mockRes();

            await saleController.delete(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Sale not found" });
        });

        it("should return 500 on error", async () => {
            saleModel.delete.mockRejectedValue(new Error("DB error"));
            const req = { params: { id: 1 } };
            const res = mockRes();

            await saleController.delete(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
        });
    });

    describe("getByUser", () => {
        it("should return sales by user", async () => {
            const mockSales = [{ id_sale: 1, id_user: 1 }];
            saleModel.getByUser.mockResolvedValue(mockSales);
            const req = { params: { userId: 1 } };
            const res = mockRes();

            await saleController.getByUser(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockSales);
        });

        it("should return 500 on error", async () => {
            saleModel.getByUser.mockRejectedValue(new Error("DB error"));
            const req = { params: { userId: 1 } };
            const res = mockRes();

            await saleController.getByUser(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
        });
    });

    describe("getByProduct", () => {
        it("should return sales by product", async () => {
            const mockSales = [{ id_sale: 1, id_record: 1 }];
            saleModel.getByProduct.mockResolvedValue(mockSales);
            const req = { params: { productId: 1 } };
            const res = mockRes();

            await saleController.getByProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockSales);
        });

        it("should return 500 on error", async () => {
            saleModel.getByProduct.mockRejectedValue(new Error("DB error"));
            const req = { params: { productId: 1 } };
            const res = mockRes();

            await saleController.getByProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
        });
    });
});
