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
let jogoAtivo = true; // Variável para controlar se o jogo está ativo
const perguntaElemento = document.getElementById("pergunta");
const alternativasElemento = document.getElementById("alternativas");
const mensagemFeedback = document.getElementById("mensagem");
const botaoProximo = document.getElementById("botao-proximo");
const botaoReiniciar = document.getElementById("botao-reiniciar");
const faseFinalElemento = document.getElementById("fase-final");
function iniciarQuiz() {
    carregarPergunta();
    botaoReiniciar.style.display = "none";
    jogoAtivo = true; // Garante que o jogo está ativo ao iniciar
}
function carregarPergunta() {
    perguntaElemento.innerHTML = perguntas[perguntaAtual].pergunta;
    alternativasElemento.innerHTML = "";
    perguntas[perguntaAtual].respostas.forEach((resposta, index) => {
        const botaoOpcao = document.createElement("button");
        botaoOpcao.className = "alternativa";
        botaoOpcao.id = `alternativa${index + 1}`;
        botaoOpcao.innerHTML = resposta.texto;
        botaoOpcao.addEventListener("click", () => selecionarResposta(index));
        alternativasElemento.appendChild(botaoOpcao);
    });
    mensagemFeedback.innerHTML = "";
    botaoProximo.style.display = "none";
    faseFinalElemento.innerHTML = "";
}
function selecionarResposta(indiceSelecionado) {
    if (!jogoAtivo) return; // Impede seleção se o jogo não estiver ativo
    const alternativas = alternativasElemento.querySelectorAll(".alternativa");
    alternativas.forEach((opcao, index) => {
        opcao.disabled = true;
        if (index === indiceSelecionado) {
            if (perguntas[perguntaAtual].respostas[index].correta) {
                opcao.classList.add("correta");
                mensagemFeedback.innerHTML = "Resposta Correta!";
                pontos++;
                if (perguntaAtual < perguntas.length - 1) {
                    botaoProximo.style.display = "block";
                } else {
                    finalizarQuiz();
                }
            } else {
                opcao.classList.add("errada");
                mensagemFeedback.innerHTML = "Resposta Incorreta! Fim de Jogo!";
                jogoAtivo = false; // Encerra o jogo
                botaoReiniciar.style.display = "block"; // Mostra o botão de reiniciar
            }
        } else {
            if (perguntas[perguntaAtual].respostas[index].correta) {
                opcao.classList.add("correta");
            }
        }
    });
}
function proximaPergunta() {
    perguntaAtual++;
    carregarPergunta();
}
function finalizarQuiz() {
    faseFinalElemento.innerHTML = `Sua pontuação final é ${pontos} de ${perguntas.length}.`;
    mensagem.innerHTML = pontos === perguntas.length
        ? "Parabéns, você acertou todas as perguntas!"
        : "Fim do Quiz!";
    botaoReiniciar.style.display = "block";
}
function reiniciarQuiz() {
    perguntaAtual = 0;
    pontos = 0;
    jogoAtivo = true; // Reinicia o estado do jogo
    iniciarQuiz();
}
botaoProximo.addEventListener("click", proximaPergunta);
botaoReiniciar.addEventListener("click", reiniciarQuiz);
iniciarQuiz();