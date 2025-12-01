import mongoose from "mongoose";

export interface MedicineInput {
  name: string;
  description?: string;
  dosage?: string;
  manufacturer?: string;
  category?: string;
  prescriptionRequired?: boolean;
}

export interface MedicineDocument extends MedicineInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const MedicineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: String,
    dosage: String,
    manufacturer: String,
    category: String,
    prescriptionRequired: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<MedicineDocument>("Medicine", MedicineSchema);
