import mongoose, { Schema, Document } from "mongoose";

export interface IInventoryItem extends Document {
    phone_model_id: string;
    case_type_id: string;
    quantity: number;
}

const InventoryItemSchema: Schema = new Schema({
    phone_model_id: { type: String, required: true, ref: "PhoneModel" },
    case_type_id: { type: String, required: true, ref: "CaseType" },
    quantity: { type: Number, required: true },
}, {
    timestamps: true
});

const InventoryItem = mongoose.model<IInventoryItem>("InventoryItem", InventoryItemSchema);
export default InventoryItem;
