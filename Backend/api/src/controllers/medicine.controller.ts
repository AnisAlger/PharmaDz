import { Request, Response } from "express";
import {
  createMedicine,
  deleteMedicine,
  updateMedicine,
  findMedicine,
  findMedicines,
} from "../services/medicine.service";
import {
  CreateMedicineInput,
  DeleteMedicineInput,
  ReadMedicineInput,
  UpdateMedicineInput,
} from "../schemas/medicine.schema";
import { FilterQuery, QueryOptions } from "mongoose";
import { MedicineDocument } from "../models/medicine.model";

export type MedicineRequest<
  TParams =
    | ReadMedicineInput["params"]
    | UpdateMedicineInput["params"]
    | DeleteMedicineInput["params"]
> = Request<TParams> & {
  queryOptions?: QueryOptions;
  queryFilter?: FilterQuery<any>;
};

export async function createMedicineHandler(
  req: Request<{}, {}, CreateMedicineInput["body"]>,
  res: Response
) {
  try {
    const medicine = await createMedicine(req.body);
    return res.status(201).json({ data: medicine });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export async function updateMedicineHandler(
  req: MedicineRequest<UpdateMedicineInput["params"]>,
  res: Response
) {
  const medicineId = req.params.medicineId;
  const update = req.body;
  const options = req.queryOptions || { lean: true, new: true };

  const updated = await updateMedicine({ _id: medicineId }, update, options);

  if (!updated) return res.sendStatus(404);
  return res.status(200).json(updated);
}

export async function getMedicineHandler(
  req: MedicineRequest<ReadMedicineInput["params"]>,
  res: Response
) {
  const medicineId = req.params.medicineId;
  const options = req.queryOptions || { lean: true };
  const medicine = await findMedicine({ _id: medicineId }, options);
  if (!medicine) return res.sendStatus(404);
  return res.status(200).json(medicine);
}

export async function getMedicinesHandler(
  req: MedicineRequest<{}>,
  res: Response
) {
  const query = req.queryFilter || {};
  const options = req.queryOptions || { lean: true };
  const medicines = await findMedicines(query, options);
  if (!medicines) return res.sendStatus(404);

  return res.status(200).json({ data: medicines });
}

export async function deleteMedicineHandler(
  req: Request<DeleteMedicineInput["params"]>,
  res: Response
) {
  const medicineId = req.params.medicineId;
  const medicine = await findMedicine({ _id: medicineId }, {});
  if (!medicine) return res.sendStatus(404);

  await deleteMedicine({ _id: medicineId });
  return res.sendStatus(200);
}
