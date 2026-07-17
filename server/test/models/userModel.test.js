import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("../../config/mysql.js", () => ({
    db: { query: vi.fn() },
}));

import { db } from "../../config/mysql.js";
import { userModel } from "../../models/userModel.js";

describe("userModel", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("get", () => {
        it("debería retornar todos los usuarios", async () => {
            const mock = [{ id_user: 1, first_name: "John" }];
            db.query.mockResolvedValue([mock]);

            const result = await userModel.get();

            expect(result).toEqual(mock);
            expect(db.query).toHaveBeenCalledWith("SELECT * FROM users");
        });
    });

    describe("getById", () => {
        it("debería retornar un usuario por id", async () => {
            const mock = [{ id_user: 1, first_name: "John" }];
            db.query.mockResolvedValue([mock]);

            const result = await userModel.getById(1);

            expect(result).toEqual(mock[0]);
        });

        it("debería retornar null si no existe", async () => {
            db.query.mockResolvedValue([[]]);

            const result = await userModel.getById(999);

            expect(result).toBeNull();
        });
    });

    describe("create", () => {
        it("debería crear un usuario", async () => {
            const mock = { affectedRows: 1, insertId: 1 };
            db.query.mockResolvedValue([mock]);
            const data = { first_name: "John", last_name: "Doe", email: "john@test.com", password: "123", role: "user" };

            const result = await userModel.create(data);

            expect(result).toEqual(mock);
            expect(db.query).toHaveBeenCalledWith(
                expect.stringContaining("INSERT INTO users"),
                Object.values(data)
            );
        });
    });

    describe("update", () => {
        it("debería actualizar un usuario", async () => {
            const mock = { affectedRows: 1 };
            db.query.mockResolvedValue([mock]);

            const result = await userModel.update(1, { first_name: "Jane" });

            expect(result).toEqual(mock);
            expect(db.query).toHaveBeenCalledWith(
                "UPDATE users SET first_name = ? WHERE id_user = ?",
                ["Jane", 1]
            );
        });

        it("debería retornar null si no hay campos", async () => {
            const result = await userModel.update(1, {});

            expect(result).toBeNull();
        });
    });

    describe("delete", () => {
        it("debería eliminar un usuario", async () => {
            const mock = { affectedRows: 1 };
            db.query.mockResolvedValue([mock]);

            const result = await userModel.delete(1);

            expect(result).toEqual(mock);
            expect(db.query).toHaveBeenCalledWith("DELETE FROM users WHERE id_user = ?", [1]);
        });
    });

    describe("getByName", () => {
        it("debería retornar un usuario por nombre", async () => {
            const mock = [{ id_user: 1, first_name: "John" }];
            db.query.mockResolvedValue([mock]);

            const result = await userModel.getByName("John");

            expect(result).toEqual(mock[0]);
        });

        it("debería retornar null si no existe", async () => {
            db.query.mockResolvedValue([[]]);

            const result = await userModel.getByName("Inexistente");

            expect(result).toBeNull();
        });
    });

    describe("getByEmail", () => {
        it("debería retornar un usuario por email", async () => {
            const mock = [{ id_user: 1, email: "john@test.com" }];
            db.query.mockResolvedValue([mock]);

            const result = await userModel.getByEmail("john@test.com");

            expect(result).toEqual(mock[0]);
        });

        it("debería retornar null si no existe", async () => {
            db.query.mockResolvedValue([[]]);

            const result = await userModel.getByEmail("no@existe.com");

            expect(result).toBeNull();
        });
    });
});
