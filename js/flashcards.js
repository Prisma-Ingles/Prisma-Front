const flashcards = [
    { question: "What is a variable?", answer: "A container used to store data values." },
    { question: "What is a function?", answer: "A reusable block of code designed to perform a task." },
    { question: "What is an API?", answer: "A set of rules that allows communication between systems." },
    { question: "What is debugging?", answer: "The process of finding and fixing errors in code." },
    { question: "What is a loop?", answer: "A structure used to repeat a block of code." },
    { question: "What is a framework?", answer: "A structure that provides tools and guidelines for building applications." },
    { question: "What is front-end development?", answer: "The part of development that focuses on the user interface." },
    { question: "What is back-end development?", answer: "Handles server logic, databases, and APIs." },
    { question: "What is a database?", answer: "An organized collection of data." },
    { question: "What is version control?", answer: "A system that tracks code changes over time." },
    { question: "What is Git?", answer: "A version control system used by developers." },
    { question: "What is deployment?", answer: "Making an application available to users." }
];

let index = 0;
let timerInterval = null;
let timeLeft = 30;
const TOTAL_TIME = 30;

const card = document.getElementById('card');
const front = document.getElementById('front');
const back = document.getElementById('back');
const progress = document.getElementById('progress');
const timerText = document.getElementById('timerText');
const timerCircleProgress = document.querySelector('.timer-circle-progress');

function updateCard() {
    front.innerText = flashcards[index].question;
    back.innerText = flashcards[index].answer;

    progress.innerText = `Card ${index + 1} de ${flashcards.length}`;

    card.classList.remove('flipped');
    resetTimer();
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = TOTAL_TIME;
    timerText.innerText = timeLeft;
    updateTimerDisplay();
    startTimer();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerText.innerText = timeLeft;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            card.classList.add('flipped');
        }
    }, 1000);
}

function updateTimerDisplay() {
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (timeLeft / TOTAL_TIME) * circumference;
    timerCircleProgress.style.strokeDashoffset = offset;
}

document.getElementById('flip').addEventListener('click', () => {
    card.classList.toggle('flipped');
});

document.getElementById('next').addEventListener('click', () => {
    index = (index + 1) % flashcards.length;
    updateCard();
});

updateCard();
