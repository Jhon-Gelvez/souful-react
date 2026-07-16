import { describe, it, expect, vi, beforeEach } from "vitest";

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

vi.mock("../../services/dbExport.js", () => ({
    dbExport: vi.fn(),
}));

vi.mock("../../services/buildUpdateData.js", () => ({
    buildUpdateData: vi.fn(),
}));

import { productRecordController } from "../../controllers/productRecordController.js";
import { productRecordModel } from "../../models/productRecordModel.js";
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

describe("productRecordController", () => {
    describe("get", () => {
        it("should return all records with status 200", async () => {
            const mockRecords = [{ id_record: 1, id_product: 1 }];
            productRecordModel.get.mockResolvedValue(mockRecords);
            const req = {};
            const res = mockRes();

            await productRecordController.get(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockRecords);
        });

        it("should return 500 on error", async () => {
            productRecordModel.get.mockRejectedValue(new Error("DB error"));
            const req = {};
            const res = mockRes();

            await productRecordController.get(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
        });
    });

    describe("getById", () => {
        it("should return a record by id", async () => {
            const mockRecord = { id_record: 1, id_product: 1 };
            productRecordModel.getById.mockResolvedValue(mockRecord);
            const req = { params: { id: 1 } };
            const res = mockRes();

            await productRecordController.getById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockRecord);
        });

        it("should return 404 if record not found", async () => {
            productRecordModel.getById.mockResolvedValue(null);
            const req = { params: { id: 999 } };
            const res = mockRes();

            await productRecordController.getById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Product record not found" });
        });

        it("should return 500 on error", async () => {
            productRecordModel.getById.mockRejectedValue(new Error("DB error"));
            const req = { params: { id: 1 } };
            const res = mockRes();

            await productRecordController.getById(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
        });
    });

    describe("create", () => {
        it("should create a record and return 201", async () => {
            productRecordModel.create.mockResolvedValue({ affectedRows: 1, insertId: 1 });
            const body = { id_product: 1, id_image: 2, id_category: 3, is_active: true };
            const req = { body };
            const res = mockRes();

            await productRecordController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: "Product record created successfully",
                recordId: 1,
                ...body,
            });
            expect(dbExport).toHaveBeenCalled();
        });

        it("should return 400 if fields are missing", async () => {
            const req = { body: { id_product: 1 } };
            const res = mockRes();

            await productRecordController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "All fields are required" });
        });

        it("should return 400 if is_active is missing", async () => {
            const req = { body: { id_product: 1, id_image: 2, id_category: 3 } };
            const res = mockRes();

            await productRecordController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "All fields are required" });
        });

        it("should return 400 if affectedRows is 0", async () => {
            productRecordModel.create.mockResolvedValue({ affectedRows: 0 });
            const body = { id_product: 1, id_image: 2, id_category: 3, is_active: true };
            const req = { body };
            const res = mockRes();

            await productRecordController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "Product record not created" });
        });

        it("should return 500 on error", async () => {
            productRecordModel.create.mockRejectedValue(new Error("DB error"));
            const body = { id_product: 1, id_image: 2, id_category: 3, is_active: true };
            const req = { body };
            const res = mockRes();

            await productRecordController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
        });
    });

    describe("update", () => {
        it("should update a record and return 200", async () => {
            buildUpdateData.mockReturnValue({ data: { is_active: false } });
            productRecordModel.update.mockResolvedValue({ affectedRows: 1 });
            const req = { params: { id: 1 }, body: { is_active: false } };
            const res = mockRes();

            await productRecordController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "Product record updated successfully",
                id: 1,
                is_active: false,
            });
            expect(dbExport).toHaveBeenCalled();
        });

        it("should return 400 if no valid fields provided", async () => {
            buildUpdateData.mockReturnValue({ error: "At least one field must be provided for update" });
            const req = { params: { id: 1 }, body: {} };
            const res = mockRes();

            await productRecordController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "At least one field must be provided for update" });
        });

        it("should return 404 if record not found", async () => {
            buildUpdateData.mockReturnValue({ data: { is_active: false } });
            productRecordModel.update.mockResolvedValue({ affectedRows: 0 });
            const req = { params: { id: 999 }, body: { is_active: false } };
            const res = mockRes();

            await productRecordController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Product record not found or no changes" });
        });

        it("should return 500 on error", async () => {
            buildUpdateData.mockReturnValue({ data: { is_active: false } });
            productRecordModel.update.mockRejectedValue(new Error("DB error"));
            const req = { params: { id: 1 }, body: { is_active: false } };
            const res = mockRes();

            await productRecordController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
        });
    });

    describe("delete", () => {
        it("should delete a record and return 200", async () => {
            productRecordModel.delete.mockResolvedValue({ affectedRows: 1 });
            const req = { params: { id: 1 } };
            const res = mockRes();

            await productRecordController.delete(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "Product record deleted successfully",
                id: 1,
            });
            expect(dbExport).toHaveBeenCalled();
        });

        it("should return 404 if record not found", async () => {
            productRecordModel.delete.mockResolvedValue({ affectedRows: 0 });
            const req = { params: { id: 999 } };
            const res = mockRes();

            await productRecordController.delete(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Product record not found" });
        });

        it("should return 500 on error", async () => {
            productRecordModel.delete.mockRejectedValue(new Error("DB error"));
            const req = { params: { id: 1 } };
            const res = mockRes();

            await productRecordController.delete(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
        });
    });

    describe("getByCategory", () => {
        it("should return records by category", async () => {
            const mockRecords = [{ id_record: 1, id_category: 1 }];
            productRecordModel.getByCategory.mockResolvedValue(mockRecords);
            const req = { params: { categoryId: 1 } };
            const res = mockRes();

            await productRecordController.getByCategory(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockRecords);
        });

        it("should return 404 if not found", async () => {
            productRecordModel.getByCategory.mockResolvedValue(null);
            const req = { params: { categoryId: 999 } };
            const res = mockRes();

            await productRecordController.getByCategory(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Product record not found" });
        });

        it("should return 500 on error", async () => {
            productRecordModel.getByCategory.mockRejectedValue(new Error("DB error"));
            const req = { params: { categoryId: 1 } };
            const res = mockRes();

            await productRecordController.getByCategory(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
        });
    });

    describe("getByProduct", () => {
        it("should return records by product", async () => {
            const mockRecords = [{ id_record: 1, id_product: 1 }];
            productRecordModel.getByProduct.mockResolvedValue(mockRecords);
            const req = { params: { productId: 1 } };
            const res = mockRes();

            await productRecordController.getByProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockRecords);
        });

        it("should return 404 if not found", async () => {
            productRecordModel.getByProduct.mockResolvedValue(null);
            const req = { params: { productId: 999 } };
            const res = mockRes();

            await productRecordController.getByProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Product record not found" });
        });

        it("should return 500 on error", async () => {
            productRecordModel.getByProduct.mockRejectedValue(new Error("DB error"));
            const req = { params: { productId: 1 } };
            const res = mockRes();

            await productRecordController.getByProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
        });
    });

    describe("getByActive", () => {
        it("should return active records", async () => {
            const mockRecords = [{ id_record: 1, is_active: true }];
            productRecordModel.getByActive.mockResolvedValue(mockRecords);
            const req = {};
            const res = mockRes();

            await productRecordController.getByActive(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockRecords);
        });

        it("should return 404 if not found", async () => {
            productRecordModel.getByActive.mockResolvedValue(null);
            const req = {};
            const res = mockRes();

            await productRecordController.getByActive(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Product record not found" });
        });

        it("should return 500 on error", async () => {
            productRecordModel.getByActive.mockRejectedValue(new Error("DB error"));
            const req = {};
            const res = mockRes();

            await productRecordController.getByActive(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
        });
    });

    describe("getByInactive", () => {
        it("should return inactive records", async () => {
            const mockRecords = [{ id_record: 1, is_active: false }];
            productRecordModel.getByInactive.mockResolvedValue(mockRecords);
            const req = {};
            const res = mockRes();

            await productRecordController.getByInactive(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockRecords);
        });

        it("should return 404 if not found", async () => {
            productRecordModel.getByInactive.mockResolvedValue(null);
            const req = {};
            const res = mockRes();

            await productRecordController.getByInactive(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Product record not found" });
        });

        it("should return 500 on error", async () => {
            productRecordModel.getByInactive.mockRejectedValue(new Error("DB error"));
            const req = {};
            const res = mockRes();

            await productRecordController.getByInactive(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
        });
    });
});
