const carrinho = [
    {
        id: 1,
        nome: 'Camiseta Floral',
        descricao: 'Camiseta com estampa floral para o verão',
        preco: 29.90,
        foto: '../assets/camiseta1.jpg',
        quantidade: 2
    },
    {
        id: 2,
        nome: 'Saia Jeans',
        descricao: 'Saia jeans de corte reto e confortável',
        preco: 79.90,
        foto: '../assets/saia1.jpg',
        quantidade: 1
    }
];

function calcularTotal(item) {
    return item.preco * item.quantidade;
}

function preencherCarrinho() {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ''; 

    carrinho.forEach(item => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.nome}</td>
            <td>${item.descricao}</td>
            <td>R$ ${item.preco.toFixed(2)}</td>
            <td><img src="${item.foto}" alt="${item.nome}" width="50"></td>
            <td>${item.quantidade}</td>
            <td>R$ ${calcularTotal(item).toFixed(2)}</td>
        `;

        tbody.appendChild(tr);
    });
}

window.onload = preencherCarrinho;
