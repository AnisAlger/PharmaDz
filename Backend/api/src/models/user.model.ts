import bcrypt from "bcrypt";
import mongoose from "mongoose";

export interface UserInput {
  nationalIdNumber: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  birthday: string;   // <-- ajoute ici
}

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    nationalIdNumber: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    birthday: { type: String, required: true },   // <-- ajouté ici
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;
