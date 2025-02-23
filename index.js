<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HB GEN - Token Generator</title>
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <!-- Animate.css -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
    <style>
        /* Estilos Gerais */
        body {
            font-family: Arial, sans-serif;
            background-color: #1e1e1e;
            color: #ffffff;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            overflow-x: hidden;
        }
        .container {
            background-color: #2d2d2d;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            width: 90%;
            max-width: 600px;
            text-align: center;
            animation: fadeIn 1s ease-in-out;
        }
        h1 {
            color: #4caf50;
            font-size: 2rem;
            margin-bottom: 20px;
        }
        .menu button {
            background-color: #4caf50;
            color: white;
            border: none;
            padding: 10px 20px;
            margin: 5px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        .menu button:hover {
            background-color: #45a049;
        }
        .secao {
            margin-top: 20px;
            display: none;
        }
        .secao.active {
            display: block;
            animation: slideIn 0.5s ease-in-out;
        }
        label {
            display: block;
            margin: 10px 0 5px;
        }
        input {
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #ccc;
            width: 100%;
            max-width: 200px;
            margin-bottom: 10px;
        }
        pre {
            background-color: #1e1e1e;
            padding: 10px;
            border-radius: 5px;
            overflow-x: auto;
            text-align: left;
            font-size: 0.9rem;
        }
        /* Responsividade */
        @media (max-width: 600px) {
            h1 {
                font-size: 1.5rem;
            }
            .menu button {
                padding: 8px 15px;
                font-size: 0.9rem;
            }
        }
        /* Animações */
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        @keyframes slideIn {
            from {
                transform: translateY(-20px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
    </style>
</head>
<body>
    <div class="container animate__animated animate__fadeIn">
        <h1><i class="fas fa-key"></i> HB GEN - Token Generator</h1>
        <div class="menu">
            <button onclick="mostrarGerador()"><i class="fas fa-plus"></i> Gerar Tokens</button>
            <button onclick="mostrarVerificador()"><i class="fas fa-check"></i> Verificar Tokens</button>
            <button onclick="mostrarCreditos()"><i class="fas fa-info-circle"></i> Créditos</button>
        </div>
        <div id="gerador" class="secao active">
            <h2><i class="fas fa-cogs"></i> Gerador de Tokens</h2>
            <label for="quantidade">Quantidade:</label>
            <input type="number" id="quantidade" min="1" value="10">
            <button onclick="gerarTokens()"><i class="fas fa-magic"></i> Gerar</button>
            <pre id="tokensGerados"></pre>
        </div>
        <div id="verificador" class="secao">
            <h2><i class="fas fa-search"></i> Verificador de Tokens</h2>
            <button onclick="verificarTokens()"><i class="fas fa-check-double"></i> Verificar</button>
            <pre id="resultadoVerificacao"></pre>
        </div>
        <div id="creditos" class="secao">
            <h2><i class="fas fa-users"></i> Créditos</h2>
            <p>Projeto criado por <strong>HIRDAY AND TANMAY</strong>.</p>
            <p>Modificado por <strong>Você</strong> para fins educacionais.</p>
        </div>
    </div>
    <script>
        // Função para gerar um token aleatório
        function gerarToken() {
            const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            const numeros = "0123456789";
            const todosCaracteres = letras + numeros;
            const parte1 = "NT" + letras[Math.floor(Math.random() * letras.length)];
            const parte2 = Array.from({ length: 21 }, () => todosCaracteres[Math.floor(Math.random() * todosCaracteres.length)]).join("");
            const parte3 = letras[Math.floor(Math.random() * letras.length)].toUpperCase();
            const parte4 = Array.from({ length: 5 }, () => todosCaracteres[Math.floor(Math.random() * todosCaracteres.length)]).join("");
            const parte5 = Array.from({ length: 27 }, () => todosCaracteres[Math.floor(Math.random() * todosCaracteres.length)]).join("");
            return `${parte1}${parte2}.${parte3}${parte4}.${parte5}`;
        }

        // Função para gerar múltiplos tokens
        function gerarTokens() {
            const quantidade = document.getElementById("quantidade").value;
            const tokens = [];
            for (let i = 0; i < quantidade; i++) {
                tokens.push(gerarToken());
            }
            document.getElementById("tokensGerados").textContent = tokens.join("\n");
        }

        // Função para verificar tokens (simulação com API pública)
        async function verificarTokens() {
            const tokens = document.getElementById("tokensGerados").textContent.split("\n");
            const resultados = [];
            for (const token of tokens) {
                if (!token) continue;
                try {
                    const resposta = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
                        headers: {
                            "Authorization": token,
                        },
                    });
                    if (resposta.ok) {
                        resultados.push(`✅ Token válido: ${token}`);
                    } else {
                        resultados.push(`❌ Token inválido: ${token}`);
                    }
                } catch (erro) {
                    resultados.push(`⚠️ Erro ao verificar token: ${token}`);
                }
            }
            document.getElementById("resultadoVerificacao").textContent = resultados.join("\n");
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
        }
    </script>
</body>
</html>
