import { Auth } from "../protocols.ts";
import userServices from "../services/userServices";

async function create(req:Request, res:Response, next:Next) {
  const { name, email, password } = req.body as Auth;
  try {
    await userServices.create({ name, email, password });
    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function signin(req:Request, res:Response, next:Next) {
  const { email, password } = req.body as Auth;
  try {
    const token:string = await userServices.signin({ email, password });
    return res.send({ token });
  } catch (err) {
    next(err);
  }
}

export default {
  create,
  signin,
};
