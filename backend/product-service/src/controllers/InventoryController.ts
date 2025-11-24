import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils";
import { CaseType, PhoneModel, InventoryItem } from "../database";

const createCaseType = async (req: Request, res: Response) => {
    try {
        const { name, description, price, imageUrl } = req.body;
        const newCaseType = new CaseType({ name, description, price, imageUrl });
        await newCaseType.save();
        return res.json({
            status: 200,
            message: "Case type created successfully",
            data: newCaseType
        })
    } catch (error) {
        return res.json({
            status: 500,
            message: "Internal server error",
            error: error
        });
    }
};

const getAllCaseTypes = async (req: Request, res: Response) => {
    try {
        const caseTypes = await CaseType.find();
        return res.json({
            status: 200,
            message: "Case types retrieved successfully",
            data: caseTypes
        });
    } catch (error) {
        return res.json({
            status: 500,
            message: "Internal server error",
            error: error
        });
    }
};

const deleteCaseType = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const caseType = await CaseType.findByIdAndDelete(id);
        return res.json({
            status: 200,
            message: "Case type deleted successfully",
            data: caseType
        });
    } catch (error) {
        return res.json({
            status: 500,
            message: "Internal server error",
            error: error
        });
    }
};

const updateCaseType = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const caseType = await CaseType.findByIdAndUpdate(id, req.body);
        return res.json({
            status: 200,
            message: "Case type updated successfully",
            data: caseType
        });
    } catch (error) {
        return res.json({
            status: 500,
            message: "Internal server error",
            error: error
        });
    }
};

const createPhoneModel = async (req: Request, res: Response) => {
    try {
        const { name, aspect_ratio, border_radius, camera_position } = req.body;
        const newPhoneModel = new PhoneModel({ name, aspect_ratio, border_radius, camera_position });
        await newPhoneModel.save();
        return res.json({
            status: 200,
            message: "Phone model created successfully",
            data: newPhoneModel
        });
    } catch (error) {
        return res.json({
            status: 500,
            message: "Internal server error",
            error: error
        });
    }
};

const getAllPhoneModels = async (req: Request, res: Response) => {
    try {
        const phoneModels = await PhoneModel.find();
        return res.json({
            status: 200,
            message: "Phone models retrieved successfully",
            data: phoneModels
        });
    } catch (error) {
        return res.json({
            status: 500,
            message: "Internal server error",
            error: error
        });
    }
};

const deletePhoneModel = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const phoneModel = await PhoneModel.findByIdAndDelete(id);
        return res.json({
            status: 200,
            message: "Phone model deleted successfully",
            data: phoneModel
        });
    } catch (error) {
        return res.json({
            status: 500,
            message: "Internal server error",
            error: error
        });
    }
};

const updatePhoneModel = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const phoneModel = await PhoneModel.findByIdAndUpdate(id, req.body);
        return res.json({
            status: 200,
            message: "Phone model updated successfully",
            data: phoneModel
        });
    } catch (error) {
        return res.json({
            status: 500,
            message: "Internal server error",
            error: error
        });
    }
};

const createInventoryItem = async (req: Request, res: Response) => {
    try {
        const { phone_model_id, case_type_id, quantity } = req.body;
        const newInventoryItem = new InventoryItem({ phone_model_id, case_type_id, quantity });
        await newInventoryItem.save();
        return res.json({
            status: 200,
            message: "Inventory item created successfully",
            data: newInventoryItem
        });
    } catch (error) {
        return res.json({
            status: 500,
            message: "Internal server error",
            error: error
        });
    }
};

const getAllInventoryItems = async (req: Request, res: Response) => {
    try {
        const inventoryItems = await InventoryItem.find()
            .populate("phone_model_id")
            .populate("case_type_id");
        return res.json({
            status: 200,
            message: "Inventory items retrieved successfully",
            data: inventoryItems
        });
    } catch (error) {
        return res.json({
            status: 500,
            message: "Internal server error",
            error: error
        });
    }
};

const deleteInventoryItem = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const inventoryItem = await InventoryItem.findByIdAndDelete(id);
        return res.json({
            status: 200,
            message: "Inventory item deleted successfully",
            data: inventoryItem
        });
    } catch (error) {
        return res.json({
            status: 500,
            message: "Internal server error",
            error: error
        });
    }
};

const updateInventoryItem = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const inventoryItem = await InventoryItem.findByIdAndUpdate(id, req.body);
        return res.json({
            status: 200,
            message: "Inventory item updated successfully",
            data: inventoryItem
        });
    } catch (error) {
        return res.json({
            status: 500,
            message: "Internal server error",
            error: error
        });
    }
};

export {
    createCaseType,
    getAllCaseTypes,
    deleteCaseType,
    updateCaseType,
    createPhoneModel,
    getAllPhoneModels,
    deletePhoneModel,
    updatePhoneModel,
    createInventoryItem,
    getAllInventoryItems,
    deleteInventoryItem,
    updateInventoryItem
};