// -------------------- Stae ----------------------------------------------- //


const form = document.querySelector(".form");

const notes = document.querySelector(".notes");


// -------------------- Mapa i zmienne ------------------------------------- //


let tasksMap = new Map();

let toggleActiveTasks = "Active";

let whichIsActive = "All";


// ------------------------------ SEGMENTY -------------------------------- //


const activeTasksFromMap = () => mapToArray().filter(el => el.status === "Active");

const completedTasksFromMap = () => mapToArray().filter(el => el.status === "Completed");

const generatingTask = data => data.forEach(element => {createTaskHTML(element)});

const classList = e => e.target.classList;

const mapToArray = () => [...tasksMap.values()];

const contentsOfTheNote = e => e.target.note.value;

const removeNote = e => findNote(e).remove();

const getTaskId = e => findNote(e).id;

const findNote = e => e.target.closest(".note");

const findBtnCheck = e => findNote(e).querySelector(".btnCheck");

const findNoteInput = e => findNote(e).querySelector(".textEdit");

const findNoteText = e => findNoteInput(e).value;

const removeDisabled = e => e.target.removeAttribute("disabled");

const setDisabled = e => e.target.setAttribute("disabled", "true");

const deleteAllTasksInHTML = () => document.querySelectorAll(".note").forEach(el => el.remove())

const transferMapToLocalStorage = () => localStorage.setItem("todos", JSON.stringify(Object.fromEntries(tasksMap)));

const whichIsActiveToSessionStorage = (activeButton) => sessionStorage.setItem("whichButtonIsActive", activeButton);

const whichIsActiveFromSessionStorage = () => whichIsActive = sessionStorage.getItem("whichButtonIsActive");

const activeTasksLenght = () => [...tasksMap].filter(el => el.status === "Active").length;


// -------------------- Pobieranie z local storage ------------------------------------- //


const getFromLocalStorage = () => {

  if (localStorage.getItem("todos")) {

    tasksMap = new Map(Object.entries(JSON.parse(localStorage.getItem("todos"))));

  }
}

const createTaskHTML = (taskObject) => {


  const taskHTML = `
  <div class="main-note">

      <div class="${taskObject.status == "Active" ?  "btnCheck Active" : "btnCheck taskDone"}"></div>

      <div class="input inputText">
        <input class="${taskObject.status == "Active" ?  "textEdit" : "textEdit line-through"}" disabled value="${taskObject.value}"></input>
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


// -------------------- Generowanie zadań ------------------------------------- //


const generateTasks = (activeButton) => {

  transferMapToLocalStorage(); // przekazanie zadania do localStorage

  deleteAllTasksInHTML(); //  usuwanie wszystkich zadań na stronie 

  if(activeButton) {

    whichIsActiveToSessionStorage(activeButton); // aktywny przycisk do sessionStorage

  }

  whichIsActiveFromSessionStorage() // pobranie aktywnego przycisku z sessionStorage

  console.log("który jest aktywny", whichIsActive);

  if ( whichIsActive == "Active") {

    generatingTask(activeTasksFromMap());

  } else if (  whichIsActive == "Completed") {

    generatingTask(completedTasksFromMap());

  } else if(whichIsActive == "All") {

    generatingTask(mapToArray());


  };

  howMuchLeft(); // ile aktywnych zadań zostało


};


// -------------------- Tworzenie nowego zadania ------------------------------ //


const createTask = e => {
  let usedId = Date.now().toString();

  let task = {
    value: contentsOfTheNote(e),
    status: "Active",
    id: usedId,
  };

  createTaskHTML(task);

  tasksMap.set(usedId, task)

};


// ----------------------------- Edycja zadania ------------------------------- //


const addNewTextToMap = e => tasksMap.set(getTaskId(e), { value: e.target.value, status: "Active", id: getTaskId(e) });


// ----------------------- Przycisk - oznacz wszystkie jako ukończone --------- //


const setAllTasksAsCompleted = () => {

  mapToArray().map( el => {

    tasksMap.set(el.id, { value: el.value, status: toggleActiveTasks ? "Completed" : "Active", id: el.id });

  })

  toggleActiveTasks = !toggleActiveTasks;

  console.log(toggleActiveTasks)

}

  
// ----------------------- Przycisk - oznacz jako ukończone -------------------- //


const toggleChangeStatusTaskInMap = e => {

  const taskStatus = tasksMap.get(getTaskId(e)).status;

  tasksMap.set(getTaskId(e), { value: findNoteText(e), status: taskStatus == "Active" ? "Completed" : "Active", id: getTaskId(e) }); // zmiana statusu zadania w mapie

}


// ----------------------- Przycisk usuwania zadania --------------------------- //


const deleteTask = e => {

  tasksMap.delete(getTaskId(e));

  removeNote(e);

}


// ----------------------- Przycisk - All -------------------------------------- //


const whichIsActiveToAll = () => whichIsActive = "All";


// ----------------- Przycisk - Clear Completed ------------------------------- //


const clearCompleted = () => {

  mapToArray().forEach(object => {

    if (object.status === "Completed") {

      tasksMap.delete(object.id)

    }

  });
};


// ----------------- How much left ------------------------------------------ //

const howMuchLeft = () => {

  const activeTasksLeft = mapToArray().filter(el => el.status === "Active").length;

  document.querySelector(".items-left").innerText = activeTasksLeft

}


export {
  getFromLocalStorage, generateTasks, createTask, transferMapToLocalStorage, deleteAllTasksInHTML, deleteTask, clearCompleted,
  removeDisabled, addNewTextToMap, setDisabled, howMuchLeft, toggleChangeStatusTaskInMap, setAllTasksAsCompleted, whichIsActiveToAll, whichIsActiveToSessionStorage, whichIsActiveFromSessionStorage, activeTasksFromMap
}