import errors from "../errors/index";
import bookRepositories from "../repositories/bookRepositories";

async function create({name, author, userId }) {
  const {
    rows: [book]
  } = await bookRepositories.findByName(name);
  if (book) throw errors.conflictError("Book already exists");

  await bookRepositories.create({ name, author, userId });
}

async function findAll() {
  const { rows, rowCount } = await bookRepositories.findAll();
  if (!rowCount) throw errors.notFoundError();
  return rows;
}

async function takeBook(userId, bookId) {
  const {
    rows: [book],
    rowCount,
  } = await bookRepositories.findById(bookId);
  if (!rowCount) throw errors.notFoundError();
  if (!book.available) throw errors.conflictError("Book not available");

  await bookRepositories.updateStatusBook(false, bookId);
  await bookRepositories.takeBook(userId, bookId);
}

async function findAllMyBooks(userId) {
  const { rows: books, rowCount } = await bookRepositories.findAllMyBooks(
    userId
  );
  if (!rowCount) throw errors.notFoundError();
  return books;
}

export default { create, findAll, takeBook, findAllMyBooks };
