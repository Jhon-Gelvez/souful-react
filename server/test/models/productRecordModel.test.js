import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("../../config/mysql.js", () => ({
    db: { query: vi.fn() },
}));

import { db } from "../../config/mysql.js";
import { productRecordModel } from "../../models/productRecordModel.js";

describe("productRecordModel", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("get", () => {
        it("debería retornar todos los registros con JOINs", async () => {
            const mock = [{ id_record: 1, product_name: "Test" }];
            db.query.mockResolvedValue([mock]);

            const result = await productRecordModel.get();

            expect(result).toEqual(mock);
            expect(db.query).toHaveBeenCalledWith(expect.stringContaining("FROM product_records pr"));
        });
    });

    describe("getById", () => {
        it("debería retornar un registro por id", async () => {
            const mock = [{ id_record: 1 }];
            db.query.mockResolvedValue([mock]);

            const result = await productRecordModel.getById(1);

            expect(result).toEqual(mock[0]);
        });

        it("debería retornar null si no existe", async () => {
            db.query.mockResolvedValue([[]]);

            const result = await productRecordModel.getById(999);

            expect(result).toBeNull();
        });
    });

    describe("create", () => {
        it("debería crear un registro", async () => {
            const mock = { affectedRows: 1, insertId: 1 };
            db.query.mockResolvedValue([mock]);
            const data = { id_product: 1, id_image: 1, id_category: 1, is_active: 1 };

            const result = await productRecordModel.create(data);

            expect(result).toEqual(mock);
            expect(db.query).toHaveBeenCalledWith(
                expect.stringContaining("INSERT INTO product_records"),
                Object.values(data)
            );
        });
    });

    describe("update", () => {
        it("debería actualizar un registro", async () => {
            const mock = { affectedRows: 1 };
            db.query.mockResolvedValue([mock]);

            const result = await productRecordModel.update(1, { is_active: 0 });

            expect(result).toEqual(mock);
            expect(db.query).toHaveBeenCalledWith(
                "UPDATE product_records SET is_active = ? WHERE id_record = ?",
                [0, 1]
            );
        });

        it("debería retornar null si no hay campos", async () => {
            const result = await productRecordModel.update(1, {});

            expect(result).toBeNull();
        });
    });

    describe("delete", () => {
        it("debería eliminar un registro", async () => {
            const mock = { affectedRows: 1 };
            db.query.mockResolvedValue([mock]);

            const result = await productRecordModel.delete(1);

            expect(result).toEqual(mock);
            expect(db.query).toHaveBeenCalledWith(
                "DELETE FROM product_records WHERE id_record = ?",
                [1]
            );
        });
    });

    describe("getByCategory", () => {
        it("debería retornar registros por categoría", async () => {
            const mock = [{ id_record: 1 }];
            db.query.mockResolvedValue([mock]);

            const result = await productRecordModel.getByCategory(1);

            expect(result).toEqual(mock);
            expect(db.query).toHaveBeenCalledWith(
                expect.stringContaining("WHERE pr.id_category = ?"),
                [1]
            );
        });
    });

    describe("getByProduct", () => {
        it("debería retornar registros por producto", async () => {
            const mock = [{ id_record: 1 }];
            db.query.mockResolvedValue([mock]);

            const result = await productRecordModel.getByProduct(1);

            expect(result).toEqual(mock);
            expect(db.query).toHaveBeenCalledWith(
                expect.stringContaining("WHERE pr.id_product = ?"),
                [1]
            );
        });
    });

    describe("getByActive", () => {
        it("debería retornar registros activos", async () => {
            const mock = [{ id_record: 1, is_active: 1 }];
            db.query.mockResolvedValue([mock]);

            const result = await productRecordModel.getByActive();

            expect(result).toEqual(mock);
            expect(db.query).toHaveBeenCalledWith(
                expect.stringContaining("WHERE pr.is_active = 1")
            );
        });
    });

    describe("getByInactive", () => {
        it("debería retornar registros inactivos", async () => {
            const mock = [{ id_record: 1, is_active: 0 }];
            db.query.mockResolvedValue([mock]);

            const result = await productRecordModel.getByInactive();

            expect(result).toEqual(mock);
            expect(db.query).toHaveBeenCalledWith(
                expect.stringContaining("WHERE pr.is_active = 0")
            );
        });
    });
});
