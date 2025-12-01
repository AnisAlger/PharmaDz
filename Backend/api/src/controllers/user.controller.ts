import { Request, Response } from "express";
import {
  countUsers,
  createUser,
  deleteUser,
  findAndUpdateUser,
  findUser,
  findUsers,
  validatePassword,
} from "../services/user.service";
import {
  CreateUserInput,
  DeleteUserInput,
  ReadUserInput,
  UpdateUserInput,
  LoginInput,
} from "../schemas/user.schema";
import bcrypt from "bcrypt";
import config from "config";
import { FilterQuery, QueryOptions } from "mongoose";
import { UserDocument } from "../models/user.model";


export type UserRequest<
  TParams =
    | ReadUserInput["params"]
    | UpdateUserInput["params"]
    | DeleteUserInput["params"]
> = Request<TParams> & {
  queryOptions?: QueryOptions;
  queryFilter?: FilterQuery<any>;
};
export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    // console.log(req.body)
    const User = await createUser(req.body); 
    return res.status(201).json({
      data: User,
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
}

export async function updateUserHandler(
  req: UserRequest<UpdateUserInput["params"]>,
  res: Response
) {
  const userId = req.params.userId;
  let update = req.body;
  const options = req.queryOptions || { lean: true, new: true };

  // Si le mot de passe est mis à jour → hash
  if (update.password) {
    const salt = await bcrypt.genSalt(10);
    update.password = await bcrypt.hash(update.password, salt);
  }

  const updatedUser = await findAndUpdateUser({ _id: userId }, update, options);

  if (!updatedUser) {
    return res.sendStatus(404);
  }

  return res.send(updatedUser);
}

export async function getUserHandler(
  req: UserRequest<ReadUserInput["params"]>,
  res: Response
) {
  const UserId = req.params.userId;
  const options = req.queryOptions || { lean: true };
  const user = await findUser({ _id: UserId }, options);

  if (!user) {
    return res.sendStatus(404);
  }

  return res.send(user);
}


export async function getUsersHandler(
  req: UserRequest<UserDocument>,
  res: Response
) {
  const query = req.queryFilter || {};
  const options = req.queryOptions || { lean: true };
  const users = await findUsers(query, options);

  if (!users) {
    return res.sendStatus(404);
  }

  const totalPages = await countUsers(query);
  return res.status(200).json({ data: users, totalPages: totalPages });
}

export async function deleteUserHandler(
  req: Request<DeleteUserInput["params"]>,
  res: Response
) {
  const UserId = req.params.userId;

  const user = await findUser({ _id: UserId }, {});

  if (!user) {
    return res.sendStatus(404);
  }

  await deleteUser({ _id: UserId });


  return res.sendStatus(200);
}

export async function loginHandler(
  req: Request<{}, {}, LoginInput["body"]>,
  res: Response
) {
  try {
    const { email, password } = req.body;

    // Validate user credentials
    const user = await validatePassword({ email, password });

    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    // Return user data (without password)
    return res.status(200).json({
      data: user,
      message: "Login successful",
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
}
