import jwt from "jsonwebtoken";

import usersRepository from "../repository/user";
import { HttpCode } from "../lib/constant";

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const verifyToken = (token) => {
  try {
    const verify = jwt.verify(token, SECRET_KEY);
    return !!verify;
  } catch (error) {
    return console.error(error.message);
  }
};

export const guard = async (req, res, next) => {
  const token = req.get("authorization")?.split(" ")[1];
  const isValidToken = verifyToken(token);
  if (!isValidToken) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: "error",
      code: HttpCode.CONFLICT,
      message: "Not authorized",
    });
  }
  const payload = jwt.decode(token);
  const user = await usersRepository.findById(payload.id);
  if (!user || user.token !== token) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: "error",
      code: HttpCode.CONFLICT,
      message: "Not authorized",
    });
  }
  req.user = user; // res.locals.user = user - [express version]
  next();
};
