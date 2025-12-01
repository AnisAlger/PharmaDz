
import { object, string, TypeOf } from "zod";



export const payload = {
  body: object({
    nationalIdNumber: string({ required_error: "NationalIdNumber is required" }),
    password: string({ required_error: "Password is required" }).min(
      6,
      "Password too short - should be 6 chars minimum"
    ),
    firstName: string({ required_error: "FirstName is required" }),
    lastName: string({ required_error: "LastName is required" }),
    phone: string({ required_error: "Phone is required" }),
    email: string({ required_error: "Email is required" }).email(
      "Not a valid email"
    ),
    birthday: string({ required_error: "Birthday is required" }),
    // role: nativeEnum(roleValues),
    // status: nativeEnum(userStatusValues),
  }),
};
export const payload_update = {
  body: object({
    nationalIdNumber: string().optional(),
    password: string()
      .min(6, "Password too short - should be 6 chars minimum")
      .optional(),
    firstName: string().optional(),
    lastName: string().optional(),
    phone: string().optional(),
    email: string().email("Not a valid email").optional(),
    birthday: string().optional(),
    // role: nativeEnum(roleValues).optional(),
  }),
};

const params = {
  params: object({
    userId: string({ required_error: "userId is required" }),
  }),
};


export const getUserSchema = object({
  ...params,
});

export const createUserSchema = object({
  ...payload,
});

export const updateUserSchema = object({
  ...payload_update,
  ...params,
});

export const deleteUserSchema = object({
  ...params,
});

export const loginSchema = object({
  body: object({
    email: string({ required_error: "Email is required" }).email("Not a valid email"),
    password: string({ required_error: "Password is required" }),
  }),
});


export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type UpdateUserInput = TypeOf<typeof updateUserSchema>;
export type DeleteUserInput = TypeOf<typeof deleteUserSchema>;
export type ReadUserInput = TypeOf<typeof getUserSchema>;
export type LoginInput = TypeOf<typeof loginSchema>;

