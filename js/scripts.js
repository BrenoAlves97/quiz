//declaração de variáveis
const question = document.querySelector('#question');
const scoreContainer = document.querySelector('#score-container');
const answersBox = document.querySelector('#answers-box');
const quizzContainer = document.querySelector('#quizz-container');
const letters = ['a', 'b', 'c', 'd']; // alternativas
let points = 0;
let actualQuestion = 0; 

// perguntas
const questions = [
    {
        "question": "O PHP foi desenvolvido para qual fim?",
        "answers": [
            {
                "answer": "Back-end",
                "correct": true,
            },
            {
                "answer": "Front-end",
                "correct": false,
            },
            {
                "answer": "Sistema operacional",
                "correct": false,
            },
            {
                "answer": "Banco de dados",
                "correct": false,
            },
        ]
    },
    {
        "question": "Uma forma de declarar variáveis no JS:",
        "answers": [
            {
                "answer": "#var",
                "correct": false,
            },
            {
                "answer": "let",
                "correct": true,
            },
            {
                "answer": "$let",
                "correct": false,
            },
            {
                "answer": "@var",
                "correct": false,
            },
        ]
    },
    {
        "question": "O HTML é uma linguagem de...",
        "answers": [
            {
                "answer": "Programação",
                "correct": false,
            },
            {
                "answer": "Marcação",
                "correct": true,
            },
            {
                "answer": "Estilo",
                "correct": false,
            },
            {
                "answer": "Consulta",
                "correct": false,
            },
        ]
    },
    {
        "question": "Qual é o seletor de ID no CSS?",
        "answers": [
            {
                "answer": "$",
                "correct": false,
            },
            {
                "answer": "@",
                "correct": false,
            },
            {
                "answer": "_",
                "correct": false,
            },
            {
                "answer": "#",
                "correct": true,
            },
        ]
    },
    {
        "question": "Interface que permite manipular elementos HTML?",
        "answers": [
            {
                "answer": "CSS",
                "correct": false,
            },
            {
                "answer": "JSON",
                "correct": false,
            },
            {
                "answer": "DOM",
                "correct": true,
            },
            {
                "answer": "Array",
                "correct": false,
            },
        ]
    },
];

//cria uma pergunta
function createQuestion(i) {
    
    //limpar a questão anterior - removendo o botões do container - limpando as alternativas
    const oldButtons = answersBox.querySelectorAll('button');
    oldButtons.forEach(function (btn) {
        const parent = btn.parentNode;
        parent.removeChild(btn);
    });

    //pegando os elementos para alterar o texto da pergunta
    const questionNumber = document.querySelector('#question-number');
    const questionText = document.querySelector('#question-text')

    //alterando o texto da pergunta + número
    questionNumber.textContent = i + 1;
    questionText.textContent = questions[i].question;

    //insere as alternativas
    questions[i].answers.forEach(function (answer, i) {
        const answerTemplate = document.querySelector('.answer-template').cloneNode(true); //clonando o template para utiliza-lo
        const letterBtn = answerTemplate.querySelector('.btn-letter');
        const answerText = answerTemplate.querySelector('.question-answer');

        //inserindo as letras e passando as perguntas do obj
        letterBtn.textContent = letters[i]; //letra vindo do array - indice passando como argumento
        answerText.textContent = answer.answer;

        //passando o atributo correct, com o valor de correto ou não a partir do obj
        answerTemplate.setAttribute('correct-answer', answer.correct);

        //remover as classes não necessárias
        answerTemplate.classList.remove('hide');
        answerTemplate.classList.remove('answer-template'); //removendo a class answer-template para inserir no container

        //inserindo na tela
        answersBox.appendChild(answerTemplate);

        //inserir um evento de click
        answerTemplate.addEventListener('click', function () {
            checkAnswer(this);
        })
    });

    //incrementar o número da questão
    actualQuestion++;
}

//substituição do quizz para a primeira pergunta
function init() {
    //criar a primeira pergunta
    createQuestion(actualQuestion);//ou passaria o 0;
}

//checando resposta 
function checkAnswer(btn) {
    //seleciona todos os botões
    const buttons = answersBox.querySelectorAll('button');

    //verifica se a resposta está correta
    buttons.forEach(function (button) {
       
        const checkClass = button.getAttribute('correct-answer');

        if (checkClass === 'true') {
            button.classList.add('correct-answer');
            //checa se o usuario acertou a pergunta
            if (btn === button) {
                points++;
            //aumentar os pontos somente se o botão clicado for igual o botão com o correct answer retornando true;
            } 
        } else {
            button.classList.add('wrong-answer');
        }
    });

    //próxima pergunta 
    nextQuestion();
}

//função que chama a próxima pergunta
function nextQuestion() {

    //timer para o usuário checar as respostas
    setTimeout(() => {
        
        //checar se ainda há perguntas
        if (actualQuestion >= questions.length) {
            //exibir painel com resultados
            showSuccessMessage();
            return; //retorno antecipado caso a condição seja true;
        }

        createQuestion(actualQuestion);
        //chamandando a nova pergunta com o valor incrementado

    }, 1500);
};

//exibe a tela final
function showSuccessMessage() {
    //mostrar ou esconder o quizz
    hideOrShowQuizz();

    //trocar dados da tela de sucesso - encapsulando em variáveis
    const totalPoints = document.querySelector('#correct-answers');
    const totalQuestions = document.querySelector('#questions-qty');
    const displayScore = document.querySelector('#display-score span');

    //calcular score
    const result = (points / questions.length * 100).toFixed(2);

    //alterando perguntas corretas e total de perguntas
    totalPoints.textContent = points;
    totalQuestions.textContent = questions.length;

    //resultado - porcentagem
    displayScore.textContent = result;
}

function hideOrShowQuizz() {
    quizzContainer.classList.toggle('hide');
    scoreContainer.classList.toggle('hide');
};

//reinicar quizz
const restartBtn = document.querySelector('#restart');

restartBtn.addEventListener('click', function () {
    //zerar o jogo
    actualQuestion = 0;
    points = 0;
    hideOrShowQuizz();
    init();
})

//inicialização do quizz
init();

