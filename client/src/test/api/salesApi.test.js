import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../services/handleFetch.js", () => ({
    handleFetch: vi.fn(),
}));

import { handleFetch } from "../../services/handleFetch.js";
import { salesApi } from "../../api/salesApi.js";

const API_URL = "http://localhost:3001/api/sales";
const HEADERS = { "Content-Type": "application/json" };

describe("salesApi", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("get", () => {
        it("debería llamar handleFetch con la URL correcta", async () => {
            handleFetch.mockResolvedValue([{ id: 1 }]);

            const result = await salesApi.get();

            expect(handleFetch).toHaveBeenCalledWith(API_URL);
            expect(result).toEqual([{ id: 1 }]);
        });
    });

    describe("getById", () => {
        it("debería llamar handleFetch con URL y GET", async () => {
            handleFetch.mockResolvedValue({ id: 1 });

            const result = await salesApi.getById(1);

            expect(handleFetch).toHaveBeenCalledWith(`${API_URL}/1`, {
                method: "GET",
                headers: HEADERS,
            });
            expect(result).toEqual({ id: 1 });
        });
    });

    describe("getByUser", () => {
        it("debería llamar handleFetch con URL de usuario", async () => {
            const userId = 4;
            handleFetch.mockResolvedValue([{ id: 1, userId }]);

            const result = await salesApi.getByUser(userId);

            expect(handleFetch).toHaveBeenCalledWith(`${API_URL}/user/${userId}`, {
                method: "GET",
                headers: HEADERS,
            });
            expect(result).toEqual([{ id: 1, userId }]);
        });
    });

    describe("getByProduct", () => {
        it("debería llamar handleFetch con URL de producto", async () => {
            const productId = 2;
            handleFetch.mockResolvedValue([{ id: 1, productId }]);

            const result = await salesApi.getByProduct(productId);

            expect(handleFetch).toHaveBeenCalledWith(`${API_URL}/product/${productId}`, {
                method: "GET",
                headers: HEADERS,
            });
            expect(result).toEqual([{ id: 1, productId }]);
        });
    });

    describe("create", () => {
        it("debería llamar handleFetch con POST y body", async () => {
            const data = { userId: 1, productId: 2, quantity: 3 };
            handleFetch.mockResolvedValue({ id: 1, ...data });

            const result = await salesApi.create(data);

            expect(handleFetch).toHaveBeenCalledWith(API_URL, {
                method: "POST",
                headers: HEADERS,
                body: JSON.stringify(data),
            });
            expect(result).toEqual({ id: 1, userId: 1, productId: 2, quantity: 3 });
        });
    });

    describe("delete", () => {
        it("debería llamar handleFetch con DELETE", async () => {
            handleFetch.mockResolvedValue({ deleted: true });

            const result = await salesApi.delete(1);

            expect(handleFetch).toHaveBeenCalledWith(`${API_URL}/1`, {
                method: "DELETE",
            });
            expect(result).toEqual({ deleted: true });
        });
    });
});
