import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../services/handleFetch.js", () => ({
    handleFetch: vi.fn(),
}));

import { handleFetch } from "../../services/handleFetch.js";
import { productRecordsApi } from "../../api/productRecordsApi.js";

const API_URL = "http://localhost:3001/api/product-records";
const HEADERS = { "Content-Type": "application/json" };

describe("productRecordsApi", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("get", () => {
        it("debería llamar handleFetch con la URL correcta", async () => {
            handleFetch.mockResolvedValue([{ id: 1 }]);

            const result = await productRecordsApi.get();

            expect(handleFetch).toHaveBeenCalledWith(API_URL);
            expect(result).toEqual([{ id: 1 }]);
        });
    });

    describe("getById", () => {
        it("debería llamar handleFetch con URL y GET", async () => {
            handleFetch.mockResolvedValue({ id: 1 });

            const result = await productRecordsApi.getById(1);

            expect(handleFetch).toHaveBeenCalledWith(`${API_URL}/1`, {
                method: "GET",
                headers: HEADERS,
            });
            expect(result).toEqual({ id: 1 });
        });
    });

    describe("getByActive", () => {
        it("debería llamar handleFetch con URL /active", async () => {
            handleFetch.mockResolvedValue([{ id: 1, active: true }]);

            const result = await productRecordsApi.getByActive();

            expect(handleFetch).toHaveBeenCalledWith(`${API_URL}/active`, {
                method: "GET",
                headers: HEADERS,
            });
            expect(result).toEqual([{ id: 1, active: true }]);
        });
    });

    describe("getByInactive", () => {
        it("debería llamar handleFetch con URL /inactive", async () => {
            handleFetch.mockResolvedValue([{ id: 1, active: false }]);

            const result = await productRecordsApi.getByInactive();

            expect(handleFetch).toHaveBeenCalledWith(`${API_URL}/inactive`, {
                method: "GET",
                headers: HEADERS,
            });
            expect(result).toEqual([{ id: 1, active: false }]);
        });
    });

    describe("getByCategory", () => {
        it("debería llamar handleFetch con URL de categoría", async () => {
            const categoryId = 5;
            handleFetch.mockResolvedValue([{ id: 1, categoryId }]);

            const result = await productRecordsApi.getByCategory(categoryId);

            expect(handleFetch).toHaveBeenCalledWith(`${API_URL}/category/${categoryId}`, {
                method: "GET",
                headers: HEADERS,
            });
            expect(result).toEqual([{ id: 1, categoryId }]);
        });
    });

    describe("getByProduct", () => {
        it("debería llamar handleFetch con URL de producto", async () => {
            const productId = 3;
            handleFetch.mockResolvedValue([{ id: 1, productId }]);

            const result = await productRecordsApi.getByProduct(productId);

            expect(handleFetch).toHaveBeenCalledWith(`${API_URL}/product/${productId}`, {
                method: "GET",
                headers: HEADERS,
            });
            expect(result).toEqual([{ id: 1, productId }]);
        });
    });

    describe("create", () => {
        it("debería llamar handleFetch con POST y body", async () => {
            const data = { productId: 1, stock: 10 };
            handleFetch.mockResolvedValue({ id: 1, ...data });

            const result = await productRecordsApi.create(data);

            expect(handleFetch).toHaveBeenCalledWith(API_URL, {
                method: "POST",
                headers: HEADERS,
                body: JSON.stringify(data),
            });
            expect(result).toEqual({ id: 1, productId: 1, stock: 10 });
        });
    });

    describe("update", () => {
        it("debería llamar handleFetch con PATCH y body", async () => {
            const data = { stock: 20 };
            handleFetch.mockResolvedValue({ id: 1, ...data });

            const result = await productRecordsApi.update(1, data);

            expect(handleFetch).toHaveBeenCalledWith(`${API_URL}/1`, {
                method: "PATCH",
                headers: HEADERS,
                body: JSON.stringify(data),
            });
            expect(result).toEqual({ id: 1, stock: 20 });
        });
    });

    describe("delete", () => {
        it("debería llamar handleFetch con DELETE", async () => {
            handleFetch.mockResolvedValue({ deleted: true });

            const result = await productRecordsApi.delete(1);

            expect(handleFetch).toHaveBeenCalledWith(`${API_URL}/1`, {
                method: "DELETE",
            });
            expect(result).toEqual({ deleted: true });
        });
    });
});
