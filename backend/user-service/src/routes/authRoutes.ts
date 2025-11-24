import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { protect, verifyAdmin } from "../middleware/authMiddleware";

const userRouter = Router();

userRouter.post("/register", AuthController.register);
userRouter.post("/login", AuthController.login);
userRouter.post("/admin/login", AuthController.loginAdmin);
userRouter.get("/admin/check", protect, AuthController.checkAdmin);
userRouter.get("/me", protect, AuthController.getMe);
userRouter.put("/update", protect, AuthController.updateDetails);
userRouter.get("/admin/users", protect, verifyAdmin, AuthController.getAllUsers);
userRouter.post("/admin/users", protect, verifyAdmin, AuthController.createUser);
userRouter.get("/admin/users/:id", protect, verifyAdmin, AuthController.getUserById);
userRouter.put("/admin/users/:id", protect, verifyAdmin, AuthController.updateUserById);
userRouter.delete("/admin/users/:id", protect, verifyAdmin, AuthController.deleteUserById);
userRouter.get("/admin/roles", protect, verifyAdmin, AuthController.getAllRoles);

export default userRouter;