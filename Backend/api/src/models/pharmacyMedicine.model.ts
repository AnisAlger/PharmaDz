import mongoose from "mongoose";

export interface PharmacyMedicineInput {
  pharmacy: mongoose.Types.ObjectId;
  medicine: mongoose.Types.ObjectId;
  stock: number;
  price: number;
  isAvailable: boolean;
}

export interface PharmacyMedicineDocument
  extends PharmacyMedicineInput,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const PharmacyMedicineSchema = new mongoose.Schema(
  {
    pharmacy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pharmacy",
      required: true,
    },
    medicine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine",
      required: true,
    },
    stock: { type: Number, default: 0 },
    price: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<PharmacyMedicineDocument>(
  "PharmacyMedicine",
  PharmacyMedicineSchema
);
