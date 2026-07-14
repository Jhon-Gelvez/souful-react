import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { db } from "../../config/mysql.js";
import { productRecordModel } from "../../models/productRecordModel.js";
import { productModel } from "../../models/productModel.js";
import { imageModel } from "../../models/imageModel.js";
import { categoryModel } from "../../models/categoryModel.js";

const TEST_PREFIX = "test_pr_";
let createdRecordId;
let productId;
let imageId;
let categoryId;

async function cleanup() {
    await db.query("DELETE FROM product_records WHERE id_product IN (SELECT id_product FROM products WHERE name LIKE ?)", [`${TEST_PREFIX}%`]);
    await db.query("DELETE FROM products WHERE name LIKE ?", [`${TEST_PREFIX}%`]);
    await db.query("DELETE FROM images WHERE public_id LIKE ?", [`${TEST_PREFIX}%`]);
    await db.query("DELETE FROM categories WHERE name LIKE ?", [`${TEST_PREFIX}%`]);
}

async function createDependencies() {
    const catResult = await categoryModel.create(`${TEST_PREFIX}category`);
    categoryId = catResult.insertId;

    const imgResult = await imageModel.create({
        image_url: `${TEST_PREFIX}image.jpg`,
        public_id: `${TEST_PREFIX}image`,
        alt: `${TEST_PREFIX}alt`,
    });
    imageId = imgResult.insertId;

    const prodResult = await productModel.create({
        name: `${TEST_PREFIX}product`,
        price: 1000,
    });
    productId = prodResult.insertId;
}

describe("productRecordModel", () => {
    beforeEach(async () => {
        await cleanup();
        await createDependencies();
    });

    afterEach(async () => {
        if (createdRecordId) {
            await db.query("DELETE FROM product_records WHERE id_record = ?", [createdRecordId]);
            createdRecordId = null;
        }
        await cleanup();
    });

    it("create() inserts a product record", async () => {
        const data = {
            id_product: productId,
            id_image: imageId,
            id_category: categoryId,
            is_active: 1,
        };
        const result = await productRecordModel.create(data);
        expect(result).toBeDefined();
        expect(result.affectedRows).toBe(1);
        expect(result.insertId).toBeGreaterThan(0);
        createdRecordId = result.insertId;
    });

    it("getById() returns the created record with joins", async () => {
        const data = {
            id_product: productId,
            id_image: imageId,
            id_category: categoryId,
            is_active: 1,
        };
        const result = await productRecordModel.create(data);
        createdRecordId = result.insertId;

        const record = await productRecordModel.getById(createdRecordId);
        expect(record).not.toBeNull();
        expect(record.id_record).toBe(createdRecordId);
        expect(record.product_name).toBe(`${TEST_PREFIX}product`);
        expect(record.category_name).toBe(`${TEST_PREFIX}category`);
    });

    it("getById() returns null for non-existent id", async () => {
        const record = await productRecordModel.getById(999999);
        expect(record).toBeNull();
    });

    it("get() returns all records", async () => {
        const data = {
            id_product: productId,
            id_image: imageId,
            id_category: categoryId,
            is_active: 1,
        };
        const result = await productRecordModel.create(data);
        createdRecordId = result.insertId;

        const records = await productRecordModel.get();
        expect(Array.isArray(records)).toBe(true);
        expect(records.some((r) => r.id_record === createdRecordId)).toBe(true);
    });

    it("update() changes record fields", async () => {
        const data = {
            id_product: productId,
            id_image: imageId,
            id_category: categoryId,
            is_active: 1,
        };
        const result = await productRecordModel.create(data);
        createdRecordId = result.insertId;

        const updateResult = await productRecordModel.update(createdRecordId, { is_active: 0 });
        expect(updateResult.affectedRows).toBe(1);

        const updated = await productRecordModel.getById(createdRecordId);
        expect(updated.is_active).toBe(0);
    });

    it("update() returns null with empty data", async () => {
        const data = {
            id_product: productId,
            id_image: imageId,
            id_category: categoryId,
            is_active: 1,
        };
        const result = await productRecordModel.create(data);
        createdRecordId = result.insertId;

        const updateResult = await productRecordModel.update(createdRecordId, {});
        expect(updateResult).toBeNull();
    });

    it("delete() removes the record", async () => {
        const data = {
            id_product: productId,
            id_image: imageId,
            id_category: categoryId,
            is_active: 1,
        };
        const result = await productRecordModel.create(data);
        const id = result.insertId;

        const deleteResult = await productRecordModel.delete(id);
        expect(deleteResult.affectedRows).toBe(1);

        const record = await productRecordModel.getById(id);
        expect(record).toBeNull();
        createdRecordId = null;
    });

    it("getByCategory() returns records by category", async () => {
        const data = {
            id_product: productId,
            id_image: imageId,
            id_category: categoryId,
            is_active: 1,
        };
        const result = await productRecordModel.create(data);
        createdRecordId = result.insertId;

        const records = await productRecordModel.getByCategory(categoryId);
        expect(Array.isArray(records)).toBe(true);
        expect(records.some((r) => r.id_record === createdRecordId)).toBe(true);
    });

    it("getByProduct() returns records by product", async () => {
        const data = {
            id_product: productId,
            id_image: imageId,
            id_category: categoryId,
            is_active: 1,
        };
        const result = await productRecordModel.create(data);
        createdRecordId = result.insertId;

        const records = await productRecordModel.getByProduct(productId);
        expect(Array.isArray(records)).toBe(true);
        expect(records.some((r) => r.id_record === createdRecordId)).toBe(true);
    });
});
