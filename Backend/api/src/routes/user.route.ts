import { Express, Request, Response } from "express";
import {
  createUserHandler,
  deleteUserHandler,
  getUserHandler,
  getUsersHandler,
  updateUserHandler,
  loginHandler,
} from "../controllers/user.controller";
import { createUserSchema, updateUserSchema, loginSchema } from "../schemas/user.schema";
import validate from "../middleware/validateRessource";


function userRoutes(app: Express) {
  app.get("/api/users", getUsersHandler);
  app.get("/api/users/:userId", getUserHandler);
  app.post("/api/users", validate(createUserSchema), createUserHandler);
  app.post("/api/auth/login", validate(loginSchema), loginHandler);
  app.put("/api/users/:userId", validate(updateUserSchema), updateUserHandler);
  app.delete("/api/users/:userId", deleteUserHandler);
}

export default userRoutes;
