import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { db } from "../../config/mysql.js";
import { userModel } from "../../models/userModel.js";

const TEST_EMAIL = "test_user_";
let createdId;

async function cleanup() {
    await db.query("DELETE FROM users WHERE email LIKE ?", [`${TEST_EMAIL}%`]);
}

describe("userModel", () => {
    beforeEach(async () => {
        await cleanup();
    });

    afterEach(async () => {
        if (createdId) {
            await db.query("DELETE FROM users WHERE id_user = ?", [createdId]);
            createdId = null;
        }
        await cleanup();
    });

    it("create() inserts a user", async () => {
        const data = {
            first_name: "Test",
            last_name: "User",
            email: `${TEST_EMAIL}create`,
            password: "hashed_password_123",
        };
        const result = await userModel.create(data);
        expect(result).toBeDefined();
        expect(result.affectedRows).toBe(1);
        expect(result.insertId).toBeGreaterThan(0);
        createdId = result.insertId;
    });

    it("getById() returns the created user", async () => {
        const data = {
            first_name: "Get",
            last_name: "ById",
            email: `${TEST_EMAIL}getById`,
            password: "hashed_password_123",
        };
        const result = await userModel.create(data);
        createdId = result.insertId;

        const user = await userModel.getById(createdId);
        expect(user).not.toBeNull();
        expect(user.id_user).toBe(createdId);
        expect(user.email).toBe(data.email);
    });

    it("getById() returns null for non-existent id", async () => {
        const user = await userModel.getById(999999);
        expect(user).toBeNull();
    });

    it("get() returns all users", async () => {
        const data = {
            first_name: "Get",
            last_name: "All",
            email: `${TEST_EMAIL}get`,
            password: "hashed_password_123",
        };
        const result = await userModel.create(data);
        createdId = result.insertId;

        const users = await userModel.get();
        expect(Array.isArray(users)).toBe(true);
        expect(users.some((u) => u.id_user === createdId)).toBe(true);
    });

    it("update() changes user fields", async () => {
        const data = {
            first_name: "Update",
            last_name: "Old",
            email: `${TEST_EMAIL}update`,
            password: "hashed_password_123",
        };
        const result = await userModel.create(data);
        createdId = result.insertId;

        const updateResult = await userModel.update(createdId, { first_name: "New" });
        expect(updateResult.affectedRows).toBe(1);

        const updated = await userModel.getById(createdId);
        expect(updated.first_name).toBe("New");
    });

    it("update() returns null with empty data", async () => {
        const data = {
            first_name: "Empty",
            last_name: "Update",
            email: `${TEST_EMAIL}update_empty`,
            password: "hashed_password_123",
        };
        const result = await userModel.create(data);
        createdId = result.insertId;

        const updateResult = await userModel.update(createdId, {});
        expect(updateResult).toBeNull();
    });

    it("delete() removes the user", async () => {
        const data = {
            first_name: "Delete",
            last_name: "User",
            email: `${TEST_EMAIL}delete`,
            password: "hashed_password_123",
        };
        const result = await userModel.create(data);
        const id = result.insertId;

        const deleteResult = await userModel.delete(id);
        expect(deleteResult.affectedRows).toBe(1);

        const user = await userModel.getById(id);
        expect(user).toBeNull();
        createdId = null;
    });

    it("getByEmail() returns user by email", async () => {
        const email = `${TEST_EMAIL}getByEmail`;
        const data = {
            first_name: "Email",
            last_name: "User",
            email,
            password: "hashed_password_123",
        };
        const result = await userModel.create(data);
        createdId = result.insertId;

        const user = await userModel.getByEmail(email);
        expect(user).not.toBeNull();
        expect(user.email).toBe(email);
    });

    it("getByEmail() returns null for non-existent email", async () => {
        const user = await userModel.getByEmail(`${TEST_EMAIL}nonexistent`);
        expect(user).toBeNull();
    });

    it("getByName() returns user by name", async () => {
        const name = "FindMe";
        const data = {
            first_name: name,
            last_name: "User",
            email: `${TEST_EMAIL}getByName`,
            password: "hashed_password_123",
        };
        const result = await userModel.create(data);
        createdId = result.insertId;

        const user = await userModel.getByName(name);
        expect(user).not.toBeNull();
        expect(user.first_name).toBe(name);
    });

    it("getByName() returns null for non-existent name", async () => {
        const user = await userModel.getByName("NonExistentName");
        expect(user).toBeNull();
    });
});
