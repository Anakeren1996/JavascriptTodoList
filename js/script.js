const todoList = JSON.parse(localStorage.getItem("todoList")) || [
  {
    name: "make dinner",
    dueDate: "2023-04-13",
  },
  {
    name: "wash dishes",
    dueDate: "2023-04-13",
  },
];

renderTodoList();

// DISPLAY SOMETHING ON THE PAGE
function renderTodoList() {
  let todoListHTML = "";
  localStorage.setItem("todoList", JSON.stringify(todoList));

  // WE ARE PASSING A FUNCTION INTO ANOTHER FUNCTION = IT'S RECOMENDED TO USE AN ARROW FUNCTION HERE
  // todoList.forEach(function (todoObject, index) {
  todoList.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject;

    const html = `
        <div>${name}</div>
        <div>${dueDate}</div>
        <button class="delete-todo-button js-delete-todo-button">
        Delete
        </button>
      `;
    todoListHTML += html;
  });

  // for (let i = 0; i < todoList.length; i++) {
  //   const todoObject = todoList[i];
  //   // const name = todoObject.name;
  //   // const dueDate = todoObject.dueDate;
  //   const { name, dueDate } = todoObject;

  //   const html = `
  //       <div>${name}</div>
  //       <div>${dueDate}</div>
  //       <button onclick="todoList.splice(${i}, 1); renderTodoList()"; class="delete-todo-button">
  //       Delete
  //       </button>
  //     `;
  //   todoListHTML += html;
  // }

  // console.log(todoListHTML);

  document.querySelector(".js-todo-list").innerHTML = todoListHTML;

  // GIVES US ALL THE ELEMENTS ON THE PAGE
  // console.log(document.querySelectorAll('.js-delete-todo-button'));
  document
    .querySelectorAll(".js-delete-todo-button")
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener("click", () => {
        todoList.splice(index, 1);
        renderTodoList();
      });
    });
}

window.onload = function () {
  document.querySelector(".js-name-input").focus();
};

document.querySelector(".js-add-todo-button").addEventListener("click", () => {
  addTodo();
});

function addTodo() {
  const inputElement = document.querySelector(".js-name-input");
  const name = inputElement.value;
  //    console.log(name);

  const dateInputElement = document.querySelector(".js-due-date-input");
  const dueDate = dateInputElement.value;

  localStorage.setItem("todoList", JSON.stringify(todoList));

  if (name !== "") {
    // PUSH ADD A VALUE AT THE END OF THE ARRAY
    todoList.push({
      // name: name,
      // dueDate: dueDate // OR A SHORTCUT IF THE PROPERTY OR THE VARIABLE NAME ARE THE SAME (SHORTHAND PROPERTY)
      name,
      dueDate,
    });
    //   console.log(name); // -> PRINT THE VALUE INSIDE INPUT
    // console.log(todoList);
  }

  // RESET THE TEXTBOX
  inputElement.value = "";
  inputElement.focus();

  renderTodoList();
}
