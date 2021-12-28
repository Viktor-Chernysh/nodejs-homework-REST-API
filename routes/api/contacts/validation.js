import Joi from "joi";
import mongoose from "mongoose";
const { Types } = mongoose;

const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool().optional(),
});

const patchingContactSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  phone: Joi.string().optional(),
  favorite: Joi.bool().optional(),
}).or("name", "email", "phone");

const patchingContactFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const regLimit = /\d+/;

const queryParamsSchema = Joi.object({
  limit: Joi.string().pattern(regLimit).optional(),
  skip: Joi.number().min(0).optional(),
  sortBy: Joi.string().valid("name", "email", "phone").optional(),
  ortByDesc: Joi.string().valid("name", "email", "phone").optional(),
  filter: Joi.string()
    // eslint-disable-next-line prefer-regex-literals
    .pattern(new RegExp("(name|email|phone)\\|?(name|email|phone)"))
    .optional(),
});

export const addContactValidation = async (req, res, next) => {
  try {
    await addContactSchema.validateAsync(req.body);
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Field ${error.message.replace(/"/g, "")}` });
  }
  next();
};

export const patchingContactValidation = async (req, res, next) => {
  try {
    await patchingContactSchema.validateAsync(req.body);
  } catch (error) {
    const [{ type }] = console.error.details;
    if (type === "object.missing") {
      return res.status(400).json({ message: "missing fields" });
    }
    return res.status(400).json({ message: error.message.replace(/"/g, "") });
  }
  next();
};

export const idValidation = async (req, res, next) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ObjectId" });
  }
  next();
};

export const patchingContactFavoriteValidation = async (req, res, next) => {
  try {
    await patchingContactFavoriteSchema.validateAsync(req.body);
  } catch (error) {
    const [{ type }] = console.error.details;
    if (type === "object.missing") {
      return res.status(400).json({ message: "missing field favorite" });
    }
    return res.status(400).json({ message: error.message.replace(/"/g, "") });
  }
  next();
};

export const queryValidations = async (req, res, next) => {
  try {
    await queryParamsSchema.validateAsync(req.query);
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Field ${error.message.replace(/"/g, "")}` });
  }
  next();
};
