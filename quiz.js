let question1 = new Question(
    "who is the current prime Minister of India",
    ['Indira Gandhi', 'Narendra Modi', 'Devegowda', 'Manmohan Singh'],
    "Narendra Modi"
);

let questions = [
    question1,
    new Question('JavaScript supports', ["Functions", "XHTML", "CSS", "HTML"], 'Functions'),
    new Question('who is the best Batsman in india',
        ["Virat", "Rahul", "Dhawan", "Rishabh"], 'virat'),
    new Question('Which language has got maximum number of followers?', ["javascript", "Java", "python", "Go"], 'javascript'),
    new Question('what is the national animal of india?',
        ["Tiger", "Lion", "Elephant", "cheetah"], 'Tiger'),
    new Question('Which of the following is used in pencil?', ["Graphite", "magnesium", "Iron", "Auminium"], 'Graphite'),
    new Question('Which company accquired GL?', ["upgrad", "Byjus", "Udemy", "Abacus"], 'Byjus'),
    new Question('what does JSON Stand for?',
        ["Java simple object notation", "javascript object notation", "java semi object notation", "None of the above"],
        'java script object notation'),
];

function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.index = 0
}

Quiz.prototype.getQuestionByIndex = function () {
    return this.questions[this.index];
};

Quiz.prototype.checkForCorrectAnswer = function (answer) {

    if (this.getQuestionByIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.index++;
};

Quiz.prototype.isEnded = function () {
    return this.index === this.questions.length;
};

function Question(questionText, choices, answer) {
    this.text = questionText;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
};

function loadQuestions() {
    if (quiz.isEnded()) {
        showFinalScores();
    } else {
        let currentQuestion = quiz.getQuestionByIndex();

        let element = document.getElementById("question");
        element.innerHTML = currentQuestion.text;

        let choices = currentQuestion.choices;
        for (let i = 0; i < choices.length; i++) {
            let eachChoiceElement = document.getElementById("choice" + i);
            eachChoiceElement.innerHTML = choices[i];

            let eachButtonElement = document.getElementById("btn" + i);
            eachButtonElement.onclick = function () {
                quiz.checkForCorrectAnswer(choices[i]);
                loadQuestions();
            };
        }
        showprogress();
    }
}
let quiz = new Quiz(questions);
loadQuestions();

function showFinalScores() {
    let resultPercentage = (quiz.score / questions.length) * 100
    let completeHTML = `<h1>Result</h1>
    <h2 id = 'score'> Your Scores : ${quiz.score} </h2>
    <h3>And mark percentage is: ${resultPercentage}% </h3>
  `;
    let quizCanvas = document.getElementById("quiz");
    quizCanvas.innerHTML = completeHTML;
}

function showprogress() {
    let questNO = quiz.index + 1;
    let element = document.getElementById("progress");
    element.innerHTML = `Question ${questNO} of
    ${quiz.questions.length}`;
}