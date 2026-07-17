import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("../../models/userModel.js", () => ({
    userModel: {
        get: vi.fn(),
        getById: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
        getByName: vi.fn(),
        getByEmail: vi.fn(),
    },
}));

vi.mock("../../services/errorHandler.js", () => ({
    errorHandler: vi.fn(),
}));

vi.mock("../../services/buildUpdateData.js", () => ({
    buildUpdateData: vi.fn(),
}));

import { userModel } from "../../models/userModel.js";
import { userController } from "../../controllers/userController.js";
import { errorHandler } from "../../services/errorHandler.js";
import { buildUpdateData } from "../../services/buildUpdateData.js";

describe("userController", () => {
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
        it("debería retornar 200 con usuarios", async () => {
            const mock = [{ id_user: 1, first_name: "John" }];
            userModel.get.mockResolvedValue(mock);

            await userController.get(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mock);
        });

        it("debería llamar errorHandler en error", async () => {
            const error = new Error("DB error");
            userModel.get.mockRejectedValue(error);

            await userController.get(req, res);

            expect(errorHandler).toHaveBeenCalledWith(error, res);
        });
    });

    describe("getById", () => {
        it("debería retornar 200 con el usuario", async () => {
            req.params.id = 1;
            const mock = { id_user: 1, first_name: "John" };
            userModel.getById.mockResolvedValue(mock);

            await userController.getById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mock);
        });

        it("debería retornar 404 si no existe", async () => {
            req.params.id = 999;
            userModel.getById.mockResolvedValue(null);

            await userController.getById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
        });

        it("debería llamar errorHandler en error", async () => {
            req.params.id = 1;
            const error = new Error("DB error");
            userModel.getById.mockRejectedValue(error);

            await userController.getById(req, res);

            expect(errorHandler).toHaveBeenCalledWith(error, res);
        });
    });

    describe("create", () => {
        it("debería retornar 201 al crear", async () => {
            req.body = { first_name: "John", last_name: "Doe", email: "john@test.com", password: "123", role: "user" };
            const mock = { affectedRows: 1, insertId: 1 };
            userModel.create.mockResolvedValue(mock);

            await userController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
        });

        it("debería retornar 400 si faltan campos", async () => {
            req.body = { first_name: "John" };

            await userController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "Fields missing" });
        });

        it("debería llamar errorHandler en error", async () => {
            req.body = { first_name: "John", last_name: "Doe", email: "john@test.com", password: "123", role: "user" };
            const error = new Error("DB error");
            userModel.create.mockRejectedValue(error);

            await userController.create(req, res);

            expect(errorHandler).toHaveBeenCalledWith(error, res);
        });
    });

    describe("update", () => {
        it("debería retornar 200 al actualizar", async () => {
            req.params.id = 1;
            req.body = { first_name: "Jane" };
            buildUpdateData.mockReturnValue({ data: { first_name: "Jane" } });
            userModel.update.mockResolvedValue({ affectedRows: 1 });

            await userController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
        });

        it("debería retornar 400 si buildUpdateData retorna error", async () => {
            req.params.id = 1;
            req.body = {};
            buildUpdateData.mockReturnValue({ error: "At least one field must be provided for update" });

            await userController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
        });

        it("debería llamar errorHandler en error", async () => {
            req.params.id = 1;
            req.body = { first_name: "Jane" };
            buildUpdateData.mockReturnValue({ data: { first_name: "Jane" } });
            const error = new Error("DB error");
            userModel.update.mockRejectedValue(error);

            await userController.update(req, res);

            expect(errorHandler).toHaveBeenCalledWith(error, res);
        });
    });

    describe("delete", () => {
        it("debería retornar 200 al eliminar", async () => {
            req.params.id = 1;
            userModel.delete.mockResolvedValue({ affectedRows: 1 });

            await userController.delete(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
        });

        it("debería retornar 404 si no existe", async () => {
            req.params.id = 999;
            userModel.delete.mockResolvedValue({ affectedRows: 0 });

            await userController.delete(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
        });

        it("debería llamar errorHandler en error", async () => {
            req.params.id = 1;
            const error = new Error("DB error");
            userModel.delete.mockRejectedValue(error);

            await userController.delete(req, res);

            expect(errorHandler).toHaveBeenCalledWith(error, res);
        });
    });

    describe("getByName", () => {
        it("debería retornar 200 con el usuario", async () => {
            req.params.name = "John";
            const mock = { id_user: 1, first_name: "John" };
            userModel.getByName.mockResolvedValue(mock);

            await userController.getByName(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
        });

        it("debería retornar 404 si no existe", async () => {
            req.params.name = "Inexistente";
            userModel.getByName.mockResolvedValue(null);

            await userController.getByName(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
        });

        it("debería llamar errorHandler en error", async () => {
            req.params.name = "John";
            const error = new Error("DB error");
            userModel.getByName.mockRejectedValue(error);

            await userController.getByName(req, res);

            expect(errorHandler).toHaveBeenCalledWith(error, res);
        });
    });

    describe("getByEmail", () => {
        it("debería retornar 200 con el usuario", async () => {
            req.params.email = "john@test.com";
            const mock = { id_user: 1, email: "john@test.com" };
            userModel.getByEmail.mockResolvedValue(mock);

            await userController.getByEmail(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
        });

        it("debería retornar 404 si no existe", async () => {
            req.params.email = "no@existe.com";
            userModel.getByEmail.mockResolvedValue(null);

            await userController.getByEmail(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
        });

        it("debería llamar errorHandler en error", async () => {
            req.params.email = "john@test.com";
            const error = new Error("DB error");
            userModel.getByEmail.mockRejectedValue(error);

            await userController.getByEmail(req, res);

            expect(errorHandler).toHaveBeenCalledWith(error, res);
        });
    });
});
