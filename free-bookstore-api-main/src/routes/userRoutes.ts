import { Router } from "express";
import userControllers from "../controllers/userControllers.ts";
import {validateSchema} from "../middlewares/schemaValidationMiddleware.ts";
import { userSchemma } from "../schemas/User.ts";

const userRoutes = Router();

userRoutes.post('/signup', validateSchema(userSchemma) , userControllers.create)
userRoutes.post("/signin", userControllers.signin)

export default userRoutes;
