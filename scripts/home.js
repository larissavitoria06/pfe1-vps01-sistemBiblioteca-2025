const main = document.querySelector('main');
let produtos = [];
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

fetch('../assets/dados.json')
    .then(response => response.json())
    .then(data => {
        produtos = data;
        exibirCards();
    });

function exibirCards() {
    produtos.forEach((produto, indice) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h2>${produto.nome}</h2>
            <p>R$ ${produto.preco.toFixed(2)}</p>
            <button id="detalhes-btn-${indice}">Detalhes</button>
        `;
        main.appendChild(card);
        document.getElementById(`detalhes-btn-${indice}`).addEventListener('click', () => mostrarDetalhes(indice));
    });
}

function mostrarDetalhes(indice) {
    const detalhes = document.getElementById('detalhes');
    const produto = produtos[indice];

    detalhes.classList.remove('oculto');
    detalhes.querySelector('h2').innerText = produto.nome;
    detalhes.querySelector('img').src = produto.imagem;
    detalhes.querySelector('.descricao p').innerText = produto.descricao;
    detalhes.querySelector('.preco p').innerText = `R$ ${produto.preco.toFixed(2)}`;

    const valorFrete = produto.frete * produto.peso * produto.preco;
    detalhes.querySelector('.frete p').innerText = `R$ ${valorFrete.toFixed(2)}`;

    const valorTotal = produto.preco + valorFrete;
    detalhes.querySelector('.total p').innerText = `R$ ${valorTotal.toFixed(2)}`;

    const botao = detalhes.querySelector('.rodape button');
    botao.onclick = () => adicionarCarrinho(indice);
}

function adicionarCarrinho(indice) {
    const produto = produtos[indice];
    const frete = produto.frete * produto.peso * produto.preco;

    const produtoExistente = carrinho.find(item => item.id === produto.id);
    if (produtoExistente) {
        produtoExistente.quantidade += 1;
        produtoExistente.total = produtoExistente.quantidade * (produto.preco + frete);
    } else {
        produto.quantidade = 1; 
        produto.total = produto.preco + frete; 
        carrinho.push(produto);
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    window.location.href = 'carrinho.html';
}