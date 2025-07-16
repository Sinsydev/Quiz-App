const questions = [
   {
       question: "Which of the following is not a programming language?",
       answers: [
           { text: "JavaScript", correct: false },
           { text: "Cascading Stylesheet (CSS)", correct: true },
           { text: "Python", correct: false },
           { text: "C++", correct: false },
       ]
   },
   {
       question: "Which continent is the best continent in the world?",
       answers: [
           { text: "West Africa", correct: false },
           { text: "Europe", correct: true },
           { text: "Australia", correct: false },
           { text: "Asia", correct: false },
       ]
   },
   {
       question: "A person who is used to self-learning is called:",
       answers: [
           { text: "Consistency", correct: false },
           { text: "Tenacious", correct: false },
           { text: "Persistence", correct: false },
           { text: "Self-taught", correct: true },
       ]
   },
   {
       question: "A person who makes videos and posts them online is called:",
       answers: [
           { text: "Content creator", correct: true },
           { text: "Teacher", correct: false },
           { text: "Lecturer", correct: false },
           { text: "Superb", correct: false },
       ]
   },
   { 
    question: "which country is the best country in west africa:",
    answers: [
        { text: "Marroco", correct: false },
        { text: "South africa", correct: false },
        { text: "Ghana", correct: false },
        { text: "Nigeria", correct: true },
    ]
},
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
   currentQuestionIndex = 0;
   score = 0;
   nextButton.innerHTML = "Next";
   showQuestion();
}

function showQuestion() {
   resetState();
   let currentQuestion = questions[currentQuestionIndex];
   let questionNo = currentQuestionIndex + 1;
   questionElement.innerHTML = questionNo + " . " + currentQuestion.question;

   currentQuestion.answers.forEach(answer => {
       const button = document.createElement("button");
       button.innerHTML = answer.text;
       button.classList.add("btn");
       answerButtons.appendChild(button);

       if (answer.correct) {
           button.dataset.correct = answer.correct;
       }
       button.addEventListener("click", selectAnswer);
   });
}

function resetState() {
   nextButton.style.display = "none";
   while (answerButtons.firstChild) {
       answerButtons.removeChild(answerButtons.firstChild);
   }
}

function selectAnswer(e) {
   const selectedBtn = e.target;
   const isCorrect = selectedBtn.dataset.correct === "true";
   if (isCorrect) {
       selectedBtn.classList.add("correct");
       score++;
   } else {
       selectedBtn.classList.add("incorrect");
   }

   Array.from(answerButtons.children).forEach(button => {
       if (button.dataset.correct === "true") {
           button.classList.add("correct");
       }
       button.disabled = true;
   });

   nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
       handleNextButton();
    }else{
      startQuiz()  
    }
})
startQuiz();
