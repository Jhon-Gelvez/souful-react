import { userModel } from "../models/userModel.js";
import { buildUpdateData } from "../services/buildUpdateData.js";
import { errorHandler } from "../services/errorHandler.js";

export const userController = {
    get: async (req, res) => {
        try {
            const users = await userModel.get();
            res.status(200).json(users);
        } catch (error) {
            errorHandler(error, res);
        }
    },
    getById: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await userModel.getById(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(user);
        } catch (error) {
            errorHandler(error, res);
        }
    },
    create: async (req, res) => {
        const { first_name, last_name, email, password, role } = req.body;
        if (!first_name || !last_name || !email || !password || !role) {
            return res.status(400).json({ message: "Fields missing" });
        }
        try {
            const result = await userModel.create({ first_name, last_name, email, password, role });
            if (!result || result.affectedRows === 0) {
                return res.status(400).json({ message: "User not created" });
            }
            res.status(201).json({
                message: "User created successfully",
                userId: result.insertId,
                first_name,
                last_name,
                email,
                password,
                role,
            });
        } catch (error) {
            errorHandler(error, res);
        }
    },
    update: async (req, res) => {
        const { id } = req.params;
        let updateData = buildUpdateData(req.body, ["first_name", "last_name", "email", "password", "role"]);

        if (updateData.error) {
            return res.status(400).json({ message: updateData.error });
        }

        updateData = updateData.data;

        try {
            const result = await userModel.update(id, { updateData });
            if (!result || result.affectedRows === 0) {
                return res.status(404).json({ message: "User not found or no changes" });
            }
            res.status(200).json({ message: "User updated successfully", id, updateData });
        } catch (error) {
            errorHandler(error, res);
        }
    },
    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await userModel.delete(id);
            if (!result || result.affectedRows === 0) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({ message: "User deleted successfully", id });
        } catch (error) {
            errorHandler(error, res);
        }
    },
    getByName: async (req, res) => {
        const { name } = req.params;
        try {
            const user = await userModel.getByName(name);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(user);
        } catch (error) {
            errorHandler(error, res);
        }
    },
    getByEmail: async (req, res) => {
        const { email } = req.params;
        try {
            const user = await userModel.getByEmail(email);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(user);
        } catch (error) {
            errorHandler(error, res);
        }
    },
};
