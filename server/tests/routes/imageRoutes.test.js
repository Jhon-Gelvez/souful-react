import { describe, it, expect, vi } from "vitest";

vi.mock("../../controllers/imageController.js", () => ({
    imageController: {
        get: vi.fn(),
        getById: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
        getByPublicId: vi.fn(),
    },
}));

import router from "../../routes/imageRoutes.js";
import { imageController } from "../../controllers/imageController.js";

const getRoutes = () =>
    router.stack
        .filter((layer) => layer.route)
        .map((layer) => ({
            method: Object.keys(layer.route.methods)[0].toUpperCase(),
            path: layer.route.path,
            handler: layer.route.stack[0].handle,
        }));

describe("imageRoutes", () => {
    it("should register 6 routes", () => {
        expect(getRoutes()).toHaveLength(6);
    });

    it("GET /api/images/ should call imageController.get", () => {
        const routes = getRoutes();
        const route = routes.find((r) => r.method === "GET" && r.path === "/api/images/");
        expect(route).toBeDefined();
        expect(route.handler).toBe(imageController.get);
    });

    it("GET /api/images/public/:publicId should call imageController.getByPublicId", () => {
        const routes = getRoutes();
        const route = routes.find((r) => r.method === "GET" && r.path === "/api/images/public/:publicId");
        expect(route).toBeDefined();
        expect(route.handler).toBe(imageController.getByPublicId);
    });

    it("GET /api/images/:id should call imageController.getById", () => {
        const routes = getRoutes();
        const route = routes.find((r) => r.method === "GET" && r.path === "/api/images/:id");
        expect(route).toBeDefined();
        expect(route.handler).toBe(imageController.getById);
    });

    it("POST /api/images/ should call imageController.create", () => {
        const routes = getRoutes();
        const route = routes.find((r) => r.method === "POST" && r.path === "/api/images/");
        expect(route).toBeDefined();
        expect(route.handler).toBe(imageController.create);
    });

    it("PATCH /api/images/:id should call imageController.update", () => {
        const routes = getRoutes();
        const route = routes.find((r) => r.method === "PATCH" && r.path === "/api/images/:id");
        expect(route).toBeDefined();
        expect(route.handler).toBe(imageController.update);
    });

    it("DELETE /api/images/:id should call imageController.delete", () => {
        const routes = getRoutes();
        const route = routes.find((r) => r.method === "DELETE" && r.path === "/api/images/:id");
        expect(route).toBeDefined();
        expect(route.handler).toBe(imageController.delete);
    });

    it("should have /public/:publicId before /:id", () => {
        const routes = getRoutes();
        const publicIndex = routes.findIndex((r) => r.path === "/api/images/public/:publicId");
        const idIndex = routes.findIndex((r) => r.path === "/api/images/:id");
        expect(publicIndex).toBeLessThan(idIndex);
    });
});
