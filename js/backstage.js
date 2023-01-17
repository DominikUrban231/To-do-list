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

const findBtnCheck = e => findNote(e).querySelector(".btnCheck");

const findNoteInput = e => findNote(e).querySelector(".textEdit");

const findNoteText = e => findNoteInput(e).value;

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


  const taskHTML = `
  <div class="main-note">

      <div class="${taskObject.status == "Active" ?  "btnCheck" : "btnCheck taskDone"}"></div>

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

// visibility: hidden


const onClickBtnCheck = e => {

  const taskStatus = tasksMap.get(getTaskId(e)).status;

  // if(taskStatus == "Active") {
  //   findNoteImg(e).classList.add("taskDone")
  // } 
  
  // if(taskStatus == "Completed")  {
  //   if(findNoteImg(e).classList.contains("taskDone")) {
  //     findNoteImg(e).classList.remove("taskDone")
  //   }
  // }
  console.log(findBtnCheck(e))

  // findBtnCheck(e).className = "btnCheck taskDOne"

  // const findNoteImgClasslist = findNoteImg(e).classList;

  // findBtnCheck(e).className = taskStatus == "Active" ?  "btnCheck taskDone" : "btnCheck"; // pokazywanie / ukrywanie ikony "wykonane"

  // findNoteInput(e).className = taskStatus == "Active" ?  "line-through textEdit" : "textEdit"; // przekreślanie / odkreślanie zawartości notatki

  tasksMap.set(getTaskId(e), { value: findNoteText(e), status: taskStatus == "Active" ? "Completed" : "Active", id: getTaskId(e) }); // zmiana statusu zadania w mapie


  // taskStatus == "Active" ? findNoteInput(e).classList.add("taskDone") : findNoteInput(e).classList.remove("taskDone"); // 




  // taskStatus == "Active" ? (findNoteImgClasslist.remove("hidden") || findNoteImgClasslist.remove("btnCheck")) : (findNoteImgClasslist.add("hidden") || findNoteImgClasslist.add("btnCheck")); // 

  // console.log()



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



export {
  getFromLocalStorage, generateTasks, showCompletedTasks, createTask, transferMapToLocalStorage,
  deleteAllTasksInHTML, deleteTask, showActiveTasks, clearCompleted,
  removeDisabled, addNewTextToMap, setDisabled, howMuchLeft, onClickBtnCheck, setAllTasksAsCompleted
}