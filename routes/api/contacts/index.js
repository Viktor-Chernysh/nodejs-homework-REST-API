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

const router = express.Router();

router.get("/", queryValidations, getContacts);

router.get("/:id", idValidation, getContactById);

router.post("/", addContactValidation, createContact);

router.delete("/:id", idValidation, removeContact);

router.put("/:id", idValidation, patchingContactValidation, updateContact);

router.patch(
  "/:id/favorite",
  idValidation,
  patchingContactFavoriteValidation,
  updateContact
);

export default router;
