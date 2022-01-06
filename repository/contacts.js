import Contact from "../model/contact";

const contactsList = async (
  userId,
  { sortBy, sortByDesc, filter, limit = 10, skip = 0 }
) => {
  let sortCriteria = null;
  const total = await Contact.find({ owner: userId }).countDocuments();
  let contacts = Contact.find({ owner: userId }).populate({
    path: "owner",
    select: "name email role",
  });
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

const getContactById = async (userId, contactId) => {
  const contact = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate({
    path: "owner",
    select: "name email role",
  });
  return contact;
};

const removeContact = async (userId, contactId) => {
  const contact = await Contact.findOneAndRemove({
    _id: contactId,
    owner: userId,
  });
  return contact;
};

const addContact = async (userId, body) => {
  const contact = await Contact.create({ ...body, owner: userId });
  return contact;
};

const updateContact = async (userId, contactId, body) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
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
