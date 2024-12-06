document.addEventListener('DOMContentLoaded', function () {
    const produtos = JSON.parse(localStorage.getItem('cart')) || [];
    const listaProdutos = document.querySelector('.lista-produtos');
    const cartaoSection = document.getElementById('cartao-section');
    const mensagemSucesso = document.getElementById('mensagem-sucesso');
    const mensagemErroCarrinho = document.createElement('div'); // Elemento para a mensagem de erro do carrinho
    mensagemErroCarrinho.style.color = 'red'; // Estilo da mensagem
    mensagemErroCarrinho.style.marginTop = '10px';
    let totalCarrinho = 0;

    // Variáveis para Navegação de Etapas
    let etapaAtual = 0;
    const etapas = document.querySelectorAll('.etapa');
    const steps = document.querySelectorAll('.progress-bar .step');

    // Adiciona o elemento de mensagem de erro na etapa do carrinho
    const botaoContinuar = document.querySelector('#etapa-sacola .btn-proximo');
    botaoContinuar.insertAdjacentElement('afterend', mensagemErroCarrinho);

    // Exibe os Produtos no Carrinho
    produtos.forEach((produto, index) => {
        const itemProduto = document.createElement('li');
        itemProduto.textContent = `${produto.name} - ${produto.quantity}x R$ ${produto.price.toFixed(2)}`;
        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = 'Remover';
        botaoRemover.addEventListener('click', () => removerProduto(index, produto.price * produto.quantity));
        itemProduto.appendChild(botaoRemover);
        listaProdutos.appendChild(itemProduto);
        totalCarrinho += produto.price * produto.quantity;
    });

    document.getElementById('total-carrinho').textContent = totalCarrinho.toFixed(2);

    function removerProduto(index, subTotal) {
        if (confirm("Você tem certeza que deseja remover este item do carrinho?")) {
            produtos.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(produtos));
            totalCarrinho -= subTotal;
            document.getElementById('total-carrinho').textContent = totalCarrinho.toFixed(2);
            document.location.reload();
        }
    }

    function atualizarEtapa() {
        etapas.forEach((etapa, index) => {
            if (index === etapaAtual) {
                etapa.classList.add('ativa');
                etapa.classList.remove('escondida');
            } else {
                etapa.classList.remove('ativa');
                etapa.classList.add('escondida');
            }
        });

        steps.forEach((step, index) => {
            const icon = step.querySelector('.icon');
            if (index < etapaAtual) {
                step.classList.add('completed');
                step.classList.remove('active');
                icon.textContent = '✔';
            } else if (index === etapaAtual) {
                step.classList.add('active');
                step.classList.remove('completed');
                icon.textContent = index + 1;
            } else {
                step.classList.remove('active', 'completed');
                icon.textContent = index + 1;
            }
        });
    }

    atualizarEtapa();

    window.avancarEtapa = function () {
        // Impede que o usuário saia da etapa do carrinho sem produtos
        if (etapaAtual === 0 && produtos.length === 0) {
            mensagemErroCarrinho.textContent = "Seu carrinho está vazio! Adicione itens antes de continuar.";
            return;
        } else {
            mensagemErroCarrinho.textContent = ""; // Remove a mensagem de erro se o carrinho não estiver vazio
        }

        // Validação específica para a etapa de Identificação
        if (etapaAtual === 1) {
            const requiredFields = document.querySelectorAll('#etapa-identificacao input[required]');
            let allFieldsValid = true;

            requiredFields.forEach(field => {
                const errorElement = field.nextElementSibling;
                if (!field.checkValidity()) {
                    errorElement.textContent = `Por favor, preencha o campo ${field.previousElementSibling.textContent}`;
                    errorElement.style.display = 'block';
                    field.classList.add('input-error');
                    allFieldsValid = false;
                } else {
                    errorElement.textContent = '';
                    errorElement.style.display = 'none';
                    field.classList.remove('input-error');
                }
            });

            if (!allFieldsValid) {
                return;
            }
        }

        if (etapaAtual < etapas.length - 1) {
            etapaAtual++;
            atualizarEtapa();
        }
    };

    window.voltarEtapa = function () {
        if (etapaAtual > 0) {
            etapaAtual--;
            atualizarEtapa();
        }
    };

    document.querySelectorAll('input[name="payment-method"]').forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.value === 'credit-card') {
                cartaoSection.style.display = 'block';
                document.querySelectorAll('#cartao-section input').forEach(input => input.setAttribute('required', 'required'));
            } else {
                cartaoSection.style.display = 'none';
                document.querySelectorAll('#cartao-section input').forEach(input => input.removeAttribute('required'));
            }
        });
    });

    document.querySelector('.btn-finalizar').addEventListener('click', function () {
        const paymentMethod = document.querySelector('input[name="payment-method"]:checked')?.value;

        if (totalCarrinho === 0) {
            alert('Não é possível finalizar uma compra com valor total de R$ 0.00.');
            return;
        }

        const requiredFields = document.querySelectorAll('.endereco input[required]');
        let allFieldsValid = true;

        requiredFields.forEach(field => {
            const errorElement = field.nextElementSibling;
            if (!field.checkValidity()) {
                errorElement.textContent = `Por favor, preencha o campo ${field.previousElementSibling.textContent}`;
                errorElement.style.display = 'block';
                field.classList.add('input-error');
                allFieldsValid = false;
            } else {
                errorElement.textContent = '';
                errorElement.style.display = 'none';
                field.classList.remove('input-error');
            }
        });

        if (!allFieldsValid) {
            return;
        }

        if (paymentMethod === 'credit-card') {
            const nomeCartao = document.getElementById('nome-cartao').value;
            const numeroCartao = document.getElementById('numero-cartao').value;
            const validadeCartao = document.getElementById('validade-cartao').value;
            const cvvCartao = document.getElementById('cvv-cartao').value;

            if (!nomeCartao || !numeroCartao || !validadeCartao || !cvvCartao) {
                alert('Por favor, preencha todos os campos do cartão.');
                return;
            }
        }

        mensagemSucesso.innerHTML = `
            <p>Compra finalizada com sucesso!</p>
            <p>Total: R$ ${totalCarrinho.toFixed(2)}</p>
            <p>Forma de Pagamento: ${paymentMethod}</p>
        `;
        mensagemSucesso.style.display = 'block';

        localStorage.clear();
        listaProdutos.innerHTML = '';
        document.getElementById('total-carrinho').textContent = '0.00';

        etapaAtual = etapas.length - 1;
        atualizarEtapa();
    });
});
