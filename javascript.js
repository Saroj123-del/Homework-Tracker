function storeText() {
  let inputText = document.getElementById("textInput").value;
  localStorage.setItem("storedText", inputText);
  window.location.href = "Home.html";
}

const storesText = localStorage.getItem("storedText");
const username = document.getElementById("name");

if (storesText) {
  username.textContent = storesText;
}

let form = document.querySelector("form");
let ls = localStorage.getItem("Title");
let ds = localStorage.getItem("Description");
let ss = localStorage.getItem("Select");
let Title = document.getElementById("title");
let Description = document.getElementById("description");
let Selects = document.getElementById("selected");
let todo = ls ? JSON.parse(ls) : [];
let todos = ds ? JSON.parse(ds) : [];
let todoss = ss ? JSON.parse(ss) : [];

let editingIndex = -1;

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (editingIndex !== -1) {
      todo[editingIndex] = Title.value;
      todos[editingIndex] = Description.value;
      todoss[editingIndex] = Selects.value;
      editingIndex = -1;
    } else {
      todo.push(Title.value);
      todos.push(Description.value);
      todoss.push(Selects.value);
    }

    localStorage.setItem("Title", JSON.stringify(todo));
    localStorage.setItem("Description", JSON.stringify(todos));
    localStorage.setItem("Select", JSON.stringify(todoss));

    form.reset();
    displayTasks();
  });
}

function displayTasks(tasksToShow) {
  document.querySelector("#result").innerHTML = "";
  if (!tasksToShow) {
    tasksToShow = todo.map((item, index) => index);
  }
  tasksToShow.forEach((index) => {
    const data1 = todo[index];
    const data2 = todos[index];
    const data3 = todoss[index];
    document.querySelector("#result").innerHTML += `
        <div id="dataResult2">
        <div id="topresult">
          <h3>${data1}</h3>
          <p>${data3}</p>
          </div>
          <p id="desc">${data2}</p>
          <div id="butto">
          <button id="delt" onclick="del(${index})">Delete</button>
          <button  id="edi"onclick="edit(${index})">Edit</button>
          </div>
          </div>
        `;
  });
}

function edit(index) {
  editingIndex = index;
  Title.value = todo[index];
  Description.value = todos[index];
  Selects.value = todoss[index];
  formresult.style.display = "none";
  formContainer.style.display = "block";
}

function del(index) {
  todo.splice(index, 1);
  todos.splice(index, 1);
  todoss.splice(index, 1);
  localStorage.setItem("Title", JSON.stringify(todo));
  localStorage.setItem("Description", JSON.stringify(todos));
  localStorage.setItem("Select", JSON.stringify(todoss));
  displayTasks();
}

displayTasks();

function filterTasks(filter) {
  let tasksToShow = [];
  switch (filter) {
    case "all":
      tasksToShow = todo.map((item, index) => index);
      formresult.style.display = "block";
      formContainer.style.display = "none";

      break;
    case "inProgress":
      tasksToShow = todo
        .map((item, index) => index)
        .filter((index) => todoss[index] === "In Progress");
      formresult.style.display = "block";
      formContainer.style.display = "none";
      break;
    case "notStarted":
      tasksToShow = todo
        .map((item, index) => index)
        .filter((index) => todoss[index] === "Not Started");
      formresult.style.display = "block";
      formContainer.style.display = "none";

      break;
    case "completed":
      tasksToShow = todo
        .map((item, index) => index)
        .filter((index) => todoss[index] === "Completed");
      formresult.style.display = "block";
      formContainer.style.display = "none";
      break;
    default:
      break;
  }
  displayTasks(tasksToShow);
}

let addbtn = document.getElementById("Add");
let forms = document.getElementById("from");
let cancelbutton = document.getElementById("cancelbtn");
let formcon = document.getElementById("formContainer");
let submitbutton = document.getElementById("submitbtn");
let formresult = document.getElementById("result");
let editbutton = document.getElementById("edi");

addbtn.addEventListener("click", () => {
  formContainer.style.display = "block";
  formresult.style.display = "none";
});

cancelbutton.addEventListener("click", () => {
  formContainer.style.display = "none";
});

submitbutton.addEventListener("click", () => {
  formContainer.style.display = "none";
  formresult.style.display = "block";
});
let cancolbutton = document.getElementById("cancol");
cancolbutton.addEventListener("click", () => {
  formresult.style.display = "none";
  formContainer.style.display = "none";
});

let loginpage = document.getElementById("loginpage");
if (loginpage) {
  loginpage.addEventListener("click", () => {
    window.location.href = "Login.html";
  });
}
