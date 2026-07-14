import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { db } from "../../config/mysql.js";
import { productModel } from "../../models/productModel.js";

const TEST_NAME = "test_product_";
let createdIds = [];

async function cleanup() {
    for (const id of createdIds) {
        await db.query("DELETE FROM products WHERE id_product = ?", [id]);
    }
    createdIds = [];
    await db.query("DELETE FROM products WHERE name LIKE ?", [`${TEST_NAME}%`]);
}

describe("productModel", () => {
    beforeEach(async () => {
        await cleanup();
    });

    afterEach(async () => {
        await cleanup();
    });

    it("create() inserts a product", async () => {
        const data = { name: `${TEST_NAME}create`, price: 1000 };
        const result = await productModel.create(data);
        expect(result).toBeDefined();
        expect(result.affectedRows).toBe(1);
        expect(result.insertId).toBeGreaterThan(0);
        createdIds.push(result.insertId);
    });

    it("getById() returns the created product", async () => {
        const data = { name: `${TEST_NAME}getById`, price: 2000 };
        const result = await productModel.create(data);
        createdIds.push(result.insertId);

        const product = await productModel.getById(result.insertId);
        expect(product).not.toBeNull();
        expect(product.id_product).toBe(result.insertId);
        expect(product.name).toBe(data.name);
        expect(Number(product.price)).toBe(data.price);
    });

    it("getById() returns null for non-existent id", async () => {
        const product = await productModel.getById(999999);
        expect(product).toBeNull();
    });

    it("get() returns all products", async () => {
        const data = { name: `${TEST_NAME}get`, price: 3000 };
        const result = await productModel.create(data);
        createdIds.push(result.insertId);

        const products = await productModel.get();
        expect(Array.isArray(products)).toBe(true);
        expect(products.some((p) => p.id_product === result.insertId)).toBe(true);
    });

    it("update() changes product fields", async () => {
        const data = { name: `${TEST_NAME}update_old`, price: 4000 };
        const result = await productModel.create(data);
        createdIds.push(result.insertId);

        const updateResult = await productModel.update(result.insertId, { name: `${TEST_NAME}update_new`, price: 5000 });
        expect(updateResult.affectedRows).toBe(1);

        const updated = await productModel.getById(result.insertId);
        expect(updated.name).toBe(`${TEST_NAME}update_new`);
        expect(Number(updated.price)).toBe(5000);
    });

    it("update() returns null with empty data", async () => {
        const data = { name: `${TEST_NAME}update_empty`, price: 6000 };
        const result = await productModel.create(data);
        createdIds.push(result.insertId);

        const updateResult = await productModel.update(result.insertId, {});
        expect(updateResult).toBeNull();
    });

    it("delete() removes the product", async () => {
        const data = { name: `${TEST_NAME}delete_${Date.now()}`, price: 7000 };
        const result = await productModel.create(data);

        const deleteResult = await productModel.delete(result.insertId);
        expect(deleteResult.affectedRows).toBe(1);

        const product = await productModel.getById(result.insertId);
        expect(product).toBeNull();
    });

    it("getByName() returns product by name", async () => {
        const name = `${TEST_NAME}getByName`;
        const data = { name, price: 8000 };
        const result = await productModel.create(data);
        createdIds.push(result.insertId);

        const product = await productModel.getByName(name);
        expect(product).not.toBeNull();
        expect(product.name).toBe(name);
    });

    it("getByName() returns null for non-existent name", async () => {
        const product = await productModel.getByName(`${TEST_NAME}nonexistent`);
        expect(product).toBeNull();
    });
});
