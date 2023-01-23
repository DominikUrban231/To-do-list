import { getFromLocalStorage, generateTasks, createTask, transferMapToLocalStorage, deleteTask, clearCompleted, 
  removeDisabled, addNewTextToMap, howMuchLeft, toggleChangeStatusTaskInMap, 
  setAllTasksAsCompleted, whichIsActiveToAll} from "./backstage.js";


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

howMuchLeft(); // ile aktywnych zadań zostało

whichIsActiveToAll(); // zmiana statusu zmiennej na null

generateTasks() // Generowanie listy zadań na stronie


// ------------------------- Nowe zadanie ------------------------- //


form?.addEventListener("submit", e => {

  e.preventDefault();

  createTask(e) // tworzenie zadania

  form.reset(); // resetowanie pola formulrza

  transferMapToLocalStorage(); // przekazanie zadania do localStorage

  howMuchLeft(); // ile aktywnych zadań zostało

}) 


// ------------------------- Edycja zadania ----------------------- //


addEventListener("click", e => {

  if(e.target.classList.contains("textEdit")) {

    removeDisabled(e)
  
}});

// wprowadzenie nowej treści

addEventListener("keyup", e => {

  if(e.target.classList.contains("textEdit")) {

    addNewTextToMap(e);

    transferMapToLocalStorage();

    howMuchLeft(); // ile aktywnych zadań zostało
  
}})




// ---------------- Przyciski ------------------------------------- //


  // -------------- Formularz ------------------------------------- //


    // ------------ Przycisk - oznacz wszystkie jako ukończone ---- //


    btnSetAllTasksAsCompleted?.addEventListener("click", e => {

      setAllTasksAsCompleted(); // zmiana statusu wszystkich zadań

      generateTasks() // Generowanie listy zadań na stronie

    })


    // ------------ Przycisk - oznacz jako ukończone -------------- //


      addEventListener("click", e => {

        if(e.target.classList.contains("btnCheck")) {

          toggleChangeStatusTaskInMap(e);

          generateTasks() // Generowanie listy zadań na stronie

        }
      })


    // ---------------- Przycisk - usuń zadanie ------------------ //


      addEventListener("click", e => {

      if(e.target.classList.contains("imgDelete")) {

        deleteTask(e); // usuwanie zadania

        transferMapToLocalStorage(); // przekazanie mapy do localStorage

        howMuchLeft(); // ile aktywnych zadań zostało

      }});
    


  // -------------- Ustawienia ----------------------------------- //


    // ------------ Przycisk - All ------------------------------- //


      btnAll?.addEventListener("click", e => {

        generateTasks("All") // Generowanie listy zadań na stronie

      });
    

    // ------------ Przycisk - Active ---------------------------- //


      btnActive?.addEventListener("click", e => {

        generateTasks("Active") // Generowanie listy zadań na stronie

      });


    // ------------ Przycisk - Completed ------------------------- //


      btnCompleted?.addEventListener("click", e => {

        generateTasks("Completed") // Generowanie listy zadań na stronie

      });


    // ------------ Przycisk - Clear Completed -------------------- //


      btnClearCompleted?.addEventListener("click", e => {

        clearCompleted(); // usówanie wykonanych zadań z mapy

        generateTasks("All") // Generowanie listy zadań na stronie

      });      