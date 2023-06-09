import {Request, Response, NextFunction } from "express";
import errors from "../errors/index";
import { Header } from "../protocols";
import userRepositories from "../repositories/userRepositories";

async function authValidation(req:Request, res:Response, next: NextFunction) {
  const { authorization } = req.headers as Header;
  const token:string = authorization?.replace("Bearer ", "");

  if (!token) throw errors.unauthorizedError();

  try {
    const {
      rows: [session],
    } = await userRepositories.findSessionByToken(token);
    if (!session) throw errors.unauthorizedError();

    const {
      rows: [user],
    } = await userRepositories.findById(session.userId);
    if (!user) throw errors.notFoundError();

    res.locals.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

export default { authValidation };
