import { describe, it, expect, vi } from "vitest";

vi.mock("../../controllers/categoryController.js", () => ({
    categoryController: {
        get: vi.fn(),
        getById: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
    },
}));

import router from "../../routes/categoryRoutes.js";
import { categoryController } from "../../controllers/categoryController.js";

const getRoutes = () =>
    router.stack
        .filter((layer) => layer.route)
        .map((layer) => ({
            method: Object.keys(layer.route.methods)[0].toUpperCase(),
            path: layer.route.path,
            handler: layer.route.stack[0].handle,
        }));

describe("categoryRoutes", () => {
    it("should register 5 routes", () => {
        expect(getRoutes()).toHaveLength(5);
    });

    it("GET /api/categories/ should call categoryController.get", () => {
        const routes = getRoutes();
        const route = routes.find((r) => r.method === "GET" && r.path === "/api/categories/");
        expect(route).toBeDefined();
        expect(route.handler).toBe(categoryController.get);
    });

    it("GET /api/categories/:id should call categoryController.getById", () => {
        const routes = getRoutes();
        const route = routes.find((r) => r.method === "GET" && r.path === "/api/categories/:id");
        expect(route).toBeDefined();
        expect(route.handler).toBe(categoryController.getById);
    });

    it("POST /api/categories/ should call categoryController.create", () => {
        const routes = getRoutes();
        const route = routes.find((r) => r.method === "POST" && r.path === "/api/categories/");
        expect(route).toBeDefined();
        expect(route.handler).toBe(categoryController.create);
    });

    it("PATCH /api/categories/:id should call categoryController.update", () => {
        const routes = getRoutes();
        const route = routes.find((r) => r.method === "PATCH" && r.path === "/api/categories/:id");
        expect(route).toBeDefined();
        expect(route.handler).toBe(categoryController.update);
    });

    it("DELETE /api/categories/:id should call categoryController.delete", () => {
        const routes = getRoutes();
        const route = routes.find((r) => r.method === "DELETE" && r.path === "/api/categories/:id");
        expect(route).toBeDefined();
        expect(route.handler).toBe(categoryController.delete);
    });
});
