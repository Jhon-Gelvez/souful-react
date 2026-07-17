import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../services/handleFetch.js", () => ({
    handleFetch: vi.fn(),
}));

import { handleFetch } from "../../services/handleFetch.js";
import { usersApi } from "../../api/usersApi.js";

const API_URL = "http://localhost:3001/api/users";
const HEADERS = { "Content-Type": "application/json" };

describe("usersApi", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("get", () => {
        it("debería llamar handleFetch con la URL correcta", async () => {
            handleFetch.mockResolvedValue([{ id: 1, name: "Test" }]);

            const result = await usersApi.get();

            expect(handleFetch).toHaveBeenCalledWith(API_URL);
            expect(result).toEqual([{ id: 1, name: "Test" }]);
        });
    });

    describe("getById", () => {
        it("debería llamar handleFetch con URL y GET", async () => {
            handleFetch.mockResolvedValue({ id: 1, name: "Test" });

            const result = await usersApi.getById(1);

            expect(handleFetch).toHaveBeenCalledWith(`${API_URL}/1`, {
                method: "GET",
                headers: HEADERS,
            });
            expect(result).toEqual({ id: 1, name: "Test" });
        });
    });

    describe("getByEmail", () => {
        it("debería llamar handleFetch con URL del email", async () => {
            const email = "test@example.com";
            handleFetch.mockResolvedValue({ id: 1, email });

            const result = await usersApi.getByEmail(email);

            expect(handleFetch).toHaveBeenCalledWith(`${API_URL}/email/${email}`, {
                method: "GET",
                headers: HEADERS,
            });
            expect(result).toEqual({ id: 1, email });
        });
    });

    describe("getByName", () => {
        it("debería llamar handleFetch con URL del nombre", async () => {
            const name = "John";
            handleFetch.mockResolvedValue([{ id: 1, name }]);

            const result = await usersApi.getByName(name);

            expect(handleFetch).toHaveBeenCalledWith(`${API_URL}/name/${name}`, {
                method: "GET",
                headers: HEADERS,
            });
            expect(result).toEqual([{ id: 1, name }]);
        });
    });

    describe("create", () => {
        it("debería llamar handleFetch con POST y body", async () => {
            const data = { name: "Jane", email: "jane@example.com" };
            handleFetch.mockResolvedValue({ id: 1, ...data });

            const result = await usersApi.create(data);

            expect(handleFetch).toHaveBeenCalledWith(API_URL, {
                method: "POST",
                headers: HEADERS,
                body: JSON.stringify(data),
            });
            expect(result).toEqual({ id: 1, name: "Jane", email: "jane@example.com" });
        });
    });

    describe("update", () => {
        it("debería llamar handleFetch con PATCH y body", async () => {
            const data = { name: "Jane Updated" };
            handleFetch.mockResolvedValue({ id: 1, ...data });

            const result = await usersApi.update(1, data);

            expect(handleFetch).toHaveBeenCalledWith(`${API_URL}/1`, {
                method: "PATCH",
                headers: HEADERS,
                body: JSON.stringify(data),
            });
            expect(result).toEqual({ id: 1, name: "Jane Updated" });
        });
    });

    describe("delete", () => {
        it("debería llamar handleFetch con DELETE", async () => {
            handleFetch.mockResolvedValue({ deleted: true });

            const result = await usersApi.delete(1);

            expect(handleFetch).toHaveBeenCalledWith(`${API_URL}/1`, {
                method: "DELETE",
            });
            expect(result).toEqual({ deleted: true });
        });
    });
});
