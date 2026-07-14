import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { db } from "../../config/mysql.js";
import { categoryModel } from "../../models/categoryModel.js";

const TEST_PREFIX = "test_category_";
let createdId;

async function cleanup() {
    await db.query("DELETE FROM categories WHERE name LIKE ?", [`${TEST_PREFIX}%`]);
}

describe("categoryModel", () => {
    beforeEach(async () => {
        await cleanup();
    });

    afterEach(async () => {
        if (createdId) {
            await db.query("DELETE FROM categories WHERE id_category = ?", [createdId]);
            createdId = null;
        }
        await cleanup();
    });

    it("create() inserts a category and returns result", async () => {
        const name = `${TEST_PREFIX}create`;
        const result = await categoryModel.create(name);
        expect(result).toBeDefined();
        expect(result.affectedRows).toBe(1);
        expect(result.insertId).toBeGreaterThan(0);
        createdId = result.insertId;
    });

    it("getById() returns the created category", async () => {
        const name = `${TEST_PREFIX}getById`;
        const result = await categoryModel.create(name);
        createdId = result.insertId;

        const category = await categoryModel.getById(createdId);
        expect(category).not.toBeNull();
        expect(category.id_category).toBe(createdId);
        expect(category.name).toBe(name);
    });

    it("getById() returns null for non-existent id", async () => {
        const category = await categoryModel.getById(999999);
        expect(category).toBeNull();
    });

    it("get() returns all categories", async () => {
        const name = `${TEST_PREFIX}get`;
        const result = await categoryModel.create(name);
        createdId = result.insertId;

        const categories = await categoryModel.get();
        expect(Array.isArray(categories)).toBe(true);
        expect(categories.some((c) => c.id_category === createdId)).toBe(true);
    });

    it("update() changes the name", async () => {
        const name = `${TEST_PREFIX}update_old`;
        const result = await categoryModel.create(name);
        createdId = result.insertId;

        const newName = `${TEST_PREFIX}update_new`;
        const updateResult = await categoryModel.update(createdId, newName);
        expect(updateResult.affectedRows).toBe(1);

        const updated = await categoryModel.getById(createdId);
        expect(updated.name).toBe(newName);
    });

    it("delete() removes the category", async () => {
        const name = `${TEST_PREFIX}delete`;
        const result = await categoryModel.create(name);
        const id = result.insertId;

        const deleteResult = await categoryModel.delete(id);
        expect(deleteResult.affectedRows).toBe(1);

        const category = await categoryModel.getById(id);
        expect(category).toBeNull();
        createdId = null;
    });
});
