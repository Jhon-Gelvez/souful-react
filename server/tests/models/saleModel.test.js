import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { db } from "../../config/mysql.js";
import { saleModel } from "../../models/saleModel.js";
import { userModel } from "../../models/userModel.js";
import { productModel } from "../../models/productModel.js";
import { imageModel } from "../../models/imageModel.js";
import { categoryModel } from "../../models/categoryModel.js";
import { productRecordModel } from "../../models/productRecordModel.js";

const TEST_PREFIX = "test_sale_";
let createdSaleId;
let userId;
let recordId;
let productId;
let imageId;
let categoryId;

async function cleanup() {
    await db.query("DELETE FROM sales WHERE id_sale = ?", [createdSaleId]);
    await db.query("DELETE FROM product_records WHERE id_record = ?", [recordId]);
    await db.query("DELETE FROM product_records WHERE id_product IN (SELECT id_product FROM products WHERE name LIKE ?)", [`${TEST_PREFIX}%`]);
    await db.query("DELETE FROM products WHERE name LIKE ?", [`${TEST_PREFIX}%`]);
    await db.query("DELETE FROM images WHERE public_id LIKE ?", [`${TEST_PREFIX}%`]);
    await db.query("DELETE FROM categories WHERE name LIKE ?", [`${TEST_PREFIX}%`]);
    await db.query("DELETE FROM users WHERE email LIKE ?", [`${TEST_PREFIX}%`]);
}

async function createDependencies() {
    const userResult = await userModel.create({
        first_name: "Test",
        last_name: "Sale",
        email: `${TEST_PREFIX}user`,
        password: "hashed_password_123",
    });
    userId = userResult.insertId;

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
        price: 15000,
    });
    productId = prodResult.insertId;

    const recordResult = await productRecordModel.create({
        id_product: productId,
        id_image: imageId,
        id_category: categoryId,
        is_active: 1,
    });
    recordId = recordResult.insertId;
}

describe("saleModel", () => {
    beforeEach(async () => {
        await cleanup();
        await createDependencies();
    });

    afterEach(async () => {
        if (createdSaleId) {
            await db.query("DELETE FROM sales WHERE id_sale = ?", [createdSaleId]);
            createdSaleId = null;
        }
    });

    it("create() inserts a sale", async () => {
        const data = {
            id_user: userId,
            id_record: recordId,
            total_paid: 15000,
        };
        const result = await saleModel.create(data);
        expect(result).toBeDefined();
        expect(result.affectedRows).toBe(1);
        expect(result.insertId).toBeGreaterThan(0);
        createdSaleId = result.insertId;
    });

    it("getById() returns the created sale with joins", async () => {
        const data = {
            id_user: userId,
            id_record: recordId,
            total_paid: 15000,
        };
        const result = await saleModel.create(data);
        createdSaleId = result.insertId;

        const sale = await saleModel.getById(createdSaleId);
        expect(sale).not.toBeNull();
        expect(sale.id_sale).toBe(createdSaleId);
        expect(sale.first_name).toBe("Test");
        expect(sale.product_name).toBe(`${TEST_PREFIX}product`);
    });

    it("getById() returns null for non-existent id", async () => {
        const sale = await saleModel.getById(999999);
        expect(sale).toBeNull();
    });

    it("get() returns all sales", async () => {
        const data = {
            id_user: userId,
            id_record: recordId,
            total_paid: 15000,
        };
        const result = await saleModel.create(data);
        createdSaleId = result.insertId;

        const sales = await saleModel.get();
        expect(Array.isArray(sales)).toBe(true);
        expect(sales.some((s) => s.id_sale === createdSaleId)).toBe(true);
    });

    it("delete() removes the sale", async () => {
        const data = {
            id_user: userId,
            id_record: recordId,
            total_paid: 15000,
        };
        const result = await saleModel.create(data);
        const id = result.insertId;

        const deleteResult = await saleModel.delete(id);
        expect(deleteResult.affectedRows).toBe(1);

        const sale = await saleModel.getById(id);
        expect(sale).toBeNull();
        createdSaleId = null;
    });

    it("getByUser() returns sales by user", async () => {
        const data = {
            id_user: userId,
            id_record: recordId,
            total_paid: 15000,
        };
        const result = await saleModel.create(data);
        createdSaleId = result.insertId;

        const sales = await saleModel.getByUser(userId);
        expect(Array.isArray(sales)).toBe(true);
        expect(sales.some((s) => s.id_sale === createdSaleId)).toBe(true);
    });
});
