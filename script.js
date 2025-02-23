let cronometroGeradorInterval;
let cronometroVerificadorInterval;

// Função para alternar entre modo escuro e claro
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById("theme-icon");
    body.classList.toggle("light-mode");
    if (body.classList.contains("light-mode")) {
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
    } else {
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
    }
}

// Função para iniciar o cronômetro
function iniciarCronometro(elemento) {
    let segundos = 0;
    elemento.textContent = `Tempo decorrido: ${segundos}s`;
    return setInterval(() => {
        segundos++;
        elemento.textContent = `Tempo decorrido: ${segundos}s`;
    }, 1000);
}

// Função para parar o cronômetro
function pararCronometro(intervalId, elemento) {
    clearInterval(intervalId);
    elemento.textContent = "Concluído!";
}

// Função para gerar um token aleatório
function gerarToken(prefixo) {
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numeros = "0123456789";
    const todosCaracteres = letras + numeros;
    const parte1 = prefixo + letras[Math.floor(Math.random() * letras.length)];
    const parte2 = Array.from({ length: 21 }, () => todosCaracteres[Math.floor(Math.random() * todosCaracteres.length)]).join("");
    const parte3 = letras[Math.floor(Math.random() * letras.length)].toUpperCase();
    const parte4 = Array.from({ length: 5 }, () => todosCaracteres[Math.floor(Math.random() * todosCaracteres.length)]).join("");
    const parte5 = Array.from({ length: 27 }, () => todosCaracteres[Math.floor(Math.random() * todosCaracteres.length)]).join("");
    return `${parte1}${parte2}.${parte3}${parte4}.${parte5}`;
}

// Função para gerar múltiplos tokens
function iniciarGeracaoTokens() {
    const cronometroElemento = document.getElementById("cronometroGerador");
    cronometroGeradorInterval = iniciarCronometro(cronometroElemento);

    const quantidade = document.getElementById("quantidade").value;
    const prefixo = document.getElementById("prefixoSelecionado").value;
    const tokens = [];
    for (let i = 0; i < quantidade; i++) {
        tokens.push(gerarToken(prefixo));
    }
    setTimeout(() => {
        document.getElementById("tokensGerados").textContent = tokens.join("\n");
        pararCronometro(cronometroGeradorInterval, cronometroElemento);
    }, 1000); // Simula um pequeno delay para visualização do cronômetro
}

// Função para verificar tokens (simulação com API pública)
async function iniciarVerificacaoTokens() {
    const cronometroElemento = document.getElementById("cronometroVerificador");
    cronometroVerificadorInterval = iniciarCronometro(cronometroElemento);

    const tokens = document.getElementById("tokensGerados").textContent.split("\n");
    const resultados = [];
    for (const token of tokens) {
        if (!token) continue;
        try {
            const inicio = Date.now();
            const resposta = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
                headers: {
                    "Authorization": token,
                },
            });
            const tempoDecorrido = ((Date.now() - inicio) / 1000).toFixed(2);
            if (resposta.ok) {
                resultados.push(`✅ Token válido (${tempoDecorrido}s): ${token}`);
            } else {
                resultados.push(`❌ Token inválido (${tempoDecorrido}s): ${token}`);
            }
        } catch (erro) {
            resultados.push(`⚠️ Erro ao verificar token: ${token}`);
        }
    }
    setTimeout(() => {
        document.getElementById("resultadoVerificacao").textContent = resultados.join("\n");
        pararCronometro(cronometroVerificadorInterval, cronometroElemento);
    }, 1000); // Simula um pequeno delay para visualização do cronômetro
}

// Função para exportar tokens
function exportarTokens(idElemento) {
    const texto = document.getElementById(idElemento).textContent;
    if (!texto) {
        alert("Nenhum token para exportar!");
        return;
    }
    const blob = new Blob([texto], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tokens.txt";
    a.click();
    URL.revokeObjectURL(url);
}

// Funções para alternar entre seções
function mostrarGerador() {
    toggleSecao("gerador");
}
function mostrarVerificador() {
    toggleSecao("verificador");
}
function mostrarCreditos() {
    toggleSecao("creditos");
}

function toggleSecao(secaoId) {
    document.querySelectorAll(".secao").forEach(secao => {
        secao.classList.remove("active");
        secao.style.display = "none";
    });
    document.getElementById(secaoId).classList.add("active");
    document.getElementById(secaoId).style.display = "block";

    // Atualizar botões da sidebar
    document.querySelectorAll(".sidebar button").forEach(button => button.classList.remove("active"));
    const botaoAtivo = document.querySelector(`.sidebar button[onclick*='${secaoId}']`);
    if (botaoAtivo) botaoAtivo.classList.add("active");
}
