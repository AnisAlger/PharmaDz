import { object, string, boolean, TypeOf } from "zod";

export const payload = {
  body: object({
    name: string({ required_error: "Name is required" }),
    description: string().optional(),
    dosage: string().optional(),
    manufacturer: string().optional(),
    category: string().optional(),
    prescriptionRequired: boolean().optional(),
  }),
};

export const payload_update = {
  body: object({
    name: string().optional(),
    description: string().optional(),
    dosage: string().optional(),
    manufacturer: string().optional(),
    category: string().optional(),
    prescriptionRequired: boolean().optional(),
  }),
};

const params = {
  params: object({
    medicineId: string({ required_error: "medicineId is required" }),
  }),
};

export const createMedicineSchema = object({ ...payload });
export const updateMedicineSchema = object({ ...payload_update, ...params });
export const getMedicineSchema = object({ ...params });
export const deleteMedicineSchema = object({ ...params });

export type CreateMedicineInput = TypeOf<typeof createMedicineSchema>;
export type UpdateMedicineInput = TypeOf<typeof updateMedicineSchema>;
export type ReadMedicineInput = TypeOf<typeof getMedicineSchema>;
export type DeleteMedicineInput = TypeOf<typeof deleteMedicineSchema>;
