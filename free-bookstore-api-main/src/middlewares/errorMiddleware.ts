var httpStatus = require("http");
import { Request, Response, NextFunction } from "express";
import { Error } from "../protocols";

export function handleApplicationErrors(error :Error,req:Request, res:Response, next: NextFunction) {
  if (error.name === "ConflictError" || error.name === "DuplicatedEmailError") {
    return res
      .status(httpStatus.CONFLICT)
      .send({ message: error.message, email: error.email });
  }

  if (error.name === "InvalidCredentialsError") {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: error.message,
    });
  }

  if (error.name === "UnauthorizedError") {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: error.message,
    });
  }

  if (error.name === "NotFoundError") {
    return res.status(httpStatus.NOT_FOUND).send({
      message: error.message,
    });
  }

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: "InternalServerError",
    message: "Internal Server Error",
  });
}
