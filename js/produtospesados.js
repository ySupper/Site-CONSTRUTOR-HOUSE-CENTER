document.addEventListener('DOMContentLoaded', function() {
    const products = [
        { id: 1, name: "Cimento Votoram", price: 29.90, description: "Cimento de alta qualidade para obras estruturais.", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 2, name: "Cimento Cauê", price: 31.50, description: "Cimento Cauê, ideal para estruturas e acabamentos.", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 3, name: "Areia Média", price: 75.00, description: "Areia média para concreto e argamassas (m³).", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 4, name: "Areia Fina", price: 70.00, description: "Areia fina para acabamentos e rebocos (m³).", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 5, name: "Areia Grossa", price: 80.00, description: "Areia grossa para concreto de alta resistência (m³).", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 6, name: "Pó de Pedra", price: 60.00, description: "Material ideal para base e sub-base de pavimentos (m³).", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 7, name: "Pedra Nº1", price: 95.00, description: "Pedra britada para concreto estrutural (m³).", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 8, name: "Pedrisco", price: 90.00, description: "Pedrisco para acabamentos em concreto (m³).", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 9, name: "Bloco de Concreto 13x19x30", price: 3.50, description: "Bloco de concreto para alvenaria estrutural (unidade).", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 10, name: "Tijolo Baiano", price: 0.80, description: "Tijolo cerâmico leve e econômico para construções (unidade).", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 11, name: "Tijolo de Barro", price: 1.20, description: "Tijolo de barro maciço para acabamentos rústicos (unidade).", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 12, name: "Tijolo Refratário", price: 8.00, description: "Tijolo resistente a altas temperaturas, ideal para fornos (unidade).", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 13, name: "Tábua de 30", price: 65.00, description: "Tábua de madeira para formas e escoramentos (unidade).", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 14, name: "Cal Virgem", price: 15.00, description: "Material utilizado para argamassas e correção de solos (25kg).", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 15, name: "Vergalhão 3/8", price: 32.00, description: "Vergalhão de aço para reforço estrutural (barra 12m).", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 16, name: "Caibro 5x5", price: 12.00, description: "Caibro para telhados (unidade - 3m).", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 17, name: "Ripa de Madeira", price: 3.00, description: "Ripa de madeira para cobertura e estruturas (unidade - 3m).", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 18, name: "Telha de Fibrocimento", price: 45.00, description: "Telha leve e resistente para cobertura (unidade - 2,44m x 0,50m).", imagens: ["../img/ph.png", "../img/ph.png"] }
        
    ];

    function displayProducts(products) {
        const itemsContainer = document.getElementById('itemsContainer');
        if (!itemsContainer) return;

        itemsContainer.innerHTML = '';
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'item';
            productDiv.innerHTML = `
                <img src="${product.imagens[0]}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p>Preço: R$ ${product.price.toFixed(2)}</p>
                <input type="number" min="1" value="1" id="qty-${product.id}" class="quantity">
                <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Adicionar ao Carrinho</button>
                <button onclick="window.location.href='detalhes_produtopesados.html?id=${product.id}'">Ver Detalhes</button>
            `;
            itemsContainer.appendChild(productDiv);
        });

        // Adiciona os eventos de clique nos botões de adicionar ao carrinho
        const buttons = document.querySelectorAll('.add-to-cart');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                const name = this.getAttribute('data-name');
                const price = parseFloat(this.getAttribute('data-price'));
                const quantity = parseInt(document.getElementById(`qty-${id}`).value, 10);

                const product = {
                    id: id,
                    name: name,
                    price: price,
                    quantity: quantity
                };

                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                const found = cart.find(p => p.id === id);
                if (found) {
                    found.quantity += quantity;
                } else {
                    cart.push(product);
                }

                localStorage.setItem('cart', JSON.stringify(cart));
                showNotification(`Adicionado ${quantity} do ${name} ao carrinho!`);
            });
        });
    }

    function showNotification(message) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    displayProducts(products);

    function filterItems() {
        const searchText = document.getElementById('searchBox').value.toLowerCase();
        const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchText));
        displayProducts(filteredProducts);
    }

    // Função para obter parâmetros da URL
    function getQueryParams() {
        const params = {};
        window.location.search.substring(1).split("&").forEach(pair => {
            const [key, value] = pair.split("=");
            params[key] = decodeURIComponent(value);
        });
        return params;
    }

    // Carregar detalhes do produto na página de detalhes
    if (document.querySelector('.produto')) {
        const queryParams = getQueryParams();
        const produtoId = parseInt(queryParams.id, 10);
        const produto = products.find(p => p.id === produtoId);

        if (produto) {
            document.getElementById('produto-nome').textContent = produto.name;
            document.getElementById('produto-preco').textContent = `R$ ${produto.price.toFixed(2)}`;
            document.getElementById('produto-descricao').textContent = produto.description;
            document.getElementById('imagem-principal').src = produto.imagens[0];

            const miniaturas = document.querySelector('.miniaturas');
            produto.imagens.forEach(imagem => {
                const img = document.createElement('img');
                img.src = imagem;
                img.alt = "Miniatura";
                img.onclick = () => trocarImagem(imagem);
                miniaturas.appendChild(img);
            });

            // Função para trocar a imagem principal
            window.trocarImagem = function(imagem) {
                document.getElementById('imagem-principal').src = imagem;
            };

            // Função para adicionar ao carrinho
            window.adicionarAoCarrinho = function() {
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                const itemIndex = cart.findIndex(item => item.id === produto.id);
                if (itemIndex > -1) {
                    cart[itemIndex].quantity += 1;
                } else {
                    cart.push({ ...produto, quantity: 1 });
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                showNotification('Produto adicionado ao carrinho!');
            };

            // Função para submeter uma avaliação
            window.submitReview = function(event) {
                event.preventDefault();
                const nome = document.getElementById('avaliacao-nome').value;
                const comentario = document.getElementById('avaliacao-comentario').value;
                const listaAvaliacoes = document.getElementById('lista-avaliacoes');

                const avaliacao = document.createElement('li');
                avaliacao.textContent = `${nome}: ${comentario}`;
                listaAvaliacoes.appendChild(avaliacao);

                document.getElementById('form-avaliacao').reset();
            };
        } else {
            alert("Produto não encontrado");
            window.location.href = 'inicial.html';
        }
    }

    // Expondo funções globais
    window.filterItems = filterItems;
    window.submitReview = submitReview;
});

// Função para iniciar a filtragem dos produtos quando o formulário de pesquisa é submetido
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário
    filterProducts();
});

function filterProducts() {
    // Obter o termo de pesquisa
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    
    // Selecionar todos os produtos (assumindo que os produtos estão em elementos com a classe 'item')
    const products = document.querySelectorAll('.item');
    
    products.forEach(product => {
        // Obter o nome e a descrição do produto
        const productName = product.querySelector('h2').textContent.toLowerCase();
        const productDescription = product.querySelector('p').textContent.toLowerCase();
        
        // Verificar se o termo de pesquisa está no nome ou na descrição
        if (productName.includes(searchTerm) || productDescription.includes(searchTerm)) {
            // Mostrar o produto se corresponder ao termo de pesquisa
            product.style.display = 'block';
        } else {
            // Ocultar o produto se não corresponder ao termo de pesquisa
            product.style.display = 'none';
        }
    });
}