// Використовуючи скріпт з лекції. Реалізувати наступне

// при кліку на кнопку view відобразити дані користувача знизу під формою
// при кліку на edit оновлювати не весь список, а один елемент зі списку
// реалізувати функцію очищення даних з форми

let currentDate = new Date().toString();
// document.cookie = `date= ${currentDate}`;

// let cookie = document.cookie;
// console.log(document.cookie);

localStorage.setItem("date", currentDate);
const dateFromStorage = localStorage.getItem("date");
console.log(dateFromStorage);

const products = [
    {
        id: 1,
        name: "product 1",
        price: 360,
    },
    {
        id: 2,
        name: "product 2",
        price: 300,
    },
];
localStorage.setItem("products", JSON.stringify(products));

const getProductsFromStorage = localStorage.getItem("products");
console.log(JSON.parse(getProductsFromStorage));

localStorage.removeItem("products");

// localStorage.clear();

const isShowModal = sessionStorage.getItem("showModal");
console.log(isShowModal);
if (isShowModal === null) {
    alert("message");
    sessionStorage.setItem("showModal", true);
}

const list = document.querySelector(".list-user");
const form = document.querySelector(".form-user");
const preview = document.querySelector(".preview-user");
const btnAddUser = document.querySelector(".btn-add-user");
let users = [];
getUsersFromStorage();
showListUsers();

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const id = form.getAttribute("data-id-user");

    if (id === "0") {
        const user = {
            id: new Date().getTime(),
            name: this.elements["name"].value,
            age: this.elements["age"].value,
            position: this.elements["position"].value,
        };
        users.push(user);
        addToListUsers(user);
        console.log(user);
    } else {
        const user = {
            id: Number(id),
            name: this.elements["name"].value,
            age: this.elements["age"].value,
            position: this.elements["position"].value,
        };
        const index = users.findIndex((user) => user.id === +id);
        if (index !== -1) {
            users[index] = user;
            showListUsers(users[index]);
            console.log(
                localStorage.setItem(
                    "users[index]",
                    JSON.stringify(users[index])
                )
            );
        }
    }
    updateUsersInStorage();
});

btnAddUser.addEventListener("click", function () {
    form.setAttribute("data-id-user", 0);
});

list.addEventListener("click", function (e) {
    // console.log(e.target);
    const target = e.target;
    if (target.classList.contains("btn-remove")) {
        const item = target.closest("li");
        const id = item.getAttribute("data-id");
        const index = users.findIndex((user) => user.id === +id);
        if (index !== -1) {
            users.splice(index, 1);
            item.remove();
            updateUsersInStorage();
        }
    }
    if (target.classList.contains("btn-edit")) {
        const item = target.closest("li");
        const id = item.getAttribute("data-id");
        const index = users.findIndex((user) => user.id === +id);
        if (index !== -1) {
            const currentUser = users[index];
            form.elements["name"].value = currentUser.name;
            form.elements["age"].value = currentUser.age;
            form.elements["position"].value = currentUser.position;
            form.setAttribute("data-id-user", id);
        }
    }

    if (target.classList.contains("btn-view")) {
        const item = target.closest("li");
        const id = item.getAttribute("data-id");
        const index = users.findIndex((user) => user.id === +id);
        if (index !== -1) {
            const currentUser = users[index];
            const preview = document.querySelector(".preview-user");
            preview.innerHTML = `name: ${currentUser.name} <br />
			age: ${currentUser.age} <br />
			posirion: ${currentUser.position} <br />
			id: ${currentUser.id}`;
        }
    }
});

function showListUsers() {
    list.innerHTML = "";
    users.forEach(addToListUsers);
}

function addToListUsers(user) {
    list.insertAdjacentHTML(
        "beforeend",
        `<li data-id="${user.id}">
        <p>${user.name}</p>
        <button class="btn-edit">Edit</button>
        <button class="btn-remove">Remove</button>
        <button class="btn-view">View</button>
    </li>`
    );
}

function getUsersFromStorage() {
    const usersFromStorage = localStorage.getItem("users");
    if (usersFromStorage !== null) {
        users = JSON.parse(usersFromStorage);
    }
}

function updateUsersInStorage() {
    localStorage.setItem("users", JSON.stringify(users));
}

const clear = document.querySelector(".clear");
clear.addEventListener("click", function () {
    form.elements["name"].value = "";
    form.elements["age"].value = "";
    form.elements["position"].value = "";
});

// при кліку на edit оновлювати не весь список, а один елемент зі списку
