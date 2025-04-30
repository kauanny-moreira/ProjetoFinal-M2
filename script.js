let nomeJogador = prompt("Qual é o seu nome?");

    // Se o jogador digitou um nome, mostra uma mensagem de boas-vindas
    if (nomeJogador) {
alert(`Bem-vindo(a), ${nomeJogador}!`);
    } else {
        alert("Bem-vindo(a)!");
        nomeJogador = "Jogador(a)"; // Define um nome padrão
    }
 
 
 class Quiz {
    constructor(perguntas) {
        this.perguntas = perguntas;
        this.perguntaAtual = 0;
        // this.pontos = 0;
        this.jogoAtivo = true;
        this.perguntaElemento = document.getElementById("pergunta");
        this.alternativasElemento = document.getElementById("alternativas");
        this.mensagemFeedback = document.getElementById("mensagem");
        this.botaoProximo = document.getElementById("botao-proximo");
        this.botaoReiniciar = document.getElementById("botao-reiniciar");
        this.faseFinalElemento = document.getElementById("fase-final");

        this.proximaPergunta = this.proximaPergunta.bind(this); 
        this.reiniciarQuiz = this.reiniciarQuiz.bind(this);

        this.botaoProximo.addEventListener("click", this.proximaPergunta);
        this.botaoReiniciar.addEventListener("click", this.reiniciarQuiz);
    }

    iniciarQuiz() {
        this.carregarPergunta();
        this.botaoReiniciar.style.display = "none";
        this.jogoAtivo = true;
    }

    carregarPergunta() {
        const perguntaElemento = this.perguntaElemento;
        const alternativasElemento = this.alternativasElemento;
        const perguntas = this.perguntas;
        const perguntaAtual = this.perguntaAtual;
        const mensagemFeedback = this.mensagemFeedback;
        const botaoProximo = this.botaoProximo;
        const faseFinalElemento = this.faseFinalElemento;

        perguntaElemento.innerHTML = perguntas[perguntaAtual].pergunta;
        alternativasElemento.innerHTML = "";
        perguntas[perguntaAtual].respostas.forEach((resposta, index) => {
            const botaoOpcao = document.createElement("button");
            botaoOpcao.className = "alternativa";
            botaoOpcao.id = `alternativa${index + 1}`;
            botaoOpcao.innerHTML = resposta.texto;
            botaoOpcao.addEventListener("click", () => this.selecionarResposta(index));
            alternativasElemento.appendChild(botaoOpcao);
        });
        mensagemFeedback.innerHTML = "";
        botaoProximo.style.display = "none";
        faseFinalElemento.innerHTML = "";
    }

    selecionarResposta(indiceSelecionado) {
        if (!this.jogoAtivo) return;

        const alternativasElemento = this.alternativasElemento;
        const perguntas = this.perguntas;
        const perguntaAtual = this.perguntaAtual;
        const mensagemFeedback = this.mensagemFeedback;
        const botaoProximo = this.botaoProximo;
        const botaoReiniciar = this.botaoReiniciar;


        const alternativas = alternativasElemento.querySelectorAll(".alternativa");
        alternativas.forEach((opcao, index) => {
            opcao.disabled = true;
            if (index === indiceSelecionado) {
                if (perguntas[perguntaAtual].respostas[index].correta) {
                    opcao.classList.add("correta");
                    mensagemFeedback.innerHTML = "Resposta Correta!";
                    this.pontos++;
                    if (perguntaAtual < perguntas.length - 1) {
                        botaoProximo.style.display = "block";
                    } else {
                        this.finalizarQuiz();
                    }
                } else {
                    opcao.classList.add("errada");
                    mensagemFeedback.innerHTML = "Resposta Incorreta! Fim de Jogo!";
                    this.jogoAtivo = false;
                    botaoReiniciar.style.display = "block";
                }
            } else {
                if (perguntas[perguntaAtual].respostas[index].correta) {
                    opcao.classList.add("correta");
                }
            }
        });
    }

    proximaPergunta() {
      this.perguntaAtual++;
      this.carregarPergunta();
    }

    finalizarQuiz() {
        const faseFinalElemento = this.faseFinalElemento;
        const mensagemFeedback = this.mensagemFeedback;
        const botaoReiniciar = this.botaoReiniciar;
        const perguntas = this.perguntas;
        const pontos = this.pontos;

        faseFinalElemento.innerHTML = `Sua pontuação final é ${pontos} de ${perguntas.length}.`;
        mensagemFeedback.innerHTML = pontos === perguntas.length
            ? "Parabéns, você acertou todas as perguntas!"
            : "Fim do Quiz!";
        botaoReiniciar.style.display = "block";
    }

    reiniciarQuiz() {
        this.perguntaAtual = 0;
        this.pontos = 0;
        this.jogoAtivo = true;
        this.iniciarQuiz();
    }
}

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

const quiz = new Quiz(perguntas);
quiz.iniciarQuiz();