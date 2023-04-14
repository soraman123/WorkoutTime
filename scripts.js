/* 
Below we create an array of all card exercise names, create a function template for adding a click event,
and then add click event to all once. This click event will toggle the 'card-selected' CSS on every click.
This way if our card elements change, all we have to do is update the array. 
*/

const allExerciseNames = [
  'pullup',
  'backrow',
  'curls',
  'shrugs',
  'supermans',
  'goodmornings'
];

function addClickEventListener(eventName, cssClassToToggle, elementToAddListenerTo, elementToBeToggled) {
  document.querySelector(elementToAddListenerTo).addEventListener(eventName, () => {
    document.querySelector(elementToBeToggled).classList.toggle(cssClassToToggle);
  }); 
}

allExerciseNames.forEach(function(exerciseName) {
  var nameOfButton = `${exerciseName}-b`;
  addClickEventListener('click','card-selected',`#${exerciseName}`,`#${nameOfButton}`);
});


// Below I create an array with only "card-selected" id elements.

var allSelectedCardElements = document.getElementsByClassName('card-selected'); // getElementsbyClassName will return an HTML COllection array-like item.

arrayOfSelectedCardIds = [];

function updateSelectedExercisesArray(){ //This function updates local storage item 'exercises'.

  arrayOfSelectedCardIds = []; 
  localStorage.removeItem('exercises');  // Reset arrayOfSelectedCardIds and local storage item 'exercises'.

  var temporaryArray = Array.from(allSelectedCardElements); 
  temporaryArray.forEach(function(element){ 
    arrayOfSelectedCardIds.push(element.getAttribute('id'));
  }); 
  localStorage.setItem('exercises',arrayOfSelectedCardIds);
  console.log(localStorage.getItem('exercises')); 
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
        emailjs.sendForm('Workout_Time_Results', 'Workout_Time_Results!', this)
            .then(function() {
                alert('SUCCESS! Email has been sent. Make sure to check your spam folder just in case!');
            }, function(error) {
                alert('FAILED...', error);
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


// Add click event to Next Button, to run updateSelectedExercisesArray and then take us to page 3.

document.querySelector('#nextButton').addEventListener('click', () => {
  let pageName = document.location.pathname;
  pageName = pageName.slice(0,-12);
  updateSelectedExercisesArray();
  window.location.href=`${pageName}-page-2.html`; // This code can be used for any Exercise Day page written as "exercise-day-page-1.html"
}); 


/* Future ideas: 

2. Separate script page for each html page.

1. Create functionality for saving/sending user input in the input fields.
  a. Use local storage to save input fields, so if someone goes back and forward it'll save their inputted data?

- Change function from hiding elements that aren't selected -> adding elements that ARE selected.
  a. Would make more sense for me and others viewing the code.

3. Future: have one script page that exports main functions to other scripts.
  a. This way if I ever want to change main function I wouldn't have to go through several scripts manually updating them all, just update one. Also would make each script page much smaller.

- Not sure: allow users to select their exercises list on page 2 from a large database (drop-down list)?

- Email API: Create a hidden input field (similar to contact_number) that can create a large, dynamic text body that pulls variables from JS; only pulling input fields selected, and not all fields. Then use email API to import just this {{ text_body }}.

- Change onclick events on index.html to functions in script.

- Save selected cards and user input even on refresh.

*/

// 1. Create functionality for saving/sending user input in the input fields.

function testSaveInput() {
  var inputt = document.getElementById('test-input').value;
  alert(inputt);
}

