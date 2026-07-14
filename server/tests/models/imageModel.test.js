import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { db } from "../../config/mysql.js";
import { imageModel } from "../../models/imageModel.js";

const TEST_PREFIX = "test_image_";
let createdId;

async function cleanup() {
    await db.query("DELETE FROM images WHERE public_id LIKE ?", [`${TEST_PREFIX}%`]);
}

describe("imageModel", () => {
    beforeEach(async () => {
        await cleanup();
    });

    afterEach(async () => {
        if (createdId) {
            await db.query("DELETE FROM images WHERE id_image = ?", [createdId]);
            createdId = null;
        }
        await cleanup();
    });

    it("create() inserts an image", async () => {
        const data = {
            image_url: `${TEST_PREFIX}url.jpg`,
            public_id: `${TEST_PREFIX}public`,
            alt: `${TEST_PREFIX}alt`,
        };
        const result = await imageModel.create(data);
        expect(result).toBeDefined();
        expect(result.affectedRows).toBe(1);
        expect(result.insertId).toBeGreaterThan(0);
        createdId = result.insertId;
    });

    it("getById() returns the created image", async () => {
        const data = {
            image_url: `${TEST_PREFIX}getById_url.jpg`,
            public_id: `${TEST_PREFIX}getById`,
            alt: `${TEST_PREFIX}getById_alt`,
        };
        const result = await imageModel.create(data);
        createdId = result.insertId;

        const image = await imageModel.getById(createdId);
        expect(image).not.toBeNull();
        expect(image.id_image).toBe(createdId);
        expect(image.public_id).toBe(data.public_id);
    });

    it("getById() returns null for non-existent id", async () => {
        const image = await imageModel.getById(999999);
        expect(image).toBeNull();
    });

    it("get() returns all images", async () => {
        const data = {
            image_url: `${TEST_PREFIX}get_url.jpg`,
            public_id: `${TEST_PREFIX}get`,
            alt: `${TEST_PREFIX}get_alt`,
        };
        const result = await imageModel.create(data);
        createdId = result.insertId;

        const images = await imageModel.get();
        expect(Array.isArray(images)).toBe(true);
        expect(images.some((i) => i.id_image === createdId)).toBe(true);
    });

    it("update() changes image fields", async () => {
        const data = {
            image_url: `${TEST_PREFIX}update_old.jpg`,
            public_id: `${TEST_PREFIX}update_old`,
            alt: `${TEST_PREFIX}update_old_alt`,
        };
        const result = await imageModel.create(data);
        createdId = result.insertId;

        const updateResult = await imageModel.update(createdId, { alt: `${TEST_PREFIX}update_new_alt` });
        expect(updateResult.affectedRows).toBe(1);

        const updated = await imageModel.getById(createdId);
        expect(updated.alt).toBe(`${TEST_PREFIX}update_new_alt`);
    });

    it("update() returns null with empty data", async () => {
        const data = {
            image_url: `${TEST_PREFIX}update_empty.jpg`,
            public_id: `${TEST_PREFIX}update_empty`,
            alt: `${TEST_PREFIX}update_empty_alt`,
        };
        const result = await imageModel.create(data);
        createdId = result.insertId;

        const updateResult = await imageModel.update(createdId, {});
        expect(updateResult).toBeNull();
    });

    it("delete() removes the image", async () => {
        const data = {
            image_url: `${TEST_PREFIX}delete.jpg`,
            public_id: `${TEST_PREFIX}delete`,
            alt: `${TEST_PREFIX}delete_alt`,
        };
        const result = await imageModel.create(data);
        const id = result.insertId;

        const deleteResult = await imageModel.delete(id);
        expect(deleteResult.affectedRows).toBe(1);

        const image = await imageModel.getById(id);
        expect(image).toBeNull();
        createdId = null;
    });

    it("getByPublicId() returns image by public_id", async () => {
        const publicId = `${TEST_PREFIX}getByPublicId`;
        const data = {
            image_url: `${TEST_PREFIX}getByPublicId.jpg`,
            public_id: publicId,
            alt: `${TEST_PREFIX}getByPublicId_alt`,
        };
        const result = await imageModel.create(data);
        createdId = result.insertId;

        const image = await imageModel.getByPublicId(publicId);
        expect(image).not.toBeNull();
        expect(image.public_id).toBe(publicId);
    });

    it("getByPublicId() returns null for non-existent public_id", async () => {
        const image = await imageModel.getByPublicId(`${TEST_PREFIX}nonexistent`);
        expect(image).toBeNull();
    });
});
