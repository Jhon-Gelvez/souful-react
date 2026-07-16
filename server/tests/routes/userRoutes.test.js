import { describe, it, expect, vi } from "vitest";

vi.mock("../../controllers/userController.js", () => ({
    userController: {
        get: vi.fn(),
        getById: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
        getByName: vi.fn(),
        getByEmail: vi.fn(),
    },
}));

import router from "../../routes/userRoutes.js";
import { userController } from "../../controllers/userController.js";

const getRoutes = () =>
    router.stack
        .filter((layer) => layer.route)
        .map((layer) => ({
            method: Object.keys(layer.route.methods)[0].toUpperCase(),
            path: layer.route.path,
            handler: layer.route.stack[0].handle,
        }));

describe("userRoutes", () => {
    it("should register 7 routes", () => {
        expect(getRoutes()).toHaveLength(7);
    });

    it("GET /api/users/ should call userController.get", () => {
        const routes = getRoutes();
        const route = routes.find((r) => r.method === "GET" && r.path === "/api/users/");
        expect(route).toBeDefined();
        expect(route.handler).toBe(userController.get);
    });

    it("GET /api/users/email/:email should call userController.getByEmail", () => {
        const routes = getRoutes();
        const route = routes.find((r) => r.method === "GET" && r.path === "/api/users/email/:email");
        expect(route).toBeDefined();
        expect(route.handler).toBe(userController.getByEmail);
    });

    it("GET /api/users/name/:name should call userController.getByName", () => {
        const routes = getRoutes();
        const route = routes.find((r) => r.method === "GET" && r.path === "/api/users/name/:name");
        expect(route).toBeDefined();
        expect(route.handler).toBe(userController.getByName);
    });

    it("GET /api/users/:id should call userController.getById", () => {
        const routes = getRoutes();
        const route = routes.find((r) => r.method === "GET" && r.path === "/api/users/:id");
        expect(route).toBeDefined();
        expect(route.handler).toBe(userController.getById);
    });

    it("POST /api/users/ should call userController.create", () => {
        const routes = getRoutes();
        const route = routes.find((r) => r.method === "POST" && r.path === "/api/users/");
        expect(route).toBeDefined();
        expect(route.handler).toBe(userController.create);
    });

    it("PATCH /api/users/:id should call userController.update", () => {
        const routes = getRoutes();
        const route = routes.find((r) => r.method === "PATCH" && r.path === "/api/users/:id");
        expect(route).toBeDefined();
        expect(route.handler).toBe(userController.update);
    });

    it("DELETE /api/users/:id should call userController.delete", () => {
        const routes = getRoutes();
        const route = routes.find((r) => r.method === "DELETE" && r.path === "/api/users/:id");
        expect(route).toBeDefined();
        expect(route.handler).toBe(userController.delete);
    });

    it("should have specific routes before parameterized routes", () => {
        const routes = getRoutes();
        const emailIndex = routes.findIndex((r) => r.path === "/api/users/email/:email");
        const nameIndex = routes.findIndex((r) => r.path === "/api/users/name/:name");
        const idIndex = routes.findIndex((r) => r.path === "/api/users/:id");
        expect(emailIndex).toBeLessThan(idIndex);
        expect(nameIndex).toBeLessThan(idIndex);
    });
});
