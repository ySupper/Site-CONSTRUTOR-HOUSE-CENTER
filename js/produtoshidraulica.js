document.addEventListener('DOMContentLoaded', function() {
    const products = [
        { id: 1, name: "Tubo Tigre", price: 25.00, description: "Tubo de PVC da marca Tigre, ideal para instalações hidráulicas.", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 2, name: "Cotovelo Marrom 3/4 90°", price: 5.00, description: "Cotovelo PVC marrom para desvio de tubulações em 90 graus.", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 3, name: "Cotovelo Esgoto 100mm 45°", price: 15.00, description: "Cotovelo de esgoto para desvio em 45 graus.", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 4, name: "Tê de PVC", price: 7.00, description: "Conector em T para ramificação de tubulações.", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 5, name: "Curva longa de PVC 3/4", price: 8.00, description: "Joelho de PVC para mudanças de direção em sistemas hidráulicos.", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 6, name: "Válvula de Retenção", price: 50.00, description: "Válvula de retenção para impedir o retorno de água.", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 7, name: "Registro de Esfera 3/4", price: 35.00, description: "Registro de esfera para controle de fluxo de água.", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 8, name: "Sifão Flexível", price: 20.00, description: "Sifão flexível para conexão de pias e lavatórios.", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 9, name: "Cola PVC 175g", price: 12.00, description: "Cola para soldagem de tubos e conexões de PVC.", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 10, name: "Flange de PVC 1.1/2", price: 18.00, description: "Flange para conexão em sistemas hidráulicos de PVC.", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 11, name: "Adaptador de Rosca 3/4", price: 7.50, description: "Adaptador para conexões de rosca em PVC.", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 12, name: "Redução de PVC 3/4 p/ 1.1/2", price: 5.00, description: "Peça para redução de diâmetros em tubulações.", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 13, name: "União de PVC", price: 10.00, description: "União para conectar tubos de PVC de forma desmontável.", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 14, name: "Vedante para Rosca", price: 2.50, description: "Vedante para garantir a estanqueidade em roscas hidráulicas.", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 15, name: "Abraçadeira de Metal", price: 3.50, description: "Abraçadeira metálica para fixação de tubulações.", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 16, name: "Filtro para Torneira", price: 25.00, description: "Filtro para retenção de impurezas na saída de água.", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 17, name: "Engate Flexível", price: 20.00, description: "Engate flexível para conexão de torneiras.", imagens: ["../img/ph.png", "../img/ph.png"] },
        { id: 18, name: "Mangueira para Jardim", price: 35.00, description: "Mangueira flexível para uso em jardinagem e limpeza.", imagens: ["../img/ph.png", "../img/ph.png"] }
        
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
                <button onclick="window.location.href='detalhes_produtohidraulica.html?id=${product.id}'">Ver Detalhes</button>
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