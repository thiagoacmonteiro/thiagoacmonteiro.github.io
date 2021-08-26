const homeButtons = document.getElementsByClassName('home-button');

addEventClickButton();

function addEventClickButton () {
  for (let i = 0; i < homeButtons.length; i += 1) {
   homeButtons[i].addEventListener('click', mouseOverHomeButton);
  }
}

function mouseOverHomeButton (event) {
  event.target.style.padding = '20px 30px';
  event.target.style.fontSize = '20px';
  //   homeButton.style.boxShadow = 'rgba(15, 247, 247, 0.589) 3px 3px, rgba(17, 248, 237, 0.301) 6px 6px, rgba(63, 255, 245, 0.2) 9px 9px, rgba(46, 240, 224, 0.1) 12px 12px, rgba(46, 217, 240, 0.05) 15px 15px';
  event.target.style.boxShadow = 'none';
}
