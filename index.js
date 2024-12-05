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
        
        // Create elements safely
        const containerDiv = document.createElement('div');
        
        const contentDiv = document.createElement('div');
        const heading = document.createElement('h2');
        heading.className = 'text-xl font-bold';
        heading.textContent = name;
        
        const ul = document.createElement('ul');
        ul.className = 'list-disc ml-4';
        
        const items = [
            {label: 'Phone', value: phone},
            {label: 'Email', value: email}, 
            {label: 'Address', value: address},
            {label: 'Notes', value: notes}
        ];
        
        items.forEach(item => {
            const li = document.createElement('li');
            li.className = 'text-sm';
            li.textContent = `${item.label}: ${item.value}`;
            ul.appendChild(li);
        });
        
        contentDiv.appendChild(heading);
        contentDiv.appendChild(ul);
        
        const buttonDiv = document.createElement('div');
        buttonDiv.className = 'flex flex-row justify-between';
        
        const editButton = document.createElement('button');
        editButton.className = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';
        editButton.type = 'button';
        editButton.onclick = () => showEditContact(newId);
        editButton.textContent = 'Edit';
        
        const spacerDiv = document.createElement('div');
        spacerDiv.className = 'w-2';
        
        const deleteButton = document.createElement('button');
        deleteButton.className = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded';
        deleteButton.type = 'button';
        deleteButton.onclick = () => deleteContact(newId);
        deleteButton.textContent = 'Delete';
        
        buttonDiv.appendChild(editButton);
        buttonDiv.appendChild(spacerDiv);
        buttonDiv.appendChild(deleteButton);
        
        containerDiv.appendChild(contentDiv);
        containerDiv.appendChild(buttonDiv);
        
        return containerDiv;
    });
    
    // Clear existing content
    while (showContactsForm.firstChild) {
        showContactsForm.removeChild(showContactsForm.firstChild);
    }
    
    // Append new elements
    contactElements.forEach(element => {
        showContactsForm.appendChild(element);
    });
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
    
    // Create form element
    const form = document.createElement('form');
    form.id = 'edit-form';
    form.action = '#';
    form.className = 'flex flex-col items-center justify-center';

    // Create and append form fields safely
    const fields = [
        { type: 'hidden', id: 'newId', name: 'newId', value: contacts.newId },
        { type: 'text', id: 'name', name: 'name', label: 'Name', value: contacts.name },
        { type: 'number', id: 'phone', name: 'phone', label: 'Phone', value: contacts.phone },
        { type: 'email', id: 'email', name: 'email', label: 'Email', value: contacts.email },
        { type: 'text', id: 'address', name: 'address', label: 'Address', value: contacts.address },
        { type: 'text', id: 'notes', name: 'notes', label: 'Notes', value: contacts.notes }
    ];

    fields.forEach(field => {
        const div = document.createElement('div');
        
        if (field.type !== 'hidden') {
            const label = document.createElement('label');
            label.htmlFor = field.id;
            label.className = 'text-xl font-bold flex';
            label.textContent = field.label;
            div.appendChild(label);
        }

        const input = document.createElement('input');
        input.type = field.type;
        input.id = field.id;
        input.name = field.name;
        input.placeholder = field.label || '';
        input.value = field.value;
        input.className = 'border-2 border-gray-200 rounded-lg p-1';
        
        div.appendChild(input);
        form.appendChild(div);
    });

    // Add submit button
    const br = document.createElement('br');
    br.className = 'w-full';
    form.appendChild(br);

    const button = document.createElement('button');
    button.type = 'submit';
    button.className = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';
    button.textContent = 'Edit Contact';
    form.appendChild(button);

    // Clear and append the form
    showContactsForm.innerHTML = '';
    showContactsForm.appendChild(form);

    form.addEventListener("submit", editContact);
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