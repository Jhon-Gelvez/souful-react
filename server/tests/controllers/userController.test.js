import { describe, it, expect, vi, beforeEach } from "vitest";

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

vi.mock("../../services/buildUpdateData.js", () => ({
    buildUpdateData: vi.fn(),
}));

import { userController } from "../../controllers/userController.js";
import { userModel } from "../../models/userModel.js";
import { buildUpdateData } from "../../services/buildUpdateData.js";

const mockRes = () => {
    const res = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
};

const fullUserData = {
    first_name: "John",
    last_name: "Doe",
    email: "john@test.com",
    password: "secret123",
    role: "user",
};

beforeEach(() => {
    vi.clearAllMocks();
});

describe("userController", () => {
    describe("get", () => {
        it("should return all users with status 200", async () => {
            const mockUsers = [{ id_user: 1, first_name: "John" }];
            userModel.get.mockResolvedValue(mockUsers);
            const req = {};
            const res = mockRes();

            await userController.get(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockUsers);
        });

        it("should return 500 on error", async () => {
            userModel.get.mockRejectedValue(new Error("DB error"));
            const req = {};
            const res = mockRes();

            await userController.get(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
        });
    });

    describe("getById", () => {
        it("should return a user by id", async () => {
            const mockUser = { id_user: 1, first_name: "John" };
            userModel.getById.mockResolvedValue(mockUser);
            const req = { params: { id: 1 } };
            const res = mockRes();

            await userController.getById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockUser);
        });

        it("should return 404 if user not found", async () => {
            userModel.getById.mockResolvedValue(null);
            const req = { params: { id: 999 } };
            const res = mockRes();

            await userController.getById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
        });

        it("should return 500 on error", async () => {
            userModel.getById.mockRejectedValue(new Error("DB error"));
            const req = { params: { id: 1 } };
            const res = mockRes();

            await userController.getById(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
        });
    });

    describe("create", () => {
        it("should create a user and return 201", async () => {
            userModel.create.mockResolvedValue({ affectedRows: 1, insertId: 1 });
            const req = { body: fullUserData };
            const res = mockRes();

            await userController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: "User created successfully",
                userId: 1,
                ...fullUserData,
            });
        });

        it("should return 400 if fields are missing", async () => {
            const req = { body: { first_name: "John" } };
            const res = mockRes();

            await userController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "Fields missing" });
        });

        it("should return 400 if affectedRows is 0", async () => {
            userModel.create.mockResolvedValue({ affectedRows: 0 });
            const req = { body: fullUserData };
            const res = mockRes();

            await userController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "User not created" });
        });

        it("should return 500 on error", async () => {
            userModel.create.mockRejectedValue(new Error("DB error"));
            const req = { body: fullUserData };
            const res = mockRes();

            await userController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
        });
    });

    describe("update", () => {
        it("should update a user and return 200", async () => {
            buildUpdateData.mockReturnValue({ data: { first_name: "Jane" } });
            userModel.update.mockResolvedValue({ affectedRows: 1 });
            const req = { params: { id: 1 }, body: { first_name: "Jane" } };
            const res = mockRes();

            await userController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "User updated successfully",
                id: 1,
                updateData: { first_name: "Jane" },
            });
        });

        it("should return 400 if no valid fields provided", async () => {
            buildUpdateData.mockReturnValue({ error: "At least one field must be provided for update" });
            const req = { params: { id: 1 }, body: {} };
            const res = mockRes();

            await userController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "At least one field must be provided for update" });
        });

        it("should return 404 if user not found", async () => {
            buildUpdateData.mockReturnValue({ data: { first_name: "Jane" } });
            userModel.update.mockResolvedValue({ affectedRows: 0 });
            const req = { params: { id: 999 }, body: { first_name: "Jane" } };
            const res = mockRes();

            await userController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "User not found or no changes" });
        });

        it("should return 500 on error", async () => {
            buildUpdateData.mockReturnValue({ data: { first_name: "Jane" } });
            userModel.update.mockRejectedValue(new Error("DB error"));
            const req = { params: { id: 1 }, body: { first_name: "Jane" } };
            const res = mockRes();

            await userController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
        });
    });

    describe("delete", () => {
        it("should delete a user and return 200", async () => {
            userModel.delete.mockResolvedValue({ affectedRows: 1 });
            const req = { params: { id: 1 } };
            const res = mockRes();

            await userController.delete(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "User deleted successfully",
                id: 1,
            });
        });

        it("should return 404 if user not found", async () => {
            userModel.delete.mockResolvedValue({ affectedRows: 0 });
            const req = { params: { id: 999 } };
            const res = mockRes();

            await userController.delete(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
        });

        it("should return 500 on error", async () => {
            userModel.delete.mockRejectedValue(new Error("DB error"));
            const req = { params: { id: 1 } };
            const res = mockRes();

            await userController.delete(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
        });
    });

    describe("getByName", () => {
        it("should return a user by name", async () => {
            const mockUser = { id_user: 1, first_name: "John" };
            userModel.getByName.mockResolvedValue(mockUser);
            const req = { params: { name: "John" } };
            const res = mockRes();

            await userController.getByName(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockUser);
        });

        it("should return 404 if user not found", async () => {
            userModel.getByName.mockResolvedValue(null);
            const req = { params: { name: "NotExists" } };
            const res = mockRes();

            await userController.getByName(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
        });

        it("should return 500 on error", async () => {
            userModel.getByName.mockRejectedValue(new Error("DB error"));
            const req = { params: { name: "John" } };
            const res = mockRes();

            await userController.getByName(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
        });
    });

    describe("getByEmail", () => {
        it("should return a user by email", async () => {
            const mockUser = { id_user: 1, email: "john@test.com" };
            userModel.getByEmail.mockResolvedValue(mockUser);
            const req = { params: { email: "john@test.com" } };
            const res = mockRes();

            await userController.getByEmail(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockUser);
        });

        it("should return 404 if user not found", async () => {
            userModel.getByEmail.mockResolvedValue(null);
            const req = { params: { email: "not@test.com" } };
            const res = mockRes();

            await userController.getByEmail(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
        });

        it("should return 500 on error", async () => {
            userModel.getByEmail.mockRejectedValue(new Error("DB error"));
            const req = { params: { email: "john@test.com" } };
            const res = mockRes();

            await userController.getByEmail(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
        });
    });
});
