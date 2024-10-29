function saveContacts(contacts) {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

function getContacts() {
  const contacts = localStorage.getItem("contacts");
  if (!contacts) {
    saveContacts([]);
  }

  try {
    return JSON.parse(contacts);
  } catch (error) {
    console.error("Failed to parse contacts:", error);
  }
}

function getContactById(id) {
  const contacts = getContacts();
  const contact = contacts.find((contact) => contact.newId === id);

  return contact;
}
