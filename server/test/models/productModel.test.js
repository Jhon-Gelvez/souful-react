import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("../../config/mysql.js", () => ({
    db: { query: vi.fn() },
}));

import { db } from "../../config/mysql.js";
import { productModel } from "../../models/productModel.js";

describe("productModel", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("get", () => {
        it("debería retornar todos los productos", async () => {
            const mock = [{ id_product: 1, name: "Test", price: 10 }];
            db.query.mockResolvedValue([mock]);

            const result = await productModel.get();

            expect(result).toEqual(mock);
            expect(db.query).toHaveBeenCalledWith("SELECT * FROM products");
        });
    });

    describe("getById", () => {
        it("debería retornar un producto por id", async () => {
            const mock = [{ id_product: 1, name: "Test", price: 10 }];
            db.query.mockResolvedValue([mock]);

            const result = await productModel.getById(1);

            expect(result).toEqual(mock[0]);
            expect(db.query).toHaveBeenCalledWith("SELECT * FROM products WHERE id_product = ?", [1]);
        });

        it("debería retornar null si no existe", async () => {
            db.query.mockResolvedValue([[]]);

            const result = await productModel.getById(999);

            expect(result).toBeNull();
        });
    });

    describe("create", () => {
        it("debería crear un producto", async () => {
            const mock = { affectedRows: 1, insertId: 1 };
            db.query.mockResolvedValue([mock]);

            const result = await productModel.create({ name: "Test", price: 10 });

            expect(result).toEqual(mock);
            expect(db.query).toHaveBeenCalledWith(
                "INSERT INTO products (name, price) VALUES (?, ?)",
                ["Test", 10]
            );
        });
    });

    describe("update", () => {
        it("debería actualizar un producto", async () => {
            const mock = { affectedRows: 1 };
            db.query.mockResolvedValue([mock]);

            const result = await productModel.update(1, { name: "Updated" });

            expect(result).toEqual(mock);
            expect(db.query).toHaveBeenCalledWith(
                "UPDATE products SET name = ? WHERE id_product = ?",
                ["Updated", 1]
            );
        });

        it("debería retornar null si no hay campos", async () => {
            const result = await productModel.update(1, {});

            expect(result).toBeNull();
            expect(db.query).not.toHaveBeenCalled();
        });
    });

    describe("delete", () => {
        it("debería eliminar un producto", async () => {
            const mock = { affectedRows: 1 };
            db.query.mockResolvedValue([mock]);

            const result = await productModel.delete(1);

            expect(result).toEqual(mock);
            expect(db.query).toHaveBeenCalledWith("DELETE FROM products WHERE id_product = ?", [1]);
        });
    });

    describe("getByName", () => {
        it("debería retornar un producto por nombre", async () => {
            const mock = [{ id_product: 1, name: "Test" }];
            db.query.mockResolvedValue([mock]);

            const result = await productModel.getByName("Test");

            expect(result).toEqual(mock[0]);
            expect(db.query).toHaveBeenCalledWith("SELECT * FROM products WHERE name = ?", ["Test"]);
        });

        it("debería retornar null si no existe", async () => {
            db.query.mockResolvedValue([[]]);

            const result = await productModel.getByName("Inexistente");

            expect(result).toBeNull();
        });
    });
});
