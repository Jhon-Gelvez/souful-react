import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../services/handleFetch.js", () => ({
    handleFetch: vi.fn(),
}));

import { handleFetch } from "../../services/handleFetch.js";
import { imagesApi } from "../../api/imagesApi.js";

const API_URL = "http://localhost:3001/api/images";
const HEADERS = { "Content-Type": "application/json" };

describe("imagesApi", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("get", () => {
        it("debería llamar handleFetch con la URL correcta", async () => {
            handleFetch.mockResolvedValue([{ id: 1 }]);

            const result = await imagesApi.get();

            expect(handleFetch).toHaveBeenCalledWith(API_URL);
            expect(result).toEqual([{ id: 1 }]);
        });
    });

    describe("getById", () => {
        it("debería llamar handleFetch con URL y GET", async () => {
            handleFetch.mockResolvedValue({ id: 1 });

            const result = await imagesApi.getById(1);

            expect(handleFetch).toHaveBeenCalledWith(`${API_URL}/1`, {
                method: "GET",
                headers: HEADERS,
            });
            expect(result).toEqual({ id: 1 });
        });
    });

    describe("getByPublicId", () => {
        it("debería llamar handleFetch con URL del publicId", async () => {
            const publicId = "sample-image";
            handleFetch.mockResolvedValue({ id: 1, publicId });

            const result = await imagesApi.getByPublicId(publicId);

            expect(handleFetch).toHaveBeenCalledWith(`${API_URL}/public/${publicId}`, {
                method: "GET",
                headers: HEADERS,
            });
            expect(result).toEqual({ id: 1, publicId });
        });
    });

    describe("create", () => {
        it("debería llamar handleFetch con POST y body", async () => {
            const data = { url: "http://example.com/img.jpg" };
            handleFetch.mockResolvedValue({ id: 1, ...data });

            const result = await imagesApi.create(data);

            expect(handleFetch).toHaveBeenCalledWith(API_URL, {
                method: "POST",
                headers: HEADERS,
                body: JSON.stringify(data),
            });
            expect(result).toEqual({ id: 1, url: "http://example.com/img.jpg" });
        });
    });

    describe("update", () => {
        it("debería llamar handleFetch con PATCH y body", async () => {
            const data = { url: "http://example.com/updated.jpg" };
            handleFetch.mockResolvedValue({ id: 1, ...data });

            const result = await imagesApi.update(1, data);

            expect(handleFetch).toHaveBeenCalledWith(`${API_URL}/1`, {
                method: "PATCH",
                headers: HEADERS,
                body: JSON.stringify(data),
            });
            expect(result).toEqual({ id: 1, url: "http://example.com/updated.jpg" });
        });
    });

    describe("delete", () => {
        it("debería llamar handleFetch con DELETE", async () => {
            handleFetch.mockResolvedValue({ deleted: true });

            const result = await imagesApi.delete(1);

            expect(handleFetch).toHaveBeenCalledWith(`${API_URL}/1`, {
                method: "DELETE",
            });
            expect(result).toEqual({ deleted: true });
        });
    });
});
