import { Response, NextFunction } from "express";
import { FilterQuery, Document, QueryOptions, PopulateOptions } from "mongoose";
import express from "express";

type RequestModel = express.Request & {
  queryOptions?: QueryOptions;
  queryFilter?: FilterQuery<Document>;
};

export function parseQueryAndOptions(
  req: RequestModel,
  res: Response,
  next: NextFunction
) {
  let query: FilterQuery<Document> = req.query;
  const options: QueryOptions = {
    lean: true,
  };

  //! json stringify
  //?encodeURIComponent(JSON.stringify(query));  decodeURIComponent
  if (req.query.search) {
    const regex = { $regex: new RegExp(req.query.search as string, "i") };
    query = { ...query, $or: [{ name: regex }, { username: regex }] };
    delete query.search;
  }
  console.log(req.query.createdAt);

  //start Date
  if (req.query.startDate) {
    query.createdAt = { $gte: req.query.startDate };
    delete query.startDate;
  }

  //end Date
  if (req.query.endDate) {
    query.createdAt = {
      ...query.createdAt,
      $lte: req.query.endDate,
    };
    delete query.endDate;
  }

  if (req.query.or) {
    try {
      query.$or = JSON.parse(req.query.or as string);
      delete query.or;
    } catch (e) {
      return res.status(400).send("Invalid $or format");
    }
  }

  if (req.query.established) {
    // Parse filter query parameters
    query.established = parseInt(req.query.established as string, 10);
  }

  if (req.query.limit) {
    // Parse options parameters
    options.limit = parseInt(req.query.limit as string, 10);
    delete query.limit;
  }

  if (req.query.sort) {
    try {
      options.sort = JSON.parse(req.query.sort as string);
      delete query.sort;
    } catch (e) {
      return res.status(400).send("Invalid sort format");
    }
  }

  if (req.query.fields) {
    options.select = (req.query.fields as string).split(",").join(" ");
    delete query.fields;
  }

  if (req.query.skip) {
    options.skip = parseInt(req.query.skip as string, 10);
    delete query.skip;
  }

  if (req.query.lean) {
    options.lean = req.query.lean === "true";
    delete query.lean;
  }

  if (req.query.populate) {
    try {
      options.populate = JSON.parse(
        req.query.populate as string
      ) as PopulateOptions[];
    } catch (e) {
      return res.status(400).send("Invalid populate format");
    }
    delete query.populate;
  }

  req.queryOptions = options;
  req.queryFilter = query;
  console.log(query);
  next();
}
