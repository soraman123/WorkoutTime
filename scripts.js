// On reload of page 2 (any exercise day), run getUserInputs:

document.addEventListener('DOMContentLoaded', function() {
  window.addEventListener('load', function() {
    if (location.pathname.includes('page-2.html')) {
      getUserInputs();
    }
  });
});

// Clear local storage. Runs on click of any exercise day button on index.html.

function clearLocalStorage(){
  localStorage.clear();
}

// Created an array for each exercise day:

var allLegDayExercises = ['squats','lunges','deadlifts','hipbridges','nordiccurls','calfraises'];
var allBackDayExercises = ['pullups','backrows','curls','shrugs','supermans','goodmornings'];
var allChestDayExercises = ['benchpress','pushups','dbflys','shoulderpress','shoulderflys','dips'];

const allExerciseNames = [];

// Below will update allExerciseName array, based off page name:

function updateAllExerciseNames() {
  let pageName = document.location.pathname;
  pageName = pageName.slice(-17,-6);
  allExerciseNames.length = 0;
  switch(pageName) {
    case 'g-day-page-':
      allExerciseNames.push(...allLegDayExercises);
      return allExerciseNames;
    case 'k-day-page-':
      allExerciseNames.push(...allBackDayExercises);
      return allExerciseNames;
    case 't-day-page-':
      allExerciseNames.push(...allChestDayExercises);
      return allExerciseNames;
  }
};

updateAllExerciseNames(); //If this isnt here, code chain stops; try async?


// Below a click event is added to all cards, based off what exercise array is selected:

function addClickEventListener(eventName, cssClassToToggle, elementToAddListenerTo, elementToBeToggled) {
  document.querySelector(elementToAddListenerTo).addEventListener(eventName, () => {
    document.querySelector(elementToBeToggled).classList.toggle(cssClassToToggle);
  }); 
};

allExerciseNames.forEach(function(exerciseName){
  var nameOfButton = `${exerciseName}-b`;
  addClickEventListener('click','card-selected',`#${exerciseName}`,`#${nameOfButton}`);
});


// Below an array with only selected elements is created, stored in local storage item 'exercises':

var arrayOfSelectedCardIds = []; 

function updateSelectedExercisesArray(){
  var allSelectedCardElements = document.getElementsByClassName('card-selected'); 
  arrayOfSelectedCardIds = []; 
  localStorage.removeItem('exercises'); 
  var temporaryArray = Array.from(allSelectedCardElements); 
  temporaryArray.forEach(function(element){ 
    arrayOfSelectedCardIds.push(element.getAttribute('id'));
  }); 
  localStorage.setItem('exercises',arrayOfSelectedCardIds);
  console.log(localStorage.getItem('exercises')); 
};


// Get user input on all non-blank fields, save as variable to be used in email API:

function getDynamicMessageContent() {
  var arrayAllSets = [];
  updateAllExerciseNames();
  allExerciseNames.forEach(function(exerciseName){ 
    var setOneName = `${exerciseName}_set_1`;
    var setOneValue = document.forms[0][setOneName].value;
    setOneValue ? arrayAllSets.push(`${setOneName}: ${setOneValue}`) : " "; //Only add non-blank values to array.
    var setTwoName = `${exerciseName}_set_2`;
    var setTwoValue = document.forms[0][setTwoName].value;
    setTwoValue ? arrayAllSets.push(`${setTwoName}: ${setTwoValue}`) : " ";
  });
  var arrayAllSetsModified = arrayAllSets.join('\n');
  console.log(arrayAllSetsModified);
  return arrayAllSetsModified; 
};

// Will update subject line of email:

function getExerciseDaySelected() {
  let pageName = document.location.pathname;
  pageName = pageName.slice(-17,-6);
  allExerciseNames.length = 0;
  switch(pageName) {
    case 'g-day-page-':
      var exerciseDay = 'Leg Day';
      break;
    case 'k-day-page-':
      var exerciseDay = 'Back Day';
      break;
    case 't-day-page-':
      var exerciseDay = 'Chest Day';
      break;
  }
  return exerciseDay;
};


// Send email when clicking submit button on Page 3.

function sendEmail(){
  (function() { emailjs.init('yG52IHiSAOdJI4XSe'); })();
  window.onload = function() {
    document.getElementById('contact-form').addEventListener('submit', function(event) { //adding type='submit' adds this event listener to that input element
      event.preventDefault();
      const date = new Date();
      var currentDayName = date.toString().slice(0,4);
      var currentDay = date.getDate();
      var currentMonth = date.getMonth() + 1;
      var currentYear = date.getFullYear();
      this.date_time.value = `${currentDayName} ${currentMonth}-${currentDay}-${currentYear}`; //Let's change this to current date "Back Workout 04/04/2023"
      this.exercise_day.value = getExerciseDaySelected();
      this.message_content.value = getDynamicMessageContent();
      emailjs.sendForm('Workout_Time_Results', 'Workout_Time_Results!', this)
        .then(function() {
          alert('SUCCESS! Email has been sent. Make sure to check your spam folder just in case!');
        }, function(error) {
          alert('FAILED...Make sure you typed in an email address!', error);
          });
    });
  }
};


// Hide HTML element if local storage doesn't contain its id. Referencing allExerciseNames array.

function hideAllBackDayCards(){
  allExerciseNames.forEach(function hideUnselectedElements(exerciseName) {
    var exerciseCardElement = document.getElementById(`hide-${exerciseName}`);
    exercisesSelected = localStorage.getItem('exercises');
    if (exercisesSelected.includes(exerciseName)) {
      console.log(`${exerciseName} has been selected - do not hide.`)
    } else {
      exerciseCardElement.style.display = "none";
    }
  })
};

// Below is function for index.html buttons:

function goToPageOne(button){
  if (button.classList.contains("legButton")) {
    window.location.href='leg-day-page-1.html';
  } else if (button.classList.contains("backButton")) {
    window.location.href='back-day-page-1.html';
  } else if (button.classList.contains("chestButton")) {
    window.location.href='chest-day-page-1.html';
  }
};

// Add click event to Next Button, to run updateSelectedExercisesArray and then take us to page 2:

function nextButtonToPageTwo(){
  document.querySelector('#nextButton').addEventListener('click', () => {
    let pageName = document.location.pathname;
    pageName = pageName.slice(0,-12);
    updateSelectedExercisesArray();
    window.location.href=`${pageName}-page-2.html`; // This code can be used for any Exercise Day page written as "exercise-day-page-1.html"
  }); 
};

nextButtonToPageTwo();

// Below we save user inputs (works for all pages), attached the function to a Save button:

function saveUserInputs() {
  var inputs = [];
  allExerciseNames.forEach(function(exerciseName){ 
    var setOneName = `${exerciseName}_set_1`;
    var setOneValue = document.forms[0][setOneName].value;
    inputs.push(setOneValue);
    var setTwoName = `${exerciseName}_set_2`;
    var setTwoValue = document.forms[0][setTwoName].value;
    inputs.push(setTwoValue);
  });
  localStorage.setItem("userSetInputs", JSON.stringify(inputs));
  console.log(localStorage.getItem("userSetInputs"));
};

// Below we retrieve userinputs (only works for leg page), attached the function to run on page load event: 

function getUserInputs() {
  var storedInputs = JSON.parse(localStorage.getItem("userSetInputs"));
    for (var i = 0; i < 6; i++) {
      var exerciseName = allExerciseNames[i];
      var setOneName = `${exerciseName}_set_1`;
      document.forms[0][setOneName].value = storedInputs[i*2];
    }
    for (var i = 0; i < 6; i++) {
      var exerciseName = allExerciseNames[i];
      var setOneName = `${exerciseName}_set_2`;
      document.forms[0][setOneName].value = storedInputs[i*2+1];
    }
};




/* Future ideas: 

- Save selected cards on refresh.

*/