const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "./contacts.json");

const updateContacts = async(contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const response = await fs.readFile(contactsPath);
  return JSON.parse(response);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === String(contactId));
  return result || null;
};

const addContact = async(body) => {
  const contacts = await listContacts();
  const contactsNew = { id: shortid.generate(), ...body };
  const contactsList = JSON.stringify([contactsNew, ...contacts], null, "\t");
  fs.writeFile(contactsPath, contactsList, (err) => {
    if (err) console.error(err);
  });
  return contactsNew;
}

const updateContact = async(contactId, body) => {
  const contactsList = await listContacts();

    const index = contactsList.findIndex(item => item.id === String(contactId));
    if(index === -1) {
        return null;
    }
    contactsList[index] = {contactId, ...body};
    await updateBooks(contactsList);
    return contactsList[index];
  };

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(
    (contact) => contact.id === String(contactId)
  );
  if (index === -1) {
    return null;
  }
  contacts.splice(index, 1);
  await updateContacts(contacts);
    
  return contacts;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
