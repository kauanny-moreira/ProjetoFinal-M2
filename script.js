const perguntas = [
    {
        pergunta: "Qual é a profissão do pai de Bella?",
        respostas: [
            { texto: "Médico", correta: false },
            { texto: "Professor", correta: false },
            { texto: "Policial", correta: true },
            { texto: "Bombeiro", correta: false }
        ]
    },
    {
        pergunta: "Qual é o nome do lobisomem que tem uma forte ligação com a filha de Bella e Edward?",
        respostas: [
            { texto: "Jacob Black", correta: true },
            { texto: "Sam Uley", correta: false },
            { texto: "Paul Lahote", correta: false },
            { texto: "Embry Call", correta: false }
        ]
    },
    {
        pergunta: "Qual o nome do primeiro filme da saga Crepúsculo?",
        respostas: [
            { texto: "Lua Nova", correta: false },
            { texto: "Crepúsculo", correta: true },
            { texto: "Eclipse", correta: false },
            { texto: "Amanhecer", correta: false }
        ]
    },
    {
        pergunta: "Qual o animal que Jacob se transforma?",
        respostas: [
            { texto: "Lobo", correta: true },
            { texto: "Urso", correta: false },
            { texto: "Leão", correta: false },
            { texto: "Tigre", correta: false }
        ]
    }
];

let perguntaAtual = 0;
let pontos = 0;

const perguntaElemento = document.getElementById("pergunta");
const opcoesElemento = document.getElementById("opcoes");
const mensagemFeedback = document.getElementById("mensagem-feedback");
const botaoProximo = document.getElementById("botao-proximo");
const botaoReiniciar = document.getElementById("botao-reiniciar");
const faseFinalElemento = document.getElementById("fase-final");

function iniciarQuiz() {
    carregarPergunta();
    botaoReiniciar.style.display = "none";
}

function carregarPergunta() {
    perguntaElemento.textContent = perguntas[perguntaAtual].pergunta;
    opcoesElemento.innerHTML = "";

    perguntas[perguntaAtual].respostas.forEach((resposta, index) => {
        const botaoOpcao = document.createElement("button");
        botaoOpcao.className = "opcao";
        botaoOpcao.id = `opcao${index + 1}`;
        botaoOpcao.textContent = resposta.texto;
        botaoOpcao.addEventListener("click", () => selecionarResposta(index));
        opcoesElemento.appendChild(botaoOpcao);
    });

    mensagemFeedback.textContent = "";
    botaoProximo.style.display = "none";
    faseFinalElemento.textContent = "";
}

function selecionarResposta(indiceSelecionado) {
    const opcoes = opcoesElemento.querySelectorAll(".opcao");
    opcoes.forEach((opcao, index) => {
        opcao.disabled = true;
        if (index === indiceSelecionado) {
            if (perguntas[perguntaAtual].respostas[index].correta) {
                opcao.classList.add("correta");
                mensagemFeedback.textContent = "Resposta Correta!";
                mensagemFeedback.style.backgroundColor = "#d4edda";
                mensagemFeedback.style.color = "#155724";
                pontos++;
            } else {
                opcao.classList.add("errada");
                mensagemFeedback.textContent = "Resposta Incorreta!";
                mensagemFeedback.style.backgroundColor = "#f8d7da";
                mensagemFeedback.style.color = "#721c24";
            }
        } else {
            if (perguntas[perguntaAtual].respostas[index].correta) {
                opcao.classList.add("correta");
            }
        }
    });

    if (perguntaAtual < perguntas.length - 1) {
        botaoProximo.style.display = "block";
    } else {
        finalizarQuiz();
    }
}

function proximaPergunta() {
    perguntaAtual++;
    carregarPergunta();
}

function finalizarQuiz() {
    faseFinalElemento.textContent = `Sua pontuação final é ${pontos} de ${perguntas.length}.`;
     mensagemFeedback.textContent = pontos === perguntas.length
        ? "Parabéns, você acertou todas as perguntas!"
        : "Fim do Quiz!";
    mensagemFeedback.style.backgroundColor = "#fff";
    mensagemFeedback.style.color = "#333";
    botaoReiniciar.style.display = "block";
}

function reiniciarQuiz() {
    perguntaAtual = 0;
    pontos = 0;
    iniciarQuiz();
}

botaoProximo.addEventListener("click", proximaPergunta);
botaoReiniciar.addEventListener("click", reiniciarQuiz);

iniciarQuiz();