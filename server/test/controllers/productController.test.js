import { vi, describe, it, expect, beforeEach } from "vitest";

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
    errorHandler: vi.fn(),
}));

vi.mock("../../services/dbExport.js", () => ({
    dbExport: vi.fn(),
}));

vi.mock("../../services/buildUpdateData.js", () => ({
    buildUpdateData: vi.fn(),
}));

import { productModel } from "../../models/productModel.js";
import { productController } from "../../controllers/productController.js";
import { errorHandler } from "../../services/errorHandler.js";
import { buildUpdateData } from "../../services/buildUpdateData.js";

describe("productController", () => {
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
        it("debería retornar 200 con productos", async () => {
            const mock = [{ id_product: 1, name: "Test" }];
            productModel.get.mockResolvedValue(mock);

            await productController.get(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mock);
        });

        it("debería llamar errorHandler en error", async () => {
            const error = new Error("DB error");
            productModel.get.mockRejectedValue(error);

            await productController.get(req, res);

            expect(errorHandler).toHaveBeenCalledWith(error, res);
        });
    });

    describe("getById", () => {
        it("debería retornar 200 con el producto", async () => {
            const mock = { id_product: 1, name: "Test" };
            req.params.id = 1;
            productModel.getById.mockResolvedValue(mock);

            await productController.getById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mock);
        });

        it("debería retornar 404 si no existe", async () => {
            req.params.id = 999;
            productModel.getById.mockResolvedValue(null);

            await productController.getById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Product not found" });
        });

        it("debería llamar errorHandler en error", async () => {
            req.params.id = 1;
            const error = new Error("DB error");
            productModel.getById.mockRejectedValue(error);

            await productController.getById(req, res);

            expect(errorHandler).toHaveBeenCalledWith(error, res);
        });
    });

    describe("create", () => {
        it("debería retornar 201 al crear", async () => {
            req.body = { name: "Test", price: 10 };
            const mock = { affectedRows: 1, insertId: 1 };
            productModel.create.mockResolvedValue(mock);

            await productController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({ message: "Product created successfully" })
            );
        });

        it("debería retornar 400 si faltan campos", async () => {
            req.body = { name: "Test" };

            await productController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "Name and price are required" });
        });

        it("debería retornar 400 si no se crea", async () => {
            req.body = { name: "Test", price: 10 };
            productModel.create.mockResolvedValue({ affectedRows: 0 });

            await productController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
        });

        it("debería llamar errorHandler en error", async () => {
            req.body = { name: "Test", price: 10 };
            const error = new Error("DB error");
            productModel.create.mockRejectedValue(error);

            await productController.create(req, res);

            expect(errorHandler).toHaveBeenCalledWith(error, res);
        });
    });

    describe("update", () => {
        it("debería retornar 201 al actualizar", async () => {
            req.params.id = 1;
            req.body = { name: "Updated" };
            buildUpdateData.mockReturnValue({ data: { name: "Updated" } });
            productModel.update.mockResolvedValue({ affectedRows: 1 });

            await productController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
        });

        it("debería retornar 400 si buildUpdateData retorna error", async () => {
            req.params.id = 1;
            req.body = {};
            buildUpdateData.mockReturnValue({ error: "At least one field must be provided for update" });

            await productController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
        });

        it("debería retornar 404 si no existe", async () => {
            req.params.id = 999;
            req.body = { name: "Updated" };
            buildUpdateData.mockReturnValue({ data: { name: "Updated" } });
            productModel.update.mockResolvedValue({ affectedRows: 0 });

            await productController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
        });

        it("debería llamar errorHandler en error", async () => {
            req.params.id = 1;
            req.body = { name: "Updated" };
            buildUpdateData.mockReturnValue({ data: { name: "Updated" } });
            const error = new Error("DB error");
            productModel.update.mockRejectedValue(error);

            await productController.update(req, res);

            expect(errorHandler).toHaveBeenCalledWith(error, res);
        });
    });

    describe("delete", () => {
        it("debería retornar 200 al eliminar", async () => {
            req.params.id = 1;
            productModel.delete.mockResolvedValue({ affectedRows: 1 });

            await productController.delete(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "Product deleted successfully", id: 1 });
        });

        it("debería retornar 404 si no existe", async () => {
            req.params.id = 999;
            productModel.delete.mockResolvedValue({ affectedRows: 0 });

            await productController.delete(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
        });

        it("debería llamar errorHandler en error", async () => {
            req.params.id = 1;
            const error = new Error("DB error");
            productModel.delete.mockRejectedValue(error);

            await productController.delete(req, res);

            expect(errorHandler).toHaveBeenCalledWith(error, res);
        });
    });

    describe("getByName", () => {
        it("debería retornar 200 con el producto", async () => {
            req.params.name = "Test";
            const mock = { id_product: 1, name: "Test" };
            productModel.getByName.mockResolvedValue(mock);

            await productController.getByName(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mock);
        });

        it("debería retornar 404 si no existe", async () => {
            req.params.name = "Inexistente";
            productModel.getByName.mockResolvedValue(null);

            await productController.getByName(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
        });

        it("debería llamar errorHandler en error", async () => {
            req.params.name = "Test";
            const error = new Error("DB error");
            productModel.getByName.mockRejectedValue(error);

            await productController.getByName(req, res);

            expect(errorHandler).toHaveBeenCalledWith(error, res);
        });
    });
});
