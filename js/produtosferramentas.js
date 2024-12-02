document.addEventListener('DOMContentLoaded', function() {
    const products = [
        { id: 1, name: "Martelo de Unha", price: 15.00, description: "Martelo de unha para trabalhos gerais em madeira.", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 2, name: "Chave de Fenda", price: 10.00, description: "Chave de fenda para parafusos de fenda.", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 3, name: "Alicate Universal", price: 25.00, description: "Alicate universal para cortes e ajustes.", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 4, name: "Serrote de Madeira", price: 35.00, description: "Serrote para cortes em madeira com precisão.", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 5, name: "Trena Rayco 5m", price: 20.00, description: "Trena de 5 metros para medições precisas.", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 6, name: "Chave Phillips", price: 12.00, description: "Chave Phillips para parafusos cruciformes.", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 7, name: "Furadeira Elétrica", price: 200.00, description: "Furadeira elétrica para perfurações em diversas superfícies.", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 8, name: "Nível de Bolha", price: 18.00, description: "Nível de bolha para alinhamento de superfícies.", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 9, name: "Chave Inglesa", price: 30.00, description: "Chave inglesa ajustável para apertar ou soltar porcas.", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 10, name: "Serra Tico-Tico", price: 250.00, description: "Serra tico-tico para cortes detalhados e curvos.", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 11, name: "Alicate de Pressão", price: 35.00, description: "Alicate de pressão para fixação e ajustes precisos.", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 12, name: "Esquadro de Aço", price: 25.00, description: "Esquadro de aço para medições exatas.", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 13, name: "Ponteiro de Aço", price: 8.00, description: "Ponteiro de aço para marcações em superfícies.", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 14, name: "Torno de Bancada", price: 120.00, description: "Torno de bancada para segurar peças com firmeza.", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 15, name: "Cortador de Azulejos", price: 150.00, description: "Cortador manual para azulejos e pisos cerâmicos.", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 16, name: "Espátula de Aço", price: 10.00, description: "Espátula de aço para aplicação de massa corrida.", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 17, name: "Jogo de Soquetes", price: 80.00, description: "Jogo de soquetes para apertar parafusos e porcas.", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 18, name: "Lima Rotativa", price: 12.00, description: "Lima rotativa para acabamento em metais.", imagens: ["../img/ph.png", "../img/ph.png"] }
        
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
                <button onclick="window.location.href='detalhes_produtoferramentas.html?id=${product.id}'">Ver Detalhes</button>
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