const questions = [
    {
        question: "What is the capital of India?",
        options: ["Mumbai", "New Delhi", "Bangalore", "Kolkata"],
        answer: "New Delhi"
    },
    {
        question: "Which is the largest state in India by area?",
        options: ["Maharashtra", "Uttar Pradesh", "Rajasthan", "Gujarat"],
        answer: "Rajasthan"
    },
    {
        question: "Who is known as the Father of the Nation in India?",
        options: ["Jawaharlal Nehru", "Mahatma Gandhi", "B.R. Ambedkar", "Sardar Patel"],
        answer: "Mahatma Gandhi"
    },
    {
        question: "Which river is considered the holiest river in India?",
        options: ["Ganges", "Yamuna", "Saraswati", "Godavari"],
        answer: "Ganges"
    },
    {
        question: "What is the national animal of India?",
        options: ["Lion", "Tiger", "Elephant", "Peacock"],
        answer: "Tiger"
    },
    {
        question: "Which festival is known as the Festival of Lights?",
        options: ["Holi", "Diwali", "Eid", "Christmas"],
        answer: "Diwali"
    },
    {
        question: "What is the official currency of India?",
        options: ["Dollar", "Euro", "Rupee", "Yen"],
        answer: "Rupee"
    },
    {
        question: "Which is the national flower of India?",
        options: ["Rose", "Lotus", "Sunflower", "Marigold"],
        answer: "Lotus"
    },
    {
        question: "Who was the first Prime Minister of India?",
        options: ["Indira Gandhi", "Lal Bahadur Shastri", "Jawaharlal Nehru", "Rajiv Gandhi"],
        answer: "Jawaharlal Nehru"
    },
    {
        question: "Which city is known as the Silicon Valley of India?",
        options: ["Hyderabad", "Bangalore", "Pune", "Chennai"],
        answer: "Bangalore"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-button');
const resultContainer = document.getElementById('result-container');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-button');
const viewAnswersButton = document.getElementById('view-answers-button');
const answersContainer = document.getElementById('answers-container');

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    nextButton.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    answersContainer.classList.add('hidden');
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    optionsElement.innerHTML = '';
    question.options.forEach(option => {
        const button = document.createElement('div');
        button.innerText = option;
        button.classList.add('option');
        button.addEventListener('click', () => selectOption(option));
        optionsElement.appendChild(button);
    });
}

function selectOption(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    userAnswers.push(selectedOption);
    if (selectedOption === currentQuestion.answer) {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showResult();
    }
}

function showResult() {
    nextButton.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    scoreElement.innerText = `${score} out of ${questions.length}`;
}

function showAnswers() {
    answersContainer.classList.remove('hidden');
    answersContainer.innerHTML = '';
    questions.forEach((question, index) => {
        const answerDiv = document.createElement('div');
        answerDiv.classList.add('answer');
        answerDiv.innerHTML = `
            <strong>Q${index + 1}: ${question.question}</strong><br>
            Your Answer: <span class="${userAnswers[index] === question.answer ? 'correct' : 'wrong'}">${userAnswers[index]}</span><br>
            Correct Answer: <span class="correct">${question            .answer}</span><br><br>
            `;
            answersContainer.appendChild(answerDiv);
        });
    }
    
    restartButton.addEventListener('click', startGame);
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion(questions[currentQuestionIndex]);
        } else {
            showResult();
        }
    });
    
    viewAnswersButton.addEventListener('click', showAnswers);
    
    // Start the game when the page loads
    startGame();