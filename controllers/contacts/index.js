import repositoryContacts from "../../repository/contacts";
import { HttpCode } from "../../lib/contacts";

const getContacts = async (req, res, next) => {
  const contacts = await repositoryContacts.contactsList(req.query);
  if (!contacts) {
    res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Not found contacts",
    });
  }
  res
    .status(HttpCode.OK)
    .json({ status: "success", code: HttpCode.OK, data: { ...contacts } });
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const contact = await repositoryContacts.getContactById(id);
  if (!contact) {
    res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Not found",
    });
  }
  res
    .status(200)
    .json({ status: "success", code: HttpCode.OK, data: { contact } });
};

const createContact = async (req, res, next) => {
  const newContact = await repositoryContacts.addContact(req.body);
  if (newContact === null) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      message: "missing required name field",
    });
  }
  res.status(HttpCode.CREATED).json({
    status: "success",
    code: HttpCode.OK,
    data: { contact: newContact },
  });
};

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  const contacts = await repositoryContacts.removeContact(id);
  if (contacts === null) {
    return res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Not found",
    });
  }

  res
    .status(HttpCode.OK)
    .json({ status: "success", code: HttpCode.OK, message: "contact deleted" });
};

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await repositoryContacts.updateContact(id, req.body);
  if (!contact) {
    return res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Not found",
    });
  }
  return res
    .status(HttpCode.OK)
    .json({ status: "success", code: HttpCode.OK, data: { contact } });
};

export {
  getContacts,
  getContactById,
  createContact,
  removeContact,
  updateContact,
};
