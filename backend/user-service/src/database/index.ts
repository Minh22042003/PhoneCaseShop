import User, { IUser } from "./models/UserModel";
import Role, { IRole } from "./models/RoleModel";
import { connectDB } from "./connection";

export { User, IUser, Role, IRole, connectDB };