import { omit } from "lodash";
import UserModel, { UserDocument, UserInput } from "../models/user.model";
import mongoose, {
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import { databaseResponseTimeHistogram } from "../utils/metrics";
import bcrypt from "bcrypt";
import config from "config";

// export async function createUser(input: UserInput) {
//   try {
//     const user = await UserModel.create(input);
//     return omit(user, "password");
//   } catch (e: any) {
//     throw new Error(e);
//   }
// }
export async function createUser(input: UserInput) {
  try {
       // Générer le sel
    const salt = await bcrypt.genSalt( 10);
    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(input.password, salt);
    // Remplacer le mot de passe en clair par le hash
    input.password = hashedPassword;
    const user = await UserModel.create(input);
    // console.log(user);
    // Supprimer le champ password dans la réponse
    return omit(user.toJSON(), "password");
  } catch (e: any) {
    throw new Error(e);
  }
}
export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), "password");
}

export async function findUser(
  query: FilterQuery<UserDocument>,
  options: QueryOptions
): Promise<UserDocument | null> {
  const metricsLabels = {
    operation: "findUser",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await UserModel.findOne(query, {}, options);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });

    throw e;
  }
}
export async function findUsers(
  query: FilterQuery<UserDocument>,
  option: QueryOptions
) {
  const metricsLabels = {
    operation: "findUsers",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await UserModel.find(query, {}, option);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });
    throw e;
  }
}

export async function findAndUpdateUser(
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<UserDocument>,
  options: QueryOptions
) {
 const updatedUser = await UserModel.findOneAndUpdate(query, update, {
    ...options,
    new: true, 
  });  console.log(updatedUser)
  return updatedUser;
 
}

export async function deleteUser(query: FilterQuery<UserDocument>) {
  return UserModel.deleteOne(query);
}

export async function countUsers(query: FilterQuery<UserDocument>) {
    const metricsLabels = {
      operation: "findUsers",
    };
  
    const timer = databaseResponseTimeHistogram.startTimer();
    try {
      const result = await UserModel.countDocuments(query);
  
      timer({ ...metricsLabels, success: "true" });
      return result;
    } catch (e) {
      timer({ ...metricsLabels, success: "false" });
      throw e;
    }
  }