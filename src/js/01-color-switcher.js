const  selectors = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    conteiner: document.querySelector('body'),
}
let intervalId = null;

function getRandomHexColor() {
return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function startChangingColor() {
    // disabled button Start
    selectors.startBtn.disabled = true; 

    intervalId = setInterval(() => {
    selectors.conteiner.style.backgroundColor = getRandomHexColor();
    }, 1000);
    }


function stopChangingColor() {
  //active button Start
  selectors.startBtn.disabled = false; 
  clearInterval(intervalId);
}

selectors.startBtn.addEventListener('click', startChangingColor);
selectors.stopBtn.addEventListener('click', stopChangingColor);

