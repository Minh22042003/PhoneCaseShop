import mongoose, { Schema, Document } from "mongoose";

export interface ICaseType extends Document {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

const CaseTypeSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: false },
}, {
    timestamps: true
});

const CaseType = mongoose.model<ICaseType>("CaseType", CaseTypeSchema);
export default CaseType;
