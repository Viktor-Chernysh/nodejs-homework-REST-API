import Contact from "../model/contact";

const contactsList = async ({
  sortBy,
  sortByDesc,
  filter,
  limit = 10,
  skip = 0,
}) => {
  let sortCriteria = null;
  const total = await Contact.find().countDocuments();
  let contacts = Contact.find();
  if (sortBy) {
    sortCriteria = { [`${sortBy}`]: 1 };
  }
  if (sortByDesc) {
    sortCriteria = { [`${sortByDesc}`]: -1 };
  }
  if (filter) {
    contacts = contacts.select(filter.split("|").join(" "));
  }
  contacts = await contacts
    .skip(Number(skip))
    .limit(Number(limit))
    .sort(sortCriteria);
  return { total, contacts };
};

const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const contact = await Contact.findByIdAndRemove(contactId);
  return contact;
};

const addContact = async (body) => {
  const contact = await Contact.create(body);
  return contact;
};

const updateContact = async (contactId, body) => {
  const contact = await Contact.findByIdAndUpdate(
    contactId,
    { ...body },
    { new: true }
  );
  return contact;
};

export default {
  contactsList,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
