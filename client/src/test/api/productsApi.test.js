import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../services/handleFetch.js", () => ({
    handleFetch: vi.fn(),
}));

import { handleFetch } from "../../services/handleFetch.js";
import { productsApi } from "../../api/productsApi.js";

const API_URL = "http://localhost:3001/api/products";
const HEADERS = { "Content-Type": "application/json" };

describe("productsApi", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("get", () => {
        it("debería llamar handleFetch con la URL correcta", async () => {
            handleFetch.mockResolvedValue([{ id: 1, name: "Test" }]);

            const result = await productsApi.get();

            expect(handleFetch).toHaveBeenCalledWith(API_URL);
            expect(result).toEqual([{ id: 1, name: "Test" }]);
        });
    });

    describe("getById", () => {
        it("debería llamar handleFetch con URL y GET", async () => {
            handleFetch.mockResolvedValue({ id: 1, name: "Test" });

            const result = await productsApi.getById(1);

            expect(handleFetch).toHaveBeenCalledWith(`${API_URL}/1`, {
                method: "GET",
                headers: HEADERS,
            });
            expect(result).toEqual({ id: 1, name: "Test" });
        });
    });

    describe("getByName", () => {
        it("debería llamar handleFetch con URL del nombre", async () => {
            const name = "Artisan Cup";
            handleFetch.mockResolvedValue([{ id: 1, name }]);

            const result = await productsApi.getByName(name);

            expect(handleFetch).toHaveBeenCalledWith(`${API_URL}/name/${name}`, {
                method: "GET",
                headers: HEADERS,
            });
            expect(result).toEqual([{ id: 1, name }]);
        });
    });

    describe("create", () => {
        it("debería llamar handleFetch con POST y body", async () => {
            const data = { name: "Nuevo Producto", price: 25 };
            handleFetch.mockResolvedValue({ id: 1, ...data });

            const result = await productsApi.create(data);

            expect(handleFetch).toHaveBeenCalledWith(API_URL, {
                method: "POST",
                headers: HEADERS,
                body: JSON.stringify(data),
            });
            expect(result).toEqual({ id: 1, name: "Nuevo Producto", price: 25 });
        });
    });

    describe("update", () => {
        it("debería llamar handleFetch con PATCH y body", async () => {
            const data = { name: "Actualizado", price: 30 };
            handleFetch.mockResolvedValue({ id: 1, ...data });

            const result = await productsApi.update(1, data);

            expect(handleFetch).toHaveBeenCalledWith(`${API_URL}/1`, {
                method: "PATCH",
                headers: HEADERS,
                body: JSON.stringify(data),
            });
            expect(result).toEqual({ id: 1, name: "Actualizado", price: 30 });
        });
    });

    describe("delete", () => {
        it("debería llamar handleFetch con DELETE", async () => {
            handleFetch.mockResolvedValue({ deleted: true });

            const result = await productsApi.delete(1);

            expect(handleFetch).toHaveBeenCalledWith(`${API_URL}/1`, {
                method: "DELETE",
            });
            expect(result).toEqual({ deleted: true });
        });
    });
});
