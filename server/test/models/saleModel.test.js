import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("../../config/mysql.js", () => ({
    db: { query: vi.fn() },
}));

import { db } from "../../config/mysql.js";
import { saleModel } from "../../models/saleModel.js";

describe("saleModel", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("get", () => {
        it("debería retornar todas las ventas con JOINs", async () => {
            const mock = [{ id_sale: 1, first_name: "John" }];
            db.query.mockResolvedValue([mock]);

            const result = await saleModel.get();

            expect(result).toEqual(mock);
            expect(db.query).toHaveBeenCalledWith(expect.stringContaining("SELECT"));
            expect(db.query).toHaveBeenCalledWith(expect.stringContaining("FROM sales s"));
        });
    });

    describe("getById", () => {
        it("debería retornar una venta por id", async () => {
            const mock = [{ id_sale: 1 }];
            db.query.mockResolvedValue([mock]);

            const result = await saleModel.getById(1);

            expect(result).toEqual(mock[0]);
        });

        it("debería retornar null si no existe", async () => {
            db.query.mockResolvedValue([[]]);

            const result = await saleModel.getById(999);

            expect(result).toBeNull();
        });
    });

    describe("create", () => {
        it("debería crear una venta", async () => {
            const mock = { affectedRows: 1, insertId: 1 };
            db.query.mockResolvedValue([mock]);
            const data = { id_user: 1, id_record: 1 };

            const result = await saleModel.create(data);

            expect(result).toEqual(mock);
            expect(db.query).toHaveBeenCalledWith(
                expect.stringContaining("INSERT INTO sales"),
                [1, 1]
            );
        });
    });

    describe("delete", () => {
        it("debería eliminar una venta", async () => {
            const mock = { affectedRows: 1 };
            db.query.mockResolvedValue([mock]);

            const result = await saleModel.delete(1);

            expect(result).toEqual(mock);
            expect(db.query).toHaveBeenCalledWith(
                "DELETE FROM sales WHERE id_sale = ?",
                [1]
            );
        });
    });

    describe("getByUser", () => {
        it("debería retornar ventas por usuario", async () => {
            const mock = [{ id_sale: 1, product_name: "Test" }];
            db.query.mockResolvedValue([mock]);

            const result = await saleModel.getByUser(1);

            expect(result).toEqual(mock);
            expect(db.query).toHaveBeenCalledWith(
                expect.stringContaining("WHERE s.id_user = ?"),
                [1]
            );
        });
    });

    describe("getByProduct", () => {
        it("debería retornar ventas por producto", async () => {
            const mock = [{ id_sale: 1 }];
            db.query.mockResolvedValue([mock]);

            const result = await saleModel.getByProduct(1);

            expect(result).toEqual(mock);
            expect(db.query).toHaveBeenCalledWith(
                expect.stringContaining("WHERE pr.id_record = ?"),
                [1]
            );
        });
    });
});
