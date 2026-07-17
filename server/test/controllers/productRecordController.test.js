import { vi, describe, it, expect, beforeEach } from "vitest";

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
    errorHandler: vi.fn(),
}));

vi.mock("../../services/dbExport.js", () => ({
    dbExport: vi.fn(),
}));

vi.mock("../../services/buildUpdateData.js", () => ({
    buildUpdateData: vi.fn(),
}));

import { productRecordModel } from "../../models/productRecordModel.js";
import { productRecordController } from "../../controllers/productRecordController.js";
import { errorHandler } from "../../services/errorHandler.js";
import { buildUpdateData } from "../../services/buildUpdateData.js";

describe("productRecordController", () => {
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
        it("debería retornar 200 con registros", async () => {
            const mock = [{ id_record: 1 }];
            productRecordModel.get.mockResolvedValue(mock);

            await productRecordController.get(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mock);
        });

        it("debería llamar errorHandler en error", async () => {
            const error = new Error("DB error");
            productRecordModel.get.mockRejectedValue(error);

            await productRecordController.get(req, res);

            expect(errorHandler).toHaveBeenCalledWith(error, res);
        });
    });

    describe("getById", () => {
        it("debería retornar 200 con el registro", async () => {
            req.params.id = 1;
            const mock = { id_record: 1 };
            productRecordModel.getById.mockResolvedValue(mock);

            await productRecordController.getById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
        });

        it("debería retornar 404 si no existe", async () => {
            req.params.id = 999;
            productRecordModel.getById.mockResolvedValue(null);

            await productRecordController.getById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
        });

        it("debería llamar errorHandler en error", async () => {
            req.params.id = 1;
            const error = new Error("DB error");
            productRecordModel.getById.mockRejectedValue(error);

            await productRecordController.getById(req, res);

            expect(errorHandler).toHaveBeenCalledWith(error, res);
        });
    });

    describe("create", () => {
        it("debería retornar 201 al crear", async () => {
            req.body = { id_product: 1, id_image: 1, id_category: 1, is_active: 1 };
            const mock = { affectedRows: 1, insertId: 1 };
            productRecordModel.create.mockResolvedValue(mock);

            await productRecordController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
        });

        it("debería retornar 400 si faltan campos", async () => {
            req.body = { id_product: 1 };

            await productRecordController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "All fields are required" });
        });

        it("debería llamar errorHandler en error", async () => {
            req.body = { id_product: 1, id_image: 1, id_category: 1, is_active: 1 };
            const error = new Error("DB error");
            productRecordModel.create.mockRejectedValue(error);

            await productRecordController.create(req, res);

            expect(errorHandler).toHaveBeenCalledWith(error, res);
        });
    });

    describe("update", () => {
        it("debería retornar 200 al actualizar", async () => {
            req.params.id = 1;
            req.body = { is_active: 0 };
            buildUpdateData.mockReturnValue({ data: { is_active: 0 } });
            productRecordModel.update.mockResolvedValue({ affectedRows: 1 });

            await productRecordController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
        });

        it("debería retornar 400 si buildUpdateData retorna error", async () => {
            req.params.id = 1;
            req.body = {};
            buildUpdateData.mockReturnValue({ error: "At least one field must be provided for update" });

            await productRecordController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
        });

        it("debería llamar errorHandler en error", async () => {
            req.params.id = 1;
            req.body = { is_active: 0 };
            buildUpdateData.mockReturnValue({ data: { is_active: 0 } });
            const error = new Error("DB error");
            productRecordModel.update.mockRejectedValue(error);

            await productRecordController.update(req, res);

            expect(errorHandler).toHaveBeenCalledWith(error, res);
        });
    });

    describe("delete", () => {
        it("debería retornar 200 al eliminar", async () => {
            req.params.id = 1;
            productRecordModel.delete.mockResolvedValue({ affectedRows: 1 });

            await productRecordController.delete(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
        });

        it("debería retornar 404 si no existe", async () => {
            req.params.id = 999;
            productRecordModel.delete.mockResolvedValue({ affectedRows: 0 });

            await productRecordController.delete(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
        });

        it("debería llamar errorHandler en error", async () => {
            req.params.id = 1;
            const error = new Error("DB error");
            productRecordModel.delete.mockRejectedValue(error);

            await productRecordController.delete(req, res);

            expect(errorHandler).toHaveBeenCalledWith(error, res);
        });
    });

    describe("getByCategory", () => {
        it("debería retornar 200 con registros", async () => {
            req.params.categoryId = 1;
            const mock = [{ id_record: 1 }];
            productRecordModel.getByCategory.mockResolvedValue(mock);

            await productRecordController.getByCategory(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
        });

        it("debería llamar errorHandler en error", async () => {
            req.params.categoryId = 1;
            const error = new Error("DB error");
            productRecordModel.getByCategory.mockRejectedValue(error);

            await productRecordController.getByCategory(req, res);

            expect(errorHandler).toHaveBeenCalledWith(error, res);
        });
    });

    describe("getByProduct", () => {
        it("debería retornar 200 con registros", async () => {
            req.params.productId = 1;
            const mock = [{ id_record: 1 }];
            productRecordModel.getByProduct.mockResolvedValue(mock);

            await productRecordController.getByProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
        });

        it("debería llamar errorHandler en error", async () => {
            req.params.productId = 1;
            const error = new Error("DB error");
            productRecordModel.getByProduct.mockRejectedValue(error);

            await productRecordController.getByProduct(req, res);

            expect(errorHandler).toHaveBeenCalledWith(error, res);
        });
    });

    describe("getByActive", () => {
        it("debería retornar 200 con registros activos", async () => {
            const mock = [{ id_record: 1, is_active: 1 }];
            productRecordModel.getByActive.mockResolvedValue(mock);

            await productRecordController.getByActive(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
        });

        it("debería llamar errorHandler en error", async () => {
            const error = new Error("DB error");
            productRecordModel.getByActive.mockRejectedValue(error);

            await productRecordController.getByActive(req, res);

            expect(errorHandler).toHaveBeenCalledWith(error, res);
        });
    });

    describe("getByInactive", () => {
        it("debería retornar 200 con registros inactivos", async () => {
            const mock = [{ id_record: 1, is_active: 0 }];
            productRecordModel.getByInactive.mockResolvedValue(mock);

            await productRecordController.getByInactive(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
        });

        it("debería llamar errorHandler en error", async () => {
            const error = new Error("DB error");
            productRecordModel.getByInactive.mockRejectedValue(error);

            await productRecordController.getByInactive(req, res);

            expect(errorHandler).toHaveBeenCalledWith(error, res);
        });
    });
});
