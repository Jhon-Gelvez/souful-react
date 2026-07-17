import { vi, describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import express from "express";

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
    errorHandler: vi.fn((error, res) => res.status(500).json({ message: "Error interno en el servidor" })),
}));

vi.mock("../../services/buildUpdateData.js", () => ({
    buildUpdateData: vi.fn(),
}));

import { userModel } from "../../models/userModel.js";
import { buildUpdateData } from "../../services/buildUpdateData.js";
import userRoutes from "../../routes/userRoutes.js";

const app = express();
app.use(express.json());
app.use(userRoutes);

describe("User Routes", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("GET /api/users/", () => {
        it("debería retornar 200", async () => {
            userModel.get.mockResolvedValue([{ id_user: 1, first_name: "John" }]);

            const res = await request(app).get("/api/users/");

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe("GET /api/users/:id", () => {
        it("debería retornar 200 con un usuario", async () => {
            userModel.getById.mockResolvedValue({ id_user: 1, first_name: "John" });

            const res = await request(app).get("/api/users/1");

            expect(res.status).toBe(200);
        });

        it("debería retornar 404 si no existe", async () => {
            userModel.getById.mockResolvedValue(null);

            const res = await request(app).get("/api/users/999");

            expect(res.status).toBe(404);
        });
    });

    describe("GET /api/users/name/:name", () => {
        it("debería retornar 200", async () => {
            userModel.getByName.mockResolvedValue({ id_user: 1, first_name: "John" });

            const res = await request(app).get("/api/users/name/John");

            expect(res.status).toBe(200);
        });

        it("debería retornar 404 si no existe", async () => {
            userModel.getByName.mockResolvedValue(null);

            const res = await request(app).get("/api/users/name/Inexistente");

            expect(res.status).toBe(404);
        });
    });

    describe("GET /api/users/email/:email", () => {
        it("debería retornar 200", async () => {
            userModel.getByEmail.mockResolvedValue({ id_user: 1, email: "john@test.com" });

            const res = await request(app).get("/api/users/email/john@test.com");

            expect(res.status).toBe(200);
        });

        it("debería retornar 404 si no existe", async () => {
            userModel.getByEmail.mockResolvedValue(null);

            const res = await request(app).get("/api/users/email/no@existe.com");

            expect(res.status).toBe(404);
        });
    });

    describe("POST /api/users/", () => {
        it("debería retornar 201 al crear", async () => {
            userModel.create.mockResolvedValue({ affectedRows: 1, insertId: 1 });

            const res = await request(app)
                .post("/api/users/")
                .send({ first_name: "John", last_name: "Doe", email: "john@test.com", password: "123", role: "user" });

            expect(res.status).toBe(201);
        });

        it("debería retornar 400 si faltan campos", async () => {
            const res = await request(app)
                .post("/api/users/")
                .send({ first_name: "John" });

            expect(res.status).toBe(400);
        });
    });

    describe("PATCH /api/users/:id", () => {
        it("debería retornar 200 al actualizar", async () => {
            buildUpdateData.mockReturnValue({ data: { first_name: "Jane" } });
            userModel.update.mockResolvedValue({ affectedRows: 1 });

            const res = await request(app)
                .patch("/api/users/1")
                .send({ first_name: "Jane" });

            expect(res.status).toBe(200);
        });

        it("debería retornar 400 si no hay campos válidos", async () => {
            buildUpdateData.mockReturnValue({ error: "At least one field must be provided for update" });

            const res = await request(app)
                .patch("/api/users/1")
                .send({});

            expect(res.status).toBe(400);
        });
    });

    describe("DELETE /api/users/:id", () => {
        it("debería retornar 200 al eliminar", async () => {
            userModel.delete.mockResolvedValue({ affectedRows: 1 });

            const res = await request(app).delete("/api/users/1");

            expect(res.status).toBe(200);
        });

        it("debería retornar 404 si no existe", async () => {
            userModel.delete.mockResolvedValue({ affectedRows: 0 });

            const res = await request(app).delete("/api/users/999");

            expect(res.status).toBe(404);
        });
    });
});
