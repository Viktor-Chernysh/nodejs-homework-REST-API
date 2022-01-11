import express from "express";

import {
  addContactValidation,
  patchingContactValidation,
  patchingContactFavoriteValidation,
  idValidation,
  queryValidations,
} from "./validation";
import {
  getContacts,
  getContactById,
  createContact,
  removeContact,
  updateContact,
} from "../../../controllers/contacts/index";
import { guard } from "../../../middlewares/guard";

const contactsRouter = express.Router();

contactsRouter.get("/", [guard, queryValidations], getContacts);

contactsRouter.get("/:id", [guard, idValidation], getContactById);

contactsRouter.post("/", [guard, addContactValidation], createContact);

contactsRouter.delete("/:id", [guard, idValidation], removeContact);

contactsRouter.put(
  "/:id",
  [guard, idValidation, patchingContactValidation],
  updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  [guard, idValidation, patchingContactFavoriteValidation],
  updateContact
);

export default contactsRouter;
