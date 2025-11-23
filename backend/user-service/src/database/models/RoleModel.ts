import mongoose, { Schema, Document } from "mongoose";

export interface IRole extends Document {
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

const RoleSchema: Schema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "Name must be provided"],
            unique: true,
        },
        description: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Role = mongoose.model<IRole>("Role", RoleSchema);
export default Role;
