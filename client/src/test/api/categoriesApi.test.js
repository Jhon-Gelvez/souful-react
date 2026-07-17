import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../services/handleFetch.js", () => ({
    handleFetch: vi.fn(),
}));

import { handleFetch } from "../../services/handleFetch.js";
import { categoriesApi } from "../../api/categoriesApi.js";

const API_URL = "http://localhost:3001/api/categories";
const HEADERS = { "Content-Type": "application/json" };

describe("categoriesApi", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("get", () => {
        it("debería llamar handleFetch con la URL correcta", async () => {
            handleFetch.mockResolvedValue([{ id: 1, name: "Test" }]);

            const result = await categoriesApi.get();

            expect(handleFetch).toHaveBeenCalledWith(API_URL);
            expect(result).toEqual([{ id: 1, name: "Test" }]);
        });
    });

    describe("getById", () => {
        it("debería llamar handleFetch con URL y GET", async () => {
            handleFetch.mockResolvedValue({ id: 1, name: "Test" });

            const result = await categoriesApi.getById(1);

            expect(handleFetch).toHaveBeenCalledWith(`${API_URL}/1`, {
                method: "GET",
                headers: HEADERS,
            });
            expect(result).toEqual({ id: 1, name: "Test" });
        });
    });

    describe("create", () => {
        it("debería llamar handleFetch con POST y body", async () => {
            const data = { name: "Nueva" };
            handleFetch.mockResolvedValue({ id: 1, ...data });

            const result = await categoriesApi.create(data);

            expect(handleFetch).toHaveBeenCalledWith(API_URL, {
                method: "POST",
                headers: HEADERS,
                body: JSON.stringify(data),
            });
            expect(result).toEqual({ id: 1, name: "Nueva" });
        });
    });

    describe("update", () => {
        it("debería llamar handleFetch con PATCH y body", async () => {
            const data = { name: "Actualizada" };
            handleFetch.mockResolvedValue({ id: 1, ...data });

            const result = await categoriesApi.update(1, data);

            expect(handleFetch).toHaveBeenCalledWith(`${API_URL}/1`, {
                method: "PATCH",
                headers: HEADERS,
                body: JSON.stringify(data),
            });
            expect(result).toEqual({ id: 1, name: "Actualizada" });
        });
    });

    describe("delete", () => {
        it("debería llamar handleFetch con DELETE", async () => {
            handleFetch.mockResolvedValue({ deleted: true });

            const result = await categoriesApi.delete(1);

            expect(handleFetch).toHaveBeenCalledWith(`${API_URL}/1`, {
                method: "DELETE",
            });
            expect(result).toEqual({ deleted: true });
        });
    });
});
