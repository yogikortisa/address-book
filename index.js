const insertContact = document.getElementById('insert-form');
const data = localStorage.getItem("contacts") ? JSON.parse(localStorage.getItem("contacts")) : [];

showContacts();

function addContact() {
    try {
        const newId = data.length ? data.length + 1 : 1;
        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const email = document.getElementById("email").value;
        const address = document.getElementById("address").value;
        const notes = document.getElementById("notes").value;

        if (!newId || !name || !email || !phone || !address) {
            throw new Error("Missing name, email, or phone");
        }
        else {
            data.push({ newId, name, phone, email, address, notes });
            localStorage.setItem("contacts", JSON.stringify(data));
            console.log("Data successfully added", data);
            showContacts();
        }
    } catch (error) {
        console.error(error);
    } finally {
        console.log("Data: ", data);
    }
}

function showContacts() {
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
    const contactElements = data.map(contact => {
        const { newId, name, phone, email, address, notes } = contact;
        return `
            <div>
                <h2>${name}</h2>
                <p>${phone}</p>
                <p>${email}</p>
                <p>${address}</p>
                <p>${phone}</p>
            </div>
            <div>
                <button type="button" onclick="editContact(${newId})">Edit</button>
                <button type="button" onclick="deleteContact(${newId})">Delete</button>
            </div>
        `;
    });
    document.getElementById("show-form").innerHTML = contactElements.join("");
}