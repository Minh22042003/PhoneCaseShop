import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User, Role } from "../database";
import { ApiError, encryptPassword, isPasswordMatch } from "../utils";
import config from "../config/config";
import { IUser } from "../database";

const jwtSecret = config.JWT_SECRET as string;
const COOKIE_EXPIRATION_DAYS = 90; // cookie expiration in days
const expirationDate = new Date(
    Date.now() + COOKIE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000
);
const cookieOptions = {
    expires: expirationDate,
    secure: false,
    httpOnly: true,
};

const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            throw new ApiError(400, "User already exists!");
        }

        const user = await User.create({
            name,
            email,
            password: await encryptPassword(password),
        });

        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
        };

        return res.json({
            status: 200,
            message: "User registered successfully!",
            data: userData,
        });
    } catch (error: any) {
        return res.json({
            status: 500,
            message: error.message,
        });
    }
};

const createSendToken = async (user: IUser, res: Response) => {
    const { name, email, id } = user;
    const token = jwt.sign({ name, email, id }, jwtSecret, {
        expiresIn: "1d",
    });
    if (config.env === "production") cookieOptions.secure = true;
    res.cookie("jwt", token, cookieOptions);

    return token;
};

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (
            !user ||
            !(await isPasswordMatch(password, user.password as string))
        ) {
            throw new ApiError(400, "Incorrect email or password");
        }

        const token = await createSendToken(user!, res);

        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
        };

        return res.json({
            status: 200,
            message: "User logged in successfully!",
            data: userData,
            token,
        });
    } catch (error: any) {
        return res.json({
            status: 500,
            message: error.message,
        });
    }
};

const getMe = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        return res.json({
            status: 200,
            message: "User details retrieved successfully!",
            data: user,
        });
    } catch (error: any) {
        return res.json({
            status: 500,
            message: error.message,
        });
    }
};

const updateDetails = async (req: Request, res: Response) => {
    try {
        const { name, email, phone } = req.body;
        const userId = (req as any).user.id;

        const user = await User.findById(userId);

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        if (email && email !== user.email) {
            const userExists = await User.findOne({ email });
            if (userExists) {
                throw new ApiError(400, "Email already taken");
            }
            user.email = email;
        }

        if (name) user.name = name;
        if (phone) user.phone = phone;

        const updatedUser = await user.save();

        return res.json({
            status: 200,
            message: "User details updated successfully!",
            data: updatedUser,
        });
    } catch (error: any) {
        return res.json({
            status: 500,
            message: error.message,
        });
    }
};

const loginAdmin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (
            !user ||
            !(await isPasswordMatch(password, user.password as string))
        ) {
            throw new ApiError(400, "Incorrect email or password");
        }

        const role = await Role.findById(user.role_id);
        if (!role || role.name !== "ADMIN") {
            throw new ApiError(403, "Access denied. Admins only.");
        }

        const token = await createSendToken(user!, res);

        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
        };

        return res.json({
            status: 200,
            message: "Admin logged in successfully!",
            data: userData,
            token,
        });
    } catch (error: any) {
        return res.json({
            status: 500,
            message: error.message,
        });
    }
};

const checkAdmin = async (req: Request, res: Response) => {
    try {
        const userReq = (req as any).user;
        if (!userReq) {
            throw new ApiError(401, "User not authenticated");
        }

        const user = await User.findById(userReq.id).select("role_id");

        if (!user || !user.role_id) {
            return res.json({
                status: 200,
                isAdmin: false,
            });
        }

        const role = await Role.findById(user.role_id);

        if (role && role.name === "ADMIN") {
            return res.json({
                status: 200,
                isAdmin: true,
            });
        }

        return res.json({
            status: 200,
            isAdmin: false,
        });
    } catch (error: any) {
        return res.json({
            status: 500,
            message: error.message,
        });
    }
};

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().select("-password");
        return res.json({
            status: 200,
            message: "Users retrieved successfully!",
            data: users,
        });
    } catch (error: any) {
        return res.json({
            status: 500,
            message: error.message,
        });
    }
};

const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select("-password");

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        return res.json({
            status: 200,
            message: "User details retrieved successfully!",
            data: user,
        });
    } catch (error: any) {
        return res.json({
            status: 500,
            message: error.message,
        });
    }
};

export default {
    register,
    login,
    getMe,
    updateDetails,
    loginAdmin,
    checkAdmin,
    getAllUsers,
    getUserById,
};