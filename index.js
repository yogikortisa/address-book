const contact = document.getElementById('insert-form');
const data = localStorage.getItem("contacts") ? JSON.parse(localStorage.getItem("contacts")) : [];

const addContact = () => {
    try {
        const newId = data.length ? data.length + 1 : 1;
        const name = contact.getElementById("name").value;
        const email = contact.getElementById("email").value;
        const phone = contact.getElementById("phone").value;
        const address = contact.getElementById("address").value;

        if (!newId || !name || !email || !phone || !address) {
            throw new Error("Missing name, email, or phone");
        }
        else {
            data.push({ newId, name, email, phone, address });
            localStorage.setItem("contacts", JSON.stringify(data));
            console.log("Data successfully added", data);
        }
    } catch (error) {
        console.error(error);
    } finally {
        console.log("Data: ", data);
    }
}

console.log(contact.getElementById("name").value);