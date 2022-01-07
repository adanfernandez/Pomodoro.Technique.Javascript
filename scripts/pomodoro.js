const taskInput = document.querySelector("#taskname");  
const startButton = document.querySelector("#start");
const pendingTime = document.querySelector("#pendingTime");

var counterWorker;

taskInput.addEventListener("input", validate);
pendingTime.style.display= 'none';
startButton.onclick = startTime;

function validate(){
    if(taskInput.value === ""){
        startButton.setAttribute("disabled","disabled");
    } else {
        startButton.removeAttribute("disabled");  
    }
} 

function startTime() {
    if (typeof(Worker)!==undefined) {
        pendingTime.style.display= 'block';
        startButton.setAttribute("disabled","disabled");
        taskInput.setAttribute("disabled","disabled");
        const min = 1;
        pendingTime.innerHTML = `Pending time: ${min-1}:59`
        var interval = window.setInterval(function(){
            counterWorker = new Worker("scripts/timer/timer.js");
            counterWorker.postMessage(min);
            pendingTime.onmessage = displayCounter;
            if(!timer.min && !timer.sec)  stopCounter(interval);
        }, 100);
    }
}

function stopCounter(interval) {
    clearInterval(interval);
    pendingTime.style.display= 'none';
    startButton.removeAttribute('disabled');  
    taskInput.value = '';
    taskInput.removeAttribute("disabled");  
}

function displayCounter(e) {
    pendingTime.innerHTML = e.data;
}