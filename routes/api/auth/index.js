import { Router } from "express";

import {
  registration,
  login,
  logout,
  getCurrent,
} from "../../../controllers/auth/index";
import { addAuthValidation } from "./validationAuth";
import { guard } from "../../../middlewares/guard";

const authRouter = new Router();

authRouter.post("/registration", addAuthValidation, registration);
authRouter.post("/login", addAuthValidation, login);
authRouter.post("/logout", guard, logout);
authRouter.get("/current", guard, getCurrent);

export default authRouter;
