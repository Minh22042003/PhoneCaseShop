import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";
import { ApiError } from "../utils";

interface AuthRequest extends Request {
    user?: any;
}

export const protect = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(new ApiError(401, "You are not logged in! Please log in to get access."));
    }

    try {
        const decoded: any = jwt.verify(token, config.JWT_SECRET as string);
        req.user = decoded;
        next();
    } catch (error) {
        return next(new ApiError(401, "Invalid token"));
    }
};
