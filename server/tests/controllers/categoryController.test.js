import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../models/categoryModel.js", () => ({
    categoryModel: {
        get: vi.fn(),
        getById: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
    },
}));

vi.mock("../../services/dbExport.js", () => ({
    dbExport: vi.fn(),
}));

import { categoryController } from "../../controllers/categoryController.js";
import { categoryModel } from "../../models/categoryModel.js";
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

describe("categoryController", () => {
    describe("get", () => {
        it("should return all categories with status 200", async () => {
            const mockCategories = [{ id_category: 1, name: "Paintings" }];
            categoryModel.get.mockResolvedValue(mockCategories);
            const req = {};
            const res = mockRes();

            await categoryController.get(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockCategories);
        });

        it("should return 500 on error", async () => {
            categoryModel.get.mockRejectedValue(new Error("DB error"));
            const req = {};
            const res = mockRes();

            await categoryController.get(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
        });
    });

    describe("getById", () => {
        it("should return a category by id", async () => {
            const mockCategory = { id_category: 1, name: "Paintings" };
            categoryModel.getById.mockResolvedValue(mockCategory);
            const req = { params: { id: 1 } };
            const res = mockRes();

            await categoryController.getById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockCategory);
        });

        it("should return 404 if category not found", async () => {
            categoryModel.getById.mockResolvedValue(null);
            const req = { params: { id: 999 } };
            const res = mockRes();

            await categoryController.getById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Category not found" });
        });

        it("should return 500 on error", async () => {
            categoryModel.getById.mockRejectedValue(new Error("DB error"));
            const req = { params: { id: 1 } };
            const res = mockRes();

            await categoryController.getById(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
        });
    });

    describe("create", () => {
        it("should create a category and return 201", async () => {
            categoryModel.create.mockResolvedValue({ affectedRows: 1, insertId: 1 });
            const req = { body: { name: "Sculptures" } };
            const res = mockRes();

            await categoryController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: "Category created successfully",
                categoryId: 1,
                name: "Sculptures",
            });
            expect(dbExport).toHaveBeenCalled();
        });

        it("should return 400 if name is missing", async () => {
            const req = { body: {} };
            const res = mockRes();

            await categoryController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "Name is required" });
            expect(categoryModel.create).not.toHaveBeenCalled();
        });

        it("should return 400 if affectedRows is 0", async () => {
            categoryModel.create.mockResolvedValue({ affectedRows: 0 });
            const req = { body: { name: "Sculptures" } };
            const res = mockRes();

            await categoryController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "Category not created" });
        });

        it("should return 500 on error", async () => {
            categoryModel.create.mockRejectedValue(new Error("DB error"));
            const req = { body: { name: "Sculptures" } };
            const res = mockRes();

            await categoryController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
        });
    });

    describe("update", () => {
        it("should update a category and return 200", async () => {
            categoryModel.update.mockResolvedValue({ affectedRows: 1 });
            const req = { params: { id: 1 }, body: { name: "Updated" } };
            const res = mockRes();

            await categoryController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "Category updated successfully",
                id: 1,
                name: "Updated",
            });
            expect(dbExport).toHaveBeenCalled();
        });

        it("should return 400 if name is missing", async () => {
            const req = { params: { id: 1 }, body: {} };
            const res = mockRes();

            await categoryController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "Name is required" });
        });

        it("should return 404 if category not found", async () => {
            categoryModel.update.mockResolvedValue({ affectedRows: 0 });
            const req = { params: { id: 999 }, body: { name: "Updated" } };
            const res = mockRes();

            await categoryController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Category not found or no changes" });
        });

        it("should return 500 on error", async () => {
            categoryModel.update.mockRejectedValue(new Error("DB error"));
            const req = { params: { id: 1 }, body: { name: "Updated" } };
            const res = mockRes();

            await categoryController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
        });
    });

    describe("delete", () => {
        it("should delete a category and return 200", async () => {
            categoryModel.delete.mockResolvedValue({ affectedRows: 1 });
            const req = { params: { id: 1 } };
            const res = mockRes();

            await categoryController.delete(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "Category deleted successfully",
                id: 1,
            });
            expect(dbExport).toHaveBeenCalled();
        });

        it("should return 404 if category not found", async () => {
            categoryModel.delete.mockResolvedValue({ affectedRows: 0 });
            const req = { params: { id: 999 } };
            const res = mockRes();

            await categoryController.delete(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Category not found" });
        });

        it("should return 500 on error", async () => {
            categoryModel.delete.mockRejectedValue(new Error("DB error"));
            const req = { params: { id: 1 } };
            const res = mockRes();

            await categoryController.delete(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
        });
    });
});
