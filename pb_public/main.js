const pb = new PocketBase('http://127.0.0.1:8090')
let todoInput = document.querySelector("#todo-input");
let btn = document.querySelector("button");
let list = document.querySelector("#todo-list");
let itemCountSpan = document.querySelector('#item-count')
let uncheckedCountSpan = document.querySelector('#unchecked-count')

const todoTemplate = (todoTitle) => `
  <div class="todo-container text-gray-700 text-center mt-2">
    <div class="flex justify-between bg-cyan-100 shadow mb-2">
      <span class="w-full text-left leading-loose p-2 pl-10 cursor-pointer" onClick="checkTodo(this)">${todoTitle}</span>
      <div class="close-btn p-2 pr-8 text-xl cursor-pointer"></div>
    </div>
  </div>
`

btn.addEventListener("click", function (e) {
  e.preventDefault();
  let text = todoInput.value;
  newTodo(text);
});

async function newTodo(text) {
  
  const taskItem = await pb.collection('todo').create({
    task: todoInput.value,
});
  if (!todoInput.checkValidity()) {
    alert("Your TODO title is missing")

    return false
  }

  list.insertAdjacentHTML('beforeend', todoTemplate(todoInput.value))
  list.lastElementChild.querySelector('.close-btn').addEventListener('click', deleteTodo)

  itemCountSpan.innerHTML++
  uncheckedCountSpan.innerHTML++

  todoInput.value = ""
}

async function checkTodo (el) {
  el.classList.toggle('checked')

  if (el.classList.contains('checked')) {
    uncheckedCountSpan.innerHTML--
  } else {
    uncheckedCountSpan.innerHTML++
  }
}

async function deleteTodo (el) {
  const todoContainer = el.target.parentElement

  todoContainer.parentNode.removeChild(el.target.parentElement)

  if (! todoContainer.querySelector('.checked')) {
    uncheckedCountSpan.innerHTML--
  }

  itemCountSpan.innerHTML--
}
