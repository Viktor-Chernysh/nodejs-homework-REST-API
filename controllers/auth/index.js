/* eslint-disable no-unused-vars */
import { HttpCode } from "../../lib/constant";
import authService from "../../service/auth";
import {
  UploadFileService,
  CloudFileStorage,
  LocalFileStorage,
} from "../../service/file-storage";

const registration = async (req, res, next) => {
  try {
    const { email } = req.body;
    const isUserExist = await authService.isUserExist(email);
    if (isUserExist) {
      return res.status(HttpCode.CONFLICT).json({
        status: "error",
        code: HttpCode.CONFLICT,
        message: "Email is already exist",
      });
    }
    const data = await authService.create(req.body);
    res
      .status(HttpCode.CREATED)
      .json({ status: "success", code: HttpCode.CREATED, data });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await authService.getUser(email, password);
  if (!user) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: "error",
      code: HttpCode.CONFLICT,
      message: "Invalid credentials",
    });
  }
  const token = authService.getToken(user);
  await authService.setToken(user.id, token);
  res
    .status(HttpCode.OK)
    .json({ status: "success", code: HttpCode.OK, data: { token } });
};

const logout = async (req, res, next) => {
  await authService.setToken(req.user.id, null);
  res
    .status(HttpCode.NO_CONTENT)
    .json({ status: "success", code: HttpCode.OK, data: {} });
};

const getCurrent = (req, res, next) => {
  const { email, role } = req.user;
  res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    data: { email, role },
  });
};

const uploadAvatar = async (req, res, next) => {
  const uploadService = new UploadFileService(
    LocalFileStorage,
    req.file,
    req.user
  );
  const avatarUrl = await uploadService.updateAvatar();
  res
    .status(HttpCode.OK)
    .json({ status: "success", code: HttpCode.OK, data: { avatarUrl } });
};

export { registration, login, logout, getCurrent, uploadAvatar };
