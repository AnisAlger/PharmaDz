import mongoose from "mongoose";

export interface PharmacyInput {
  name: string;
  address: string;
  phone: string;
  email?: string;
  latitude?: number;
  longitude?: number;
}

export interface PharmacyDocument extends PharmacyInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const PharmacySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    latitude: Number,
    longitude: Number,
  },
  { timestamps: true }
);

const PharmacyModel = mongoose.model<PharmacyDocument>(
  "Pharmacy",
  PharmacySchema
);

export default PharmacyModel;
