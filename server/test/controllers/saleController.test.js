import { vi, describe, it, expect, beforeEach } from "vitest";

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
    errorHandler: vi.fn(),
}));

vi.mock("../../services/dbExport.js", () => ({
    dbExport: vi.fn(),
}));

import { saleModel } from "../../models/saleModel.js";
import { saleController } from "../../controllers/saleController.js";
import { errorHandler } from "../../services/errorHandler.js";

describe("saleController", () => {
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
        it("debería retornar 200 con ventas", async () => {
            const mock = [{ id_sale: 1 }];
            saleModel.get.mockResolvedValue(mock);

            await saleController.get(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mock);
        });

        it("debería llamar errorHandler en error", async () => {
            const error = new Error("DB error");
            saleModel.get.mockRejectedValue(error);

            await saleController.get(req, res);

            expect(errorHandler).toHaveBeenCalledWith(error, res);
        });
    });

    describe("getById", () => {
        it("debería retornar 200 con la venta", async () => {
            req.params.id = 1;
            const mock = { id_sale: 1 };
            saleModel.getById.mockResolvedValue(mock);

            await saleController.getById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
        });

        it("debería retornar 404 si no existe", async () => {
            req.params.id = 999;
            saleModel.getById.mockResolvedValue(null);

            await saleController.getById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
        });

        it("debería llamar errorHandler en error", async () => {
            req.params.id = 1;
            const error = new Error("DB error");
            saleModel.getById.mockRejectedValue(error);

            await saleController.getById(req, res);

            expect(errorHandler).toHaveBeenCalledWith(error, res);
        });
    });

    describe("create", () => {
        it("debería retornar 201 al crear", async () => {
            req.body = { id_user: 1, id_record: 1 };
            const mock = { affectedRows: 1, insertId: 1 };
            saleModel.create.mockResolvedValue(mock);

            await saleController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
        });

        it("debería retornar 400 si faltan campos", async () => {
            req.body = { id_user: 1 };

            await saleController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "id_user and id_record are required" });
        });

        it("debería llamar errorHandler en error", async () => {
            req.body = { id_user: 1, id_record: 1 };
            const error = new Error("DB error");
            saleModel.create.mockRejectedValue(error);

            await saleController.create(req, res);

            expect(errorHandler).toHaveBeenCalledWith(error, res);
        });
    });

    describe("delete", () => {
        it("debería retornar 200 al eliminar", async () => {
            req.params.id = 1;
            saleModel.delete.mockResolvedValue({ affectedRows: 1 });

            await saleController.delete(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
        });

        it("debería retornar 404 si no existe", async () => {
            req.params.id = 999;
            saleModel.delete.mockResolvedValue({ affectedRows: 0 });

            await saleController.delete(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
        });

        it("debería llamar errorHandler en error", async () => {
            req.params.id = 1;
            const error = new Error("DB error");
            saleModel.delete.mockRejectedValue(error);

            await saleController.delete(req, res);

            expect(errorHandler).toHaveBeenCalledWith(error, res);
        });
    });

    describe("getByUser", () => {
        it("debería retornar 200 con ventas del usuario", async () => {
            req.params.userId = 1;
            const mock = [{ id_sale: 1 }];
            saleModel.getByUser.mockResolvedValue(mock);

            await saleController.getByUser(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mock);
        });

        it("debería llamar errorHandler en error", async () => {
            req.params.userId = 1;
            const error = new Error("DB error");
            saleModel.getByUser.mockRejectedValue(error);

            await saleController.getByUser(req, res);

            expect(errorHandler).toHaveBeenCalledWith(error, res);
        });
    });

    describe("getByProduct", () => {
        it("debería retornar 200 con ventas del producto", async () => {
            req.params.productId = 1;
            const mock = [{ id_sale: 1 }];
            saleModel.getByProduct.mockResolvedValue(mock);

            await saleController.getByProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mock);
        });

        it("debería llamar errorHandler en error", async () => {
            req.params.productId = 1;
            const error = new Error("DB error");
            saleModel.getByProduct.mockRejectedValue(error);

            await saleController.getByProduct(req, res);

            expect(errorHandler).toHaveBeenCalledWith(error, res);
        });
    });
});
