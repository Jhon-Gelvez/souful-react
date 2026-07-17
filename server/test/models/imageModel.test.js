import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("../../config/mysql.js", () => ({
    db: { query: vi.fn() },
}));

import { db } from "../../config/mysql.js";
import { imageModel } from "../../models/imageModel.js";

describe("imageModel", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("get", () => {
        it("debería retornar todas las imágenes", async () => {
            const mock = [{ id_image: 1, title: "Test" }];
            db.query.mockResolvedValue([mock]);

            const result = await imageModel.get();

            expect(result).toEqual(mock);
            expect(db.query).toHaveBeenCalledWith("SELECT * FROM images");
        });
    });

    describe("getById", () => {
        it("debería retornar una imagen por id", async () => {
            const mock = [{ id_image: 1, title: "Test" }];
            db.query.mockResolvedValue([mock]);

            const result = await imageModel.getById(1);

            expect(result).toEqual(mock[0]);
        });

        it("debería retornar null si no existe", async () => {
            db.query.mockResolvedValue([[]]);

            const result = await imageModel.getById(999);

            expect(result).toBeNull();
        });
    });

    describe("create", () => {
        it("debería crear una imagen", async () => {
            const mock = { affectedRows: 1, insertId: 1 };
            db.query.mockResolvedValue([mock]);
            const data = { title: "Test", alt: "test", image_url: "url", public_id: "pid", file_size: 100, mime_type: "image/png", dimensions: "100x100" };

            const result = await imageModel.create(data);

            expect(result).toEqual(mock);
            expect(db.query).toHaveBeenCalledWith(
                expect.stringContaining("INSERT INTO images"),
                Object.values(data)
            );
        });
    });

    describe("update", () => {
        it("debería actualizar una imagen", async () => {
            const mock = { affectedRows: 1 };
            db.query.mockResolvedValue([mock]);

            const result = await imageModel.update(1, { title: "Updated" });

            expect(result).toEqual(mock);
            expect(db.query).toHaveBeenCalledWith(
                "UPDATE images SET title = ? WHERE id_image = ?",
                ["Updated", 1]
            );
        });

        it("debería retornar null si no hay campos", async () => {
            const result = await imageModel.update(1, {});

            expect(result).toBeNull();
        });
    });

    describe("delete", () => {
        it("debería eliminar una imagen", async () => {
            const mock = { affectedRows: 1 };
            db.query.mockResolvedValue([mock]);

            const result = await imageModel.delete(1);

            expect(result).toEqual(mock);
            expect(db.query).toHaveBeenCalledWith(
                "DELETE FROM images WHERE id_image = ?",
                [1]
            );
        });
    });

    describe("getByPublicId", () => {
        it("debería retornar una imagen por public_id", async () => {
            const mock = [{ id_image: 1, public_id: "abc123" }];
            db.query.mockResolvedValue([mock]);

            const result = await imageModel.getByPublicId("abc123");

            expect(result).toEqual(mock[0]);
        });

        it("debería retornar null si no existe", async () => {
            db.query.mockResolvedValue([[]]);

            const result = await imageModel.getByPublicId("noexiste");

            expect(result).toBeNull();
        });
    });
});
