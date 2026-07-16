import { describe, it, expect, vi } from "vitest";

vi.mock("../../controllers/productRecordController.js", () => ({
    productRecordController: {
        get: vi.fn(),
        getById: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
        getByCategory: vi.fn(),
        getByProduct: vi.fn(),
        getByActive: vi.fn(),
        getByInactive: vi.fn(),
    },
}));

import router from "../../routes/productRecordRoutes.js";
import { productRecordController } from "../../controllers/productRecordController.js";

const getRoutes = () =>
    router.stack
        .filter((layer) => layer.route)
        .map((layer) => ({
            method: Object.keys(layer.route.methods)[0].toUpperCase(),
            path: layer.route.path,
            handler: layer.route.stack[0].handle,
        }));

describe("productRecordRoutes", () => {
    it("should register 9 routes", () => {
        expect(getRoutes()).toHaveLength(9);
    });

    it("GET /api/product-records/ should call productRecordController.get", () => {
        const routes = getRoutes();
        const route = routes.find((r) => r.method === "GET" && r.path === "/api/product-records/");
        expect(route).toBeDefined();
        expect(route.handler).toBe(productRecordController.get);
    });

    it("GET /api/product-records/active should call productRecordController.getByActive", () => {
        const routes = getRoutes();
        const route = routes.find((r) => r.method === "GET" && r.path === "/api/product-records/active");
        expect(route).toBeDefined();
        expect(route.handler).toBe(productRecordController.getByActive);
    });

    it("GET /api/product-records/inactive should call productRecordController.getByInactive", () => {
        const routes = getRoutes();
        const route = routes.find((r) => r.method === "GET" && r.path === "/api/product-records/inactive");
        expect(route).toBeDefined();
        expect(route.handler).toBe(productRecordController.getByInactive);
    });

    it("GET /api/product-records/category/:categoryId should call productRecordController.getByCategory", () => {
        const routes = getRoutes();
        const route = routes.find((r) => r.method === "GET" && r.path === "/api/product-records/category/:categoryId");
        expect(route).toBeDefined();
        expect(route.handler).toBe(productRecordController.getByCategory);
    });

    it("GET /api/product-records/product/:productId should call productRecordController.getByProduct", () => {
        const routes = getRoutes();
        const route = routes.find((r) => r.method === "GET" && r.path === "/api/product-records/product/:productId");
        expect(route).toBeDefined();
        expect(route.handler).toBe(productRecordController.getByProduct);
    });

    it("GET /api/product-records/:id should call productRecordController.getById", () => {
        const routes = getRoutes();
        const route = routes.find((r) => r.method === "GET" && r.path === "/api/product-records/:id");
        expect(route).toBeDefined();
        expect(route.handler).toBe(productRecordController.getById);
    });

    it("POST /api/product-records/ should call productRecordController.create", () => {
        const routes = getRoutes();
        const route = routes.find((r) => r.method === "POST" && r.path === "/api/product-records/");
        expect(route).toBeDefined();
        expect(route.handler).toBe(productRecordController.create);
    });

    it("PATCH /api/product-records/:id should call productRecordController.update", () => {
        const routes = getRoutes();
        const route = routes.find((r) => r.method === "PATCH" && r.path === "/api/product-records/:id");
        expect(route).toBeDefined();
        expect(route.handler).toBe(productRecordController.update);
    });

    it("DELETE /api/product-records/:id should call productRecordController.delete", () => {
        const routes = getRoutes();
        const route = routes.find((r) => r.method === "DELETE" && r.path === "/api/product-records/:id");
        expect(route).toBeDefined();
        expect(route.handler).toBe(productRecordController.delete);
    });

    it("should have specific routes before parameterized /:id", () => {
        const routes = getRoutes();
        const activeIndex = routes.findIndex((r) => r.path === "/api/product-records/active");
        const inactiveIndex = routes.findIndex((r) => r.path === "/api/product-records/inactive");
        const categoryIndex = routes.findIndex((r) => r.path === "/api/product-records/category/:categoryId");
        const productIndex = routes.findIndex((r) => r.path === "/api/product-records/product/:productId");
        const idIndex = routes.findIndex((r) => r.path === "/api/product-records/:id");
        expect(activeIndex).toBeLessThan(idIndex);
        expect(inactiveIndex).toBeLessThan(idIndex);
        expect(categoryIndex).toBeLessThan(idIndex);
        expect(productIndex).toBeLessThan(idIndex);
    });
});
