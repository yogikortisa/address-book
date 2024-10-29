const showContactsForm = document.getElementById("show-form");
const addContactForm = document.getElementById('insert-form');
// const showButton = document.getElementById("showButton");
const searchButton = document.getElementById("searchButton");
// const addContactFormElement = document.getElementById("insert-form");
// const data = localStorage.getItem("contacts") ? JSON.parse(localStorage.getItem("contacts")) : [];

function addContact() {
    try {
        event.preventDefault();
        const contacts = getContacts();

        const newId = contacts.length ? contacts.length + 1 : 1;
        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const email = document.getElementById("email").value;
        const address = document.getElementById("address").value;
        const notes = document.getElementById("notes").value;
        // const contactFormData = new FormData(addContactFormElement);

        if (!newId || !name || !email || !phone || !address) {
            throw new Error("Missing name, email, or phone");
        }
        else {
            contacts.push({ newId, name, phone, email, address, notes });
            localStorage.setItem("contacts", JSON.stringify(contacts));
            console.log("Data successfully added", contacts);
            addContactForm.style.display = 'none';
            showContacts();
        }
    } catch (error) {
        console.error(error);
    }
}

function findContacts(contacts, query) {
    addContactForm.style.display = 'none';
    return contacts.filter(contact => contact.name.toLowerCase().includes(query.toLowerCase()));
}

function showContacts() {
    // event.preventDefault();
    // const contacts = document.getElementById("show-form");
    // contacts.innerHTML = "";
    // data.forEach(contact => {
    //     const { newId, name, phone, email, address, notes } = contact;
    //     const contactElement = document.createElement("div");
    //     contactElement.innerHTML = `
    //         <div>
    //             <h2>${name}</h2>
    //             <p>${phone}</p>
    //             <p>${email}</p>
    //             <p>${address}</p>
    //             <p>${phone}</p>
    //         </div>
    //     `;
    //     contacts.appendChild(contactElement);
    // });
    const contacts = getContacts();
    const searchString = window.location.search;
    const query = new URLSearchParams(searchString).get("search");
    
    const contactsToShow = query ? findContacts(contacts, query) : contacts;

    const contactElements = contactsToShow.map(contact => {
        const { newId, name, phone, email, address, notes } = contact;
        return `
            <div>
                <h2 class="text-xl font-bold">${name}</h2>
                <ul class="list-disc ml-4">
                <li class="text-sm">Phone: ${phone}</li>
                <li class="text-sm">Email: ${email}</li>
                <li class="text-sm">Address: ${address}</li>
                <li class="text-sm">Notes: ${notes}</li>
                </ul>
            </div>
            <div class="flex flex-row justify-between">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" onclick="showEditContact(${newId})">Edit</button> <div class="w-2"></div>
                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" type="button" onclick="deleteContact(${newId})">Delete</button>
            </div>
        `;
    });
    showContactsForm.innerHTML = contactElements.join("");
}

function deleteContact(id) {
    event.preventDefault();
    const contacts = getContacts();
    console.log(id);
  console.log(contacts);
    const updatedContacts = contacts.filter(
      (contact) => contact.newId !== Number(id)
    );
  console.log(updatedContacts);
    saveContacts(updatedContacts);
    showContacts();
}

function showEditContact(id) {
    addContactForm.style.display = 'none';
    const contacts = getContactById(id);
    const contacts2 = getContacts();
    console.log(id);
    console.log(contacts2);
    showContactsForm.innerHTML = `
        <form action="#" id="edit-form" class="flex flex-col items-center justify-center">
            <div>
                <input type="hidden" id="newId" name="newId" placeholder="newId" value="${contacts.newId}" class="border-2 border-gray-200 rounded-lg p-1" />
            </div>
            <div>
                <label for="name" class="text-xl font-bold flex">Name</label>
                <input type="text" id="name" name="name" placeholder="Name" value="${contacts.name}" class="border-2 border-gray-200 rounded-lg p-1" />
            </div>
            <div>
                <label for="phone" class="text-xl font-bold flex">Phone</label>
                <input type="number" id="phone" name="phone" placeholder="Phone" value="${contacts.phone}" class="border-2 border-gray-200 rounded-lg p-1" />
            </div>
            <div>
                <label for="email" class="text-xl font-bold flex">Email</label>
                <input type="email" id="email" name="email" placeholder="Email" value="${contacts.email}" class="border-2 border-gray-200 rounded-lg p-1" />
            </div>
            <div>
                <label for="address" class="text-xl font-bold flex">Address</label>
                <input type="text" id="address" name="address" placeholder="Address" value="${contacts.address}" class="border-2 border-gray-200 rounded-lg p-1" />
            </div>
            <div>
                <label for="notes" class="text-xl font-bold flex">Notes</label>
                <input type="text" id="notes" name="notes" placeholder="Notes" value="${contacts.notes}" class="border-2 border-gray-200 rounded-lg p-1" />
            </div>
            <br class="w-full">
                <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit Contact</button>
        </form>
    `;
    const editContactFormElement = document.getElementById("edit-form");
    editContactFormElement.addEventListener("submit", editContact);
}

function editContact(event) {
    event.preventDefault();
    const contactFormData = new FormData(event.target);
    const contacts = getContacts();

    const editedContact = {
        newId: Number(contactFormData.get("newId")),
        name: contactFormData.get("name"),
        phone: contactFormData.get("phone"),
        email: contactFormData.get("email"),
        address: contactFormData.get("address"),
        notes: contactFormData.get("notes"),
    };

    const updatedContacts = contacts.map((contact) => {
        if (contact.newId === editedContact.newId) {
            return editedContact;
        } else {
            return contact;
        }
    });

    console.log(contactFormData.get("name"));
    console.log(updatedContacts);

    saveContacts(updatedContacts);
    showContacts();
}

addContactForm.addEventListener("submit", addContact);
// showButton.addEventListener("click", function() {
//     addContactForm.style.display = 'none';
//     showContacts();
// });
// searchButton.addEventListener("click", function() {
//     event.preventDefault();
//     addContactForm.style.display = 'none';
//     showContacts();
// });
showContacts();