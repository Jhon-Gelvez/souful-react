import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("../../config/mysql.js", () => ({
    db: { query: vi.fn() },
}));

import { db } from "../../config/mysql.js";
import { categoryModel } from "../../models/categoryModel.js";

describe("categoryModel", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("get", () => {
        it("debería retornar todas las categorías", async () => {
            const mock = [{ id_category: 1, name: "Test" }];
            db.query.mockResolvedValue([mock]);

            const result = await categoryModel.get();

            expect(result).toEqual(mock);
            expect(db.query).toHaveBeenCalledWith("SELECT * FROM categories");
        });
    });

    describe("getById", () => {
        it("debería retornar una categoría por id", async () => {
            const mock = [{ id_category: 1, name: "Test" }];
            db.query.mockResolvedValue([mock]);

            const result = await categoryModel.getById(1);

            expect(result).toEqual(mock[0]);
        });

        it("debería retornar null si no existe", async () => {
            db.query.mockResolvedValue([[]]);

            const result = await categoryModel.getById(999);

            expect(result).toBeNull();
        });
    });

    describe("create", () => {
        it("debería crear una categoría", async () => {
            const mock = { affectedRows: 1, insertId: 1 };
            db.query.mockResolvedValue([mock]);

            const result = await categoryModel.create("Nueva");

            expect(result).toEqual(mock);
            expect(db.query).toHaveBeenCalledWith(
                "INSERT INTO categories (name) VALUES (?)",
                ["Nueva"]
            );
        });
    });

    describe("update", () => {
        it("debería actualizar una categoría", async () => {
            const mock = { affectedRows: 1 };
            db.query.mockResolvedValue([mock]);

            const result = await categoryModel.update(1, "Actualizada");

            expect(result).toEqual(mock);
            expect(db.query).toHaveBeenCalledWith(
                "UPDATE categories SET name = ? WHERE id_category = ?",
                ["Actualizada", 1]
            );
        });
    });

    describe("delete", () => {
        it("debería eliminar una categoría", async () => {
            const mock = { affectedRows: 1 };
            db.query.mockResolvedValue([mock]);

            const result = await categoryModel.delete(1);

            expect(result).toEqual(mock);
            expect(db.query).toHaveBeenCalledWith(
                "DELETE FROM categories WHERE id_category = ?",
                [1]
            );
        });
    });
});
