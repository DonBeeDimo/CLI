const fs = require("fs/promises");
const paht = require("path");
const crypto = require("crypto");
const path = require("path");
// contacts.js

//  Раскомментируй и запиши значение
const readContacts = async () => {
  const contactsPath = await fs.readFile(
    path.join(__dirname, "db/contacts.json"),
    "utf-8"
  );
  const contacts = JSON.parse(contactsPath);
  return contacts;
};

// TODO: задокументировать каждую функцию
function listContacts() {
  return readContacts();
}

async function getContactById(contactId) {
  const contacts = await readContacts();
  const [result] = contacts.filter(
    (contact) => String(contact.id) === String(contactId)
  );
  return result;
}

async function removeContact(contactId) {
  const contacts = await readContacts();
  const delContact = contacts.find(
    (contact) => String(contact.id) === String(contactId)
  );
  const newContacts = contacts.filter(
    (contact) => String(contact.id) !== String(contactId)
  );
  await fs.writeFile(
    path.join(__dirname, "db/contacts.json"),
    JSON.stringify(newContacts, null, 2)
  );
  return delContact;
}

async function addContact(name, email, phone) {
  const contacts = await readContacts();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(
    path.join(__dirname, "db/contacts.json"),
    JSON.stringify(contacts, null, 2)
  );
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
