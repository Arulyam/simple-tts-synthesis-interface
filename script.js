/********* Checkbox Implementation *********/
/* Given the 'id' of an HTML element and a 'className', this will add that class name to the HTML element with the specified id. */
function addClassToElement(id, className) {
  let element = document.getElementById(id);
  element.classList.add(className);
}

/* Given the 'id' of an HTML element and a 'className', this will add that class name to the HTML element with the specified id. */
function removeClassToElement(id, className) {
  let element = document.getElementById(id);
  element.classList.remove(className);
}

function sliderPosCheck() {
  if (!document.getElementById('slideThree').checked) {
    // Set volume-modal to d-none
    addClassToElement("volume-modal-block", "d-none");
    // Set volume-main value to that of volume-modal
    let volMain = document.getElementById("volume-main");
    volMain.value = document.getElementById("volume-modal").value;
    // Remove d-none from volume-main
    removeClassToElement("volume-main-block", "d-none");
  } else {
    // Set volume-main to d-none
    addClassToElement("volume-main-block", "d-none");
    // Set volume-modal value to that of volume-main
    let volModal = document.getElementById("volume-modal");
    volModal.value = document.getElementById("volume-main").value;
    // Remove d-none from volume-modal
    removeClassToElement("volume-modal-block", "d-none");
  }
}

/********* Volume Implementation *********/
var synthesis = window.speechSynthesis;
var utterance = new SpeechSynthesisUtterance();

/* This function "renders" some bit of text as audio to the user. */
function renderTTS(text) {
  // console.log("Available Voices:");
  var voice = synthesis.getVoices().filter(function(voice) {
    // This line is generally annoying in the log
    // console.log(voice.name + " " + voice.lang);
    return voice.name === 'Google UK English Female';
  })[0];

  // Create an utterance object
  // var utterance = new SpeechSynthesisUtterance(text);

  // Set utterance properties
  utterance.text = text;
  utterance.voice = voice;
  utterance.pitch = 1;
  utterance.rate = 1;
  // utterance.volume = volume;
  console.log("Utterance Volume: " + utterance.volume);

  // Speak the utterance
  synthesis.speak(utterance);
}

/* This function runs when the user clicks the "Hear It!" button. */
function encourage() {
  console.log("Button Clicked");

  // Get the Name and Words of Encouragement
  let name = document.getElementById("name").value;
  let encouragement = document.getElementById("encouragement").value;
  // Ensure that only the first word given in input is parsed
  let goal = document.getElementById("post-script").value.split(" ");
  // Generate a random postScript response from array
  let postScript = [`Always remember that your mindfulness of this situation will allow you to reach what you seek. ${goal[0]} is just around the corner!`, `The hard work and dedication you put into everything you do will allow you to achieve ${goal[0]}! You are doing great!`, `Never forget the passion and focus that will allow you to reach your goal of ${goal[0]}! Look at how far you have come and keep on pushing!`];

  //Combine in text
  let finalText = `Hello ${name}, I have something I would like to tell you. ${encouragement} ${postScript[Math.floor(Math.random() * postScript.length)]} Have a nice day!`

  console.log("Message Created");
  //Render text to user
  renderTTS(finalText);
  console.log("TTS Complete");
}

/**
 * This function changes the volume of the utterance variable in renderTTS().
 * It can be accessed using the settings modal on the bottom-right corner.
 */
// Old function called by range input in onchange/oninput attribute
// ex. HTML CODE: [onchange/oninput]="setVolume(document.getElementById('[volume-main/volume-modal]'))"
/*
function setVolume(elem) {
  console.log("Volume changed");
  utterance.volume = elem.value;
}
*/

/**
 * Query Selectors to change volume
 */
document.querySelector("#volume-modal").addEventListener("input", () => {
  volumeEvent("#volume-modal");
});

document.querySelector("#volume-main").addEventListener("input", () => {
  volumeEvent("#volume-main");
});

function volumeEvent(elem) {
  console.log("Volume changed");
  // Get volume Value from the input
  const volume = document.querySelector("#volume-modal").value;
  // Set volume property of the SpeechSynthesisUtterance instance
  utterance.volume = volume;
}

document.body.onkeyup = function(e) {
  if (e.key == " " ||
      e.code == "Space" ||      
      e.keyCode == 32      
  ) {
    console.log("Space key pressed");
    encourage();
  }
}
