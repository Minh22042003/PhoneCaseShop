import mongoose, { Schema, Document } from "mongoose";

export interface IPhoneModel extends Document {
    name: string;
    aspect_ratio: string;
    border_radius: string;
    camera_position?: any;
}

const PhoneModelSchema: Schema = new Schema({
    name: { type: String, required: true },
    aspect_ratio: { type: String, required: true },
    border_radius: { type: String, required: true },
    camera_position: { type: Schema.Types.Mixed, required: false },
}, {
    timestamps: true
});

const PhoneModel = mongoose.model<IPhoneModel>("PhoneModel", PhoneModelSchema);
export default PhoneModel;
