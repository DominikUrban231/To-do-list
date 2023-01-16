// stałe i zmienne

const form = document.querySelector(".form");

const notes = document.querySelector(".notes");


// tworzenie tablicy z zadaniami jako "mapa"

let tasksMap = new Map();

let toggleActiveTasks = false;


// ------------------------------ SEGMENTY -------------------------------- //

const classList = e => e.target.classList;

const mapToArray = () => [...tasksMap.values()]

const contentsOfTheNote = e => e.target.note.value;

const removeNote = e => findNote(e).remove();

const getTaskId = e => findNote(e).id;

const findNote = e => e.target.closest(".note");

const findNoteImg = e => findNote(e).querySelector("img");

const findNoteText = e => findNoteInput(e).value;

const findNoteInput = e => findNote(e).querySelector("input");

const removeDisabled = e => e.target.removeAttribute("disabled");

const setDisabled = e => e.target.setAttribute("disabled", "true");

const deleteAllTasksInHTML = () => document.querySelectorAll(".note").forEach(el => el.remove())

const transferMapToLocalStorage = () => localStorage.setItem("todos", JSON.stringify(Object.fromEntries(tasksMap)));

const activeTasksLenght = () => [...tasksMap].filter(el => el.status === "Active").length




// ---------------------------------------- //

// Pobieranie z local storage

const getFromLocalStorage = () => {

  if (localStorage.getItem("todos")) {

    tasksMap = new Map(Object.entries(JSON.parse(localStorage.getItem("todos"))));

    console.log(tasksMap);

  }
}


// przekazuj tablice z zadaniami: wszystkie, aktywne, wykonane

const createTaskHTML = (taskObject) => {

  // const img1 = new Image();
  // const img2 = new Image();

  // img1.src = `icons/task_alt_FILL0_wght400_GRAD0_opsz48.svg`;
  // img2.src = `icons/delete_FILL0_wght400_GRAD0_opsz48.svg`;

  const taskHTML = `
  <div class="main-note">

      <div>
        <button class="btnCheck button"><img class="imgCheck" src="icons/task_alt_FILL0_wght400_GRAD0_opsz48.svg"/></button>
      </div>

      <div class="input inputText">
        <input class="textEdit" disabled value="${taskObject.value}"></input>
      </div>

      <div>
          <button class="btnDelete button"><img class="imgDelete" src="icons/delete_FILL0_wght400_GRAD0_opsz48.svg"/></button>
      </div>

  </div>
  <div class="dash"></div>
`;

const div = document.createElement("div");
div.classList.add("note");
div.setAttribute("id", taskObject.id);

div.innerHTML = taskHTML;
const placeForTask = document.querySelector(".notes");
placeForTask?.prepend(div);

}


// Generowanie zadań

const generateTasks = (tasks) => {
  const data = !tasks ? tasksMap : tasks;

  data.forEach(element => {
    console.log("generateTasks", element);
    createTaskHTML(element);
  })
};




// ----------------------------------------------------- //



// Tworzenie nowego zadania

const createTask = e => {
  let usedId = Date.now().toString();

  console.log("usedId", usedId);

  let task = {
    value: contentsOfTheNote(e),
    status: "Active",
    id: usedId,
  };




  console.log("createTask", e.target);
  createTaskHTML(task);
  tasksMap.set(usedId, task)

  console.log("tasksMap", tasksMap);


};

// dodawanie obrazów do przycisków


  // document.querySelector("btnCheck")?.append(img1)
  



// Przekazywanie mapy do localStorage





// ----------------------------- Edycja zadania -------------------------- //


const addNewTextToMap = e => {

  // 1. pobierz wpisaną wartość

  const value = e.target.value;

  // 2. pobierz ID edytowanej notatki

  // getTaskId()

  console.log("addNewTextToMap", tasksMap)

  // 3. uaktualnij mapę o nowy tekst korzystając z ID zadania

  tasksMap.set(getTaskId(e), { value: value, status: "Active", id: getTaskId(e) });

  console.log("addNewTextToMap", tasksMap)

};


// ----------------------- Przycisk - oznacz wszystkie jako ukończone --------- //


const setAllTasksAsCompleted = () => {

  mapToArray().map( el => {

    tasksMap.set(el.id, { value: el.value, status: toggleActiveTasks ? "Completed" : "Active", id: el.id });

  })

  toggleActiveTasks = !toggleActiveTasks;

  console.log(toggleActiveTasks)

}




  
// ----------------------- Przycisk - oznacz jako ukończone -------------------- //


const onClickBtnCheck = e => {

  const taskStatus = tasksMap.get(getTaskId(e)).status;

  taskStatus == "Active" ? findNoteImg(e).classList.remove("hidden") : findNoteImg(e).classList.add("hidden"); // pokazywanie / ukrywanie ikony "wykonane"

  tasksMap.set(getTaskId(e), { value: findNoteText(e), status: taskStatus == "Active" ? "Completed" : "Active", id: getTaskId(e) }); // zmiana statusu zadania w mappie

  taskStatus == "Active" ? findNoteInput(e).classList.add("taskDone") : findNoteInput(e).classList.remove("taskDone"); // przekreślanie / odkreślanie zawartości notatki

}




// ----------------------- Przycisk usuwania zadania -------------------- //


const deleteTask = e => {

  tasksMap.delete(getTaskId(e));

  console.log(tasksMap);

  removeNote(e);

}


// ----------------------- Przycisk - Active -------------------- //

// aktywne

const showActiveTasks = () => {

  // 1. stwórz nową mapę tylko z zadaniami aktywnymi
  // 2. iteruj po mapie aby stworzyć nową mapę
  // 3. znajdź odnośnik do zadań aktywnych


  const tasksMapArray = mapToArray();

  const filterTasksMap = tasksMapArray.filter(el => el.status === "Active");

  console.log(filterTasksMap);

  deleteAllTasksInHTML();

  generateTasks(filterTasksMap);

};

// ---------------------- Przycisk - Completed -------------------- //

const showCompletedTasks = () => {

  const tasksMapArray = mapToArray();

  const filterTasksMap = tasksMapArray.filter(el => el.status === "Completed");

  deleteAllTasksInHTML();

  generateTasks(filterTasksMap);

};


// ----------------- Przycisk - Clear Completed ---------------- //

// usuwanie wykonanych zadań

const clearCompleted = () => {

  [...tasksMap.values()].forEach(object => {

    console.log(object)

    if (object.status === "Completed") {

      tasksMap.delete(object.id)

    }


  });
};


// ----------------- How much left --------------------------------------- //

const howMuchLeft = () => {

  const tasksMapArray = mapToArray(); // zamiana mapy na tablicę

  const activeTasksLeft = tasksMapArray.filter(el => el.status === "Active").length;

  console.log(`howMuchLeft`, activeTasksLeft)

  document.querySelector(".items-left").innerText = activeTasksLeft

}






// const remaining_element = collection.filter((val, key) => val % 2 == 0); 








export {
  getFromLocalStorage, generateTasks, showCompletedTasks, createTask, transferMapToLocalStorage,
  deleteAllTasksInHTML, deleteTask, showActiveTasks, clearCompleted,
  removeDisabled, addNewTextToMap, setDisabled, howMuchLeft, onClickBtnCheck, setAllTasksAsCompleted
}