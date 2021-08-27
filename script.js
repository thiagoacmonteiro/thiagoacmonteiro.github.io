const homeButtons = document.getElementsByClassName('home-button');
const aboutMeP = document.getElementById('about-me');
const buttons = document.getElementById('buttons');

addEventClickButton();

// Loop to add event for all buttons
function addEventClickButton () {
  for (let i = 0; i < homeButtons.length; i += 1) {
   homeButtons[i].addEventListener('click', clickHomeButton);
  }
}

// Function to change the button appearance by click
function clickHomeButton (event) {
  event.target.style.padding = '20px 30px';
  event.target.style.fontSize = '20px';
  event.target.style.boxShadow = 'none';
}