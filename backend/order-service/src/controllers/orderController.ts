import { Request, Response, NextFunction } from "express";
import { Order } from "../database";
import { ApiError } from "../utils";

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).json({ status: 201, message: "Order created", data: order });
    } catch (error) {
        next(error);
    }
};

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await Order.find();
        res.status(200).json({ status: 200, message: "Orders retrieved", data: orders });
    } catch (error) {
        next(error);
    }
};
