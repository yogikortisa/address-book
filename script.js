contacts = [
    {
        id: 1,
        name: "Mulyono",
        email: "mulyono@indonesia.go.id",
        phone: "080989999",
        address: "Jl. tol"
    },
    {
        id: 2,
        name: "Fufufafa",
        email: "fufu@fafa.com",
        phone: "0866666666",
        address: "jalan merdeka"
    },
    {
        id: 3,
        name: "Aditya",
        email: "aditya@gmail.com",
        phone: "089237582346",
        address: "aditya street"
    }
];

const data = localStorage.getItem("contacts") ? JSON.parse(localStorage.getItem("contacts")) : [];

const maniputaleData = () => {
    try {
        const newId = data.length ? data.length + 1 : 1;
        const name = prompt("Input name");
        const email = prompt("Input email");
        const phone = prompt("Input phone");
        const address = prompt("Input address");

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

maniputaleData(); 

