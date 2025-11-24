import { Router } from "express";
import { protect, verifyAdmin } from "../middleware/authMiddleware";
import {
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
} from "../controllers/InventoryController";

const router = Router();

router.post("/admin/casetype", protect, verifyAdmin, createCaseType);
router.get("/casetype", getAllCaseTypes);
router.delete("/admin/casetype/:id", protect, verifyAdmin, deleteCaseType);
router.put("/admin/casetype/:id", protect, verifyAdmin, updateCaseType);

router.post("/admin/phonemodel", protect, verifyAdmin, createPhoneModel);
router.get("/phonemodel", getAllPhoneModels);
router.delete("/admin/phonemodel/:id", protect, verifyAdmin, deletePhoneModel);
router.put("/admin/phonemodel/:id", protect, verifyAdmin, updatePhoneModel);

router.post("/admin/inventory", protect, verifyAdmin, createInventoryItem);
router.get("/inventory", getAllInventoryItems);
router.delete("/admin/inventory/:id", protect, verifyAdmin, deleteInventoryItem);
router.put("/admin/inventory/:id", protect, verifyAdmin, updateInventoryItem);

export default router;
