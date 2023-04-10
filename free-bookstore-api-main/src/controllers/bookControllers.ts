import { Book, Ids } from "../protocols";
import bookServices from "../services/bookServices";
import { Request, Response, NextFunction } from "express";

async function create(req: Request, res: Response, next: NextFunction) {
  const { name, author } = req.body as Book;

  const { id } = res.locals.user as Ids;
 
  try {
    await bookServices.create({ name:name, author:author, userId: id }) ;

    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    const books = await bookServices.findAll();

    return res.send({ books });
  } catch (err) {
    next(err);
  }
}

async function takeBook(req: Request, res: Response, next: NextFunction) {
  const { id } = res.locals.user as Ids;
  const bookId = +req.params.id as Ids;
  try {
    await bookServices.takeBook(id, bookId);
    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function findAllMyBooks(req: Request, res: Response, next: NextFunction) {
  const { id } = res.locals.user as Ids;
  try {
    const books: object = await bookServices.findAllMyBooks(id);
    return res.send({ books });
  } catch (err) {
    next(err);
  }
}
export default { create, findAll, takeBook, findAllMyBooks };
