import { vi, describe, it, expect, beforeEach } from "vitest";

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
    errorHandler: vi.fn(),
}));

vi.mock("../../services/dbExport.js", () => ({
    dbExport: vi.fn(),
}));

import { categoryModel } from "../../models/categoryModel.js";
import { categoryController } from "../../controllers/categoryController.js";
import { errorHandler } from "../../services/errorHandler.js";

describe("categoryController", () => {
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
        it("debería retornar 200 con categorías", async () => {
            const mock = [{ id_category: 1, name: "Test" }];
            categoryModel.get.mockResolvedValue(mock);

            await categoryController.get(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mock);
        });

        it("debería llamar errorHandler en error", async () => {
            const error = new Error("DB error");
            categoryModel.get.mockRejectedValue(error);

            await categoryController.get(req, res);

            expect(errorHandler).toHaveBeenCalledWith(error, res);
        });
    });

    describe("getById", () => {
        it("debería retornar 200 con la categoría", async () => {
            req.params.id = 1;
            const mock = { id_category: 1, name: "Test" };
            categoryModel.getById.mockResolvedValue(mock);

            await categoryController.getById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
        });

        it("debería retornar 404 si no existe", async () => {
            req.params.id = 999;
            categoryModel.getById.mockResolvedValue(null);

            await categoryController.getById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
        });

        it("debería llamar errorHandler en error", async () => {
            req.params.id = 1;
            const error = new Error("DB error");
            categoryModel.getById.mockRejectedValue(error);

            await categoryController.getById(req, res);

            expect(errorHandler).toHaveBeenCalledWith(error, res);
        });
    });

    describe("create", () => {
        it("debería retornar 201 al crear", async () => {
            req.body = { name: "Nueva" };
            const mock = { affectedRows: 1, insertId: 1 };
            categoryModel.create.mockResolvedValue(mock);

            await categoryController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
        });

        it("debería retornar 400 si falta name", async () => {
            req.body = {};

            await categoryController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "Name is required" });
        });

        it("debería llamar errorHandler en error", async () => {
            req.body = { name: "Nueva" };
            const error = new Error("DB error");
            categoryModel.create.mockRejectedValue(error);

            await categoryController.create(req, res);

            expect(errorHandler).toHaveBeenCalledWith(error, res);
        });
    });

    describe("update", () => {
        it("debería retornar 200 al actualizar", async () => {
            req.params.id = 1;
            req.body = { name: "Actualizada" };
            categoryModel.update.mockResolvedValue({ affectedRows: 1 });

            await categoryController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
        });

        it("debería retornar 400 si falta name", async () => {
            req.params.id = 1;
            req.body = {};

            await categoryController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
        });

        it("debería retornar 404 si no existe", async () => {
            req.params.id = 999;
            req.body = { name: "Actualizada" };
            categoryModel.update.mockResolvedValue({ affectedRows: 0 });

            await categoryController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
        });

        it("debería llamar errorHandler en error", async () => {
            req.params.id = 1;
            req.body = { name: "Actualizada" };
            const error = new Error("DB error");
            categoryModel.update.mockRejectedValue(error);

            await categoryController.update(req, res);

            expect(errorHandler).toHaveBeenCalledWith(error, res);
        });
    });

    describe("delete", () => {
        it("debería retornar 200 al eliminar", async () => {
            req.params.id = 1;
            categoryModel.delete.mockResolvedValue({ affectedRows: 1 });

            await categoryController.delete(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
        });

        it("debería retornar 404 si no existe", async () => {
            req.params.id = 999;
            categoryModel.delete.mockResolvedValue({ affectedRows: 0 });

            await categoryController.delete(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
        });

        it("debería llamar errorHandler en error", async () => {
            req.params.id = 1;
            const error = new Error("DB error");
            categoryModel.delete.mockRejectedValue(error);

            await categoryController.delete(req, res);

            expect(errorHandler).toHaveBeenCalledWith(error, res);
        });
    });
});
