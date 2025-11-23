import mongoose, { Schema, Document } from "mongoose";
import validator from "validator";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    phone: string;
    role_id: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "Name must be provided"],
            minlength: 3,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            validate: [validator.isEmail, "Please provide a valid email."],
        },
        password: {
            type: String,
            trim: false,
            required: [true, "Password must be provided"],
            minlength: 8,
        },
        phone: {
            type: String,
            trim: true,
            minlength: 10,
        },
        role_id: {
            type: Schema.Types.ObjectId,
            ref: "Role",
        },
    },
    {
        timestamps: true,
    }
);

UserSchema.pre("save", async function (next) {
    if (this.isNew && !this.role_id) {
        const Role = mongoose.model("Role");
        const userRole = await Role.findOne({ name: "USER" });
        if (userRole) {
            this.role_id = userRole._id;
        }
    }
    next();
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;