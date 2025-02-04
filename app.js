let listaDeAmigos = [];

function adicionarAmigo() {
    const nomeAmigo = document.getElementById("amigo");
    const nome = nomeAmigo.value.trim();

    if (!nome) {
        alert("Insira um nome válido");
        return;
    }

    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/; // Apenas letras e espaços
    if (!regex.test(nome)) {
        alert("O nome deve conter apenas letras e espaços!");
        return;
    }

    if (listaDeAmigos.includes(nome)) {
        alert("Esse nome já foi adicionado!");
        return;
    }

    listaDeAmigos.push(nome);
    nomeAmigo.value = "";
    exibirAmigos();
}

function exibirAmigos() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";

    listaDeAmigos.forEach((amigo, index) => {
        const li = document.createElement("li");
        li.textContent = amigo;

        // Botão para remover o amigo
        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "❌";
        botaoRemover.classList.add("remove-button");
        botaoRemover.onclick = () => removerAmigo(index);

        li.appendChild(botaoRemover);
        lista.appendChild(li);
    });
}

function removerAmigo(index) {
    listaDeAmigos.splice(index, 1);
    exibirAmigos();
}

function sortearAmigo() {
    if (listaDeAmigos.length < 2) {
        alert("O sorteio precisa de pelo menos duas pessoas!");
        return;
    }

    let sorteio = {};
    let nomesDisponiveis = [...listaDeAmigos];

    listaDeAmigos.forEach((amigo) => {
        let possiveisSorteados = nomesDisponiveis.filter(nome => nome !== amigo);

        if (possiveisSorteados.length === 0) {
            alert("Erro ao sortear! Tente adicionar mais amigos.");
            return;
        }

        let indiceAleatorio = Math.floor(Math.random() * possiveisSorteados.length);
        sorteio[amigo] = possiveisSorteados[indiceAleatorio];

        nomesDisponiveis.splice(nomesDisponiveis.indexOf(possiveisSorteados[indiceAleatorio]), 1);
    });

    exibirResultado(sorteio);
}

function exibirResultado(sorteio) {
    const listaResultado = document.getElementById("resultado");
    listaResultado.innerHTML = "<h2>Resultado do Sorteio</h2>";

    for (let amigo in sorteio) {
        const li = document.createElement("li");
        li.textContent = `${amigo} → ${sorteio[amigo]}`; // Correção aqui (uso de crase)
        listaResultado.appendChild(li);
    }
}
