import { Router } from "express";
import bookRoutes from "./bookRoutes.ts";
import userRoutes from "./userRoutes.ts";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/books", bookRoutes);

export default routes;
