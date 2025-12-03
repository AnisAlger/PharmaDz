import { boolean, number, object, string, TypeOf } from "zod";

// --- CREATE PHARMACY PAYLOAD ---
export const payload = {
  body: object({
    name: string({ required_error: "Name is required" }),
    address: string({ required_error: "Address is required" }),
    phone: string({ required_error: "Phone is required" }),
    email: string().email("Invalid email").optional(),
    latitude: number().optional(),
    longitude: number().optional(),
    isActive: boolean().optional().default(true),
    openingHours: object({
      startMorning: string().optional(),
      endMorning: string().optional(),
      startAfternoon: string().optional(),
      endAfternoon: string().optional(),
    }).optional(),
  }),
};

// --- UPDATE PHARMACY PAYLOAD ---
export const payload_update = {
  body: object({
    name: string().optional(),
    address: string().optional(),
    phone: string().optional(),
    email: string().email("Invalid email").optional(),
    latitude: number().optional(),
    longitude: number().optional(),
    isActive: boolean().optional(),
    openingHours: object({
      startMorning: string().optional(),
      endMorning: string().optional(),
      startAfternoon: string().optional(),
      endAfternoon: string().optional(),
    }).optional(),
  }),
};

// --- PARAMS FOR ROUTES ---
const params = {
  params: object({
    pharmacyId: string({ required_error: "pharmacyId is required" }),
  }),
};

// Paramètre spécial pour DELETE qui accepte n'importe quel nom de paramètre
const deleteParams = {
  params: object({
    id: string({ required_error: "ID is required" }),
  }),
};

// --- EXPORT SCHEMAS ---
export const createPharmacySchema = object({ ...payload });
export const updatePharmacySchema = object({ ...payload_update, ...params });
export const getPharmacySchema = object({ ...params });
export const deletePharmacySchema = object({ ...deleteParams });

// --- TYPESCRIPT TYPES ---
export type CreatePharmacyInput = TypeOf<typeof createPharmacySchema>;
export type UpdatePharmacyInput = TypeOf<typeof updatePharmacySchema>;
export type ReadPharmacyInput = TypeOf<typeof getPharmacySchema>;
export type DeletePharmacyInput = TypeOf<typeof deletePharmacySchema>;