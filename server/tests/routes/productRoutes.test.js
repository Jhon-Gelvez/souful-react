import { describe, it, expect, vi } from "vitest";

vi.mock("../../controllers/productController.js", () => ({
    productController: {
        get: vi.fn(),
        getById: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
        getByName: vi.fn(),
    },
}));

import router from "../../routes/productRoutes.js";
import { productController } from "../../controllers/productController.js";

const getRoutes = () =>
    router.stack
        .filter((layer) => layer.route)
        .map((layer) => ({
            method: Object.keys(layer.route.methods)[0].toUpperCase(),
            path: layer.route.path,
            handler: layer.route.stack[0].handle,
        }));

describe("productRoutes", () => {
    it("should register 6 routes", () => {
        expect(getRoutes()).toHaveLength(6);
    });

    it("GET /api/products/ should call productController.get", () => {
        const routes = getRoutes();
        const route = routes.find((r) => r.method === "GET" && r.path === "/api/products/");
        expect(route).toBeDefined();
        expect(route.handler).toBe(productController.get);
    });

    it("GET /api/products/name/:name should call productController.getByName", () => {
        const routes = getRoutes();
        const route = routes.find((r) => r.method === "GET" && r.path === "/api/products/name/:name");
        expect(route).toBeDefined();
        expect(route.handler).toBe(productController.getByName);
    });

    it("GET /api/products/:id should call productController.getById", () => {
        const routes = getRoutes();
        const route = routes.find((r) => r.method === "GET" && r.path === "/api/products/:id");
        expect(route).toBeDefined();
        expect(route.handler).toBe(productController.getById);
    });

    it("POST /api/products/ should call productController.create", () => {
        const routes = getRoutes();
        const route = routes.find((r) => r.method === "POST" && r.path === "/api/products/");
        expect(route).toBeDefined();
        expect(route.handler).toBe(productController.create);
    });

    it("PATCH /api/products/:id should call productController.update", () => {
        const routes = getRoutes();
        const route = routes.find((r) => r.method === "PATCH" && r.path === "/api/products/:id");
        expect(route).toBeDefined();
        expect(route.handler).toBe(productController.update);
    });

    it("DELETE /api/products/:id should call productController.delete", () => {
        const routes = getRoutes();
        const route = routes.find((r) => r.method === "DELETE" && r.path === "/api/products/:id");
        expect(route).toBeDefined();
        expect(route.handler).toBe(productController.delete);
    });

    it("should have /name/:name before /:id", () => {
        const routes = getRoutes();
        const nameIndex = routes.findIndex((r) => r.path === "/api/products/name/:name");
        const idIndex = routes.findIndex((r) => r.path === "/api/products/:id");
        expect(nameIndex).toBeLessThan(idIndex);
    });
});
