import { getFromLocalStorage, generateTasks, showCompletedTasks, createTask, transferMapToLocalStorage, 
  deleteAllTasksInHTML, deleteTask, showActiveTasks, clearCompleted, 
  removeDisabled, addNewTextToMap, setDisabled, howMuchLeft, onClickBtnCheck, setAllTasksAsCompleted} from "./backstage.js";


const btnAll = document.querySelector("#btnAll"),
  btnActive = document.querySelector("#btnActive"),
  btnCompleted = document.querySelector("#btnCompleted"),
  btnClearCompleted = document.querySelector("#btnClearCompleted"),
  btnsCheck = document.querySelectorAll(".btnCheck"),
  btnsDelete = document.querySelectorAll(".btnDelete"),
  btnSetAllTasksAsCompleted = document.querySelector(".btnSetAllTasksAsCompleted");

const form = document.querySelector(".form");




// ------------------- Po odświerzeniu strony --------------------- //


getFromLocalStorage() // Pobieranie z local storage istniejących zadań

howMuchLeft();

generateTasks() // Generowanie listy zadań na stronie


// ------------------------- Nowe zadanie ------------------------- //


form?.addEventListener("submit", e => {

  e.preventDefault();

  createTask(e) // tworzenie zadania

  form.reset(); // resetowanie pola formulrza

  transferMapToLocalStorage(); // przekazanie zadania do localStorage

  howMuchLeft();

}) 


// ------------------------- Edycja zadania ----------------------- //


addEventListener("click", e => {

  if(e.target.classList.contains("textEdit")) {

    removeDisabled(e)

    console.log("mozna wpisywać")
  
}});

// wprowadzenie nowej treści

addEventListener("keyup", e => {


  if(e.target.classList.contains("textEdit")) {

    addNewTextToMap(e);

    transferMapToLocalStorage();

    howMuchLeft();
  
}})




// ---------------- Przyciski ------------------------------------- //


  // -------------- Formularz ------------------------------------- //


    // ------------ Przycisk - oznacz wszystkie jako ukończone ---- //


    btnSetAllTasksAsCompleted?.addEventListener("click", e => {

      setAllTasksAsCompleted(); // zmiana statusu wszystkich zadań

      transferMapToLocalStorage(); // przekazanie zadania do localStorage

      howMuchLeft();

    })


    // ------------ Przycisk - oznacz jako ukończone -------------- //


      addEventListener("click", e => {

        if(e.target.classList.contains("btnCheck")) {

          console.log("btnCheck", e.target)

          onClickBtnCheck(e);

          deleteAllTasksInHTML(); //  usuwanie wszystkich zadań na stronie 

          generateTasks() // Generowanie listy zadań na stronie

          transferMapToLocalStorage(); // przekazanie zadania do localStorage

          howMuchLeft();

        }
      })


    // ---------------- Przycisk - usuń zadanie ------------------ //


      addEventListener("click", e => {

      if(e.target.classList.contains("imgDelete")) {

        console.log("e.target dla btnDelete", e.target)

        deleteTask(e); // usuwanie zadania

        transferMapToLocalStorage(); // przekazanie mapy do localStorage

        howMuchLeft();

      }});
    


  // -------------- Ustawienia ----------------------------------- //


    // ------------ Przycisk - All ------------------------------- //


      btnAll?.addEventListener("click", e => {


          deleteAllTasksInHTML(); //  usuwanie wszystkich zadań na stronie 

          generateTasks() // Generowanie listy zadań na stronie

          howMuchLeft();

      });
    

    // ------------ Przycisk - Active ---------------------------- //


      btnActive?.addEventListener("click", e => {

        deleteAllTasksInHTML(); //  usuwanie wszystkich zadań na stronie 
        
        showActiveTasks(); // generowanie aktywnych zadań na stronie

        howMuchLeft();

      });


    // ------------ Przycisk - Completed ------------------------- //


      btnCompleted?.addEventListener("click", e => {

        deleteAllTasksInHTML(); //  usuwanie wszystkich zadań na stronie 

        showCompletedTasks(); // pobranie z localStorage

        howMuchLeft();

      });


    // ------------ Przycisk - Clear Completed -------------------- //


      btnClearCompleted?.addEventListener("click", e => {

        deleteAllTasksInHTML();

        showActiveTasks(); // generowanie aktywnych zadań na stronie

        clearCompleted(); // usówanie wykonanych zadań z mapy

        transferMapToLocalStorage(); // przekazanie mapy do localStorage

        howMuchLeft();

      });