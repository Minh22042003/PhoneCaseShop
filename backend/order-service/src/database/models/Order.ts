import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
    userId: string;
    products: Array<{
        productId: string;
        quantity: number;
        price: number;
    }>;
    totalAmount: number;
    status: string;
}

const OrderSchema: Schema = new Schema({
    userId: { type: String, required: true },
    products: [{
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    status: { type: String, default: "pending" },
}, {
    timestamps: true
});

export default mongoose.model<IOrder>("Order", OrderSchema);
