import { describe, it, expect, vi } from "vitest";

vi.mock("../../controllers/saleController.js", () => ({
    saleController: {
        get: vi.fn(),
        getById: vi.fn(),
        create: vi.fn(),
        delete: vi.fn(),
        getByUser: vi.fn(),
        getByProduct: vi.fn(),
    },
}));

import router from "../../routes/saleRoutes.js";
import { saleController } from "../../controllers/saleController.js";

const getRoutes = () =>
    router.stack
        .filter((layer) => layer.route)
        .map((layer) => ({
            method: Object.keys(layer.route.methods)[0].toUpperCase(),
            path: layer.route.path,
            handler: layer.route.stack[0].handle,
        }));

describe("saleRoutes", () => {
    it("should register 6 routes", () => {
        expect(getRoutes()).toHaveLength(6);
    });

    it("GET /api/sales/ should call saleController.get", () => {
        const routes = getRoutes();
        const route = routes.find((r) => r.method === "GET" && r.path === "/api/sales/");
        expect(route).toBeDefined();
        expect(route.handler).toBe(saleController.get);
    });

    it("GET /api/sales/user/:userId should call saleController.getByUser", () => {
        const routes = getRoutes();
        const route = routes.find((r) => r.method === "GET" && r.path === "/api/sales/user/:userId");
        expect(route).toBeDefined();
        expect(route.handler).toBe(saleController.getByUser);
    });

    it("GET /api/sales/product/:productId should call saleController.getByProduct", () => {
        const routes = getRoutes();
        const route = routes.find((r) => r.method === "GET" && r.path === "/api/sales/product/:productId");
        expect(route).toBeDefined();
        expect(route.handler).toBe(saleController.getByProduct);
    });

    it("GET /api/sales/:id should call saleController.getById", () => {
        const routes = getRoutes();
        const route = routes.find((r) => r.method === "GET" && r.path === "/api/sales/:id");
        expect(route).toBeDefined();
        expect(route.handler).toBe(saleController.getById);
    });

    it("POST /api/sales/ should call saleController.create", () => {
        const routes = getRoutes();
        const route = routes.find((r) => r.method === "POST" && r.path === "/api/sales/");
        expect(route).toBeDefined();
        expect(route.handler).toBe(saleController.create);
    });

    it("DELETE /api/sales/:id should call saleController.delete", () => {
        const routes = getRoutes();
        const route = routes.find((r) => r.method === "DELETE" && r.path === "/api/sales/:id");
        expect(route).toBeDefined();
        expect(route.handler).toBe(saleController.delete);
    });

    it("should have specific routes before parameterized /:id", () => {
        const routes = getRoutes();
        const userIndex = routes.findIndex((r) => r.path === "/api/sales/user/:userId");
        const productIndex = routes.findIndex((r) => r.path === "/api/sales/product/:productId");
        const idIndex = routes.findIndex((r) => r.path === "/api/sales/:id");
        expect(userIndex).toBeLessThan(idIndex);
        expect(productIndex).toBeLessThan(idIndex);
    });
});
