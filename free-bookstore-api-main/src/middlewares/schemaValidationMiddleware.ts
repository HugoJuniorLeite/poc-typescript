import err from "../errors/index";
import { Request, Response, NextFunction } from "express";
import { Error } from "../protocols";

export function validateSchema(schema) {
  return (req:Request, res:Response, next:NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors  = error.details.map((detail) => detail.message) as Error;
      throw err.conflictError(errors.message);
    }

    next();
  };
}
