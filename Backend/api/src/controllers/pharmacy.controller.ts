import { Request, Response } from "express";
import {
  createPharmacy,
  deletePharmacy,
updatePharmacy, 
  findPharmacy,
  findPharmacies,
} from "../services/pharmacy.service";
import {
  CreatePharmacyInput,
  DeletePharmacyInput,
  ReadPharmacyInput,
  UpdatePharmacyInput,
} from "../schemas/pharmacy.schema";
import { FilterQuery, QueryOptions } from "mongoose";
import PharmacyModel, { PharmacyDocument } from "../models/pharmacy.model";

export type PharmacyRequest<
  TParams =
    | ReadPharmacyInput["params"]
    | UpdatePharmacyInput["params"]
    | DeletePharmacyInput["params"]
> = Request<TParams> & {
  queryOptions?: QueryOptions;
  queryFilter?: FilterQuery<any>;
};

// export async function createPharmacyHandler(
//   req: Request<{}, {}, CreatePharmacyInput["body"]>,
//   res: Response
// ) {
//   try {
//     const pharmacy = await createPharmacy(req.body);
//     return res.status(201).json({ data: pharmacy });
//   } catch (error) {
//     return res.status(500).json({ error });
//   }
// }
export async function createPharmacyHandler(
  req: Request,
  res: Response
) {
  try {
    const input = req.body;
    let pharmacies;

    if (Array.isArray(input)) {
      pharmacies = await PharmacyModel.insertMany(input);
    } else {
      pharmacies = await PharmacyModel.create(input);
    }

    return res.status(201).json({ data: pharmacies });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}
export async function updatePharmacyHandler(
  req: PharmacyRequest<UpdatePharmacyInput["params"]>,
  res: Response
) {
  const pharmacyId = req.params.pharmacyId;
  const update = req.body;
  const options = req.queryOptions || { lean: true, new: true };

  const updated = await updatePharmacy({ _id: pharmacyId }, update, options);

  if (!updated) return res.sendStatus(404);
  return res.status(200).json(updated);
}

export async function getPharmacyHandler(
  req: PharmacyRequest<ReadPharmacyInput["params"]>,
  res: Response
) {
  const pharmacyId = req.params.pharmacyId;
  const options = req.queryOptions || { lean: true };
  const pharmacy = await findPharmacy({ _id: pharmacyId }, options);
  if (!pharmacy) return res.sendStatus(404);
  return res.status(200).json(pharmacy);
}

export async function getPharmaciesHandler(
  req: PharmacyRequest<{}>,
  res: Response
) {
  const query = req.queryFilter || {};
  const options = req.queryOptions || { lean: true };
  const pharmacies = await findPharmacies(query, options);
  if (!pharmacies) return res.sendStatus(404);

  return res.status(200).json({ data: pharmacies});
}

export async function deletePharmacyHandler(
  req: Request<DeletePharmacyInput["params"]>,
  res: Response
) {
  const pharmacyId = req.params.pharmacyId;
  const pharmacy = await findPharmacy({ _id: pharmacyId }, {});
  if (!pharmacy) return res.sendStatus(404);

  await deletePharmacy({ _id: pharmacyId });
  return res.sendStatus(200);
}
