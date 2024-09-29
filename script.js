const productForm = document.getElementById('product-form');
const productList = document.getElementById('list');
const totalValue = document.getElementById('total-value');
const finalizarButton = document.getElementById('finalizar');

let total = 0;

productForm.addEventListener('submit', handleFormSubmit);
productList.addEventListener('click', handleDelete);
finalizarButton.addEventListener('click', handleFinalize);

function handleFormSubmit(event) {
    event.preventDefault();

    const { preco, quantidade, descricao } = getFormValues();

    if (isValidInput(preco, quantidade)) {
        const subtotal = preco * quantidade;
        total += subtotal;

        addProductToList(preco, quantidade, descricao, subtotal);
        updateTotalDisplay();

        productForm.reset();
    } else {
        alert("Por favor, insira valores válidos para preço e quantidade.");
    }
}

function getFormValues() {
    return {
        preco: parseFloat(document.getElementById('preco').value),
        quantidade: parseInt(document.getElementById('quantidade').value),
        descricao: document.getElementById('descricao').value
    };
}

function isValidInput(preco, quantidade) {
    return preco > 0 && quantidade > 0;
}

function addProductToList(preco, quantidade, descricao, subtotal) {
    const li = document.createElement('li');
    
    li.innerHTML = `
        <div class="product-info">
            <span>Valor Unit.: R$${preco.toFixed(2)}</span>
            <span>Quantidade: ${quantidade}</span>
            <span>Descrição: ${descricao}</span>
            <span>Subtotal: R$${subtotal.toFixed(2)}</span>
        </div>
        <button class="delete-btn" title="Remover produto">
            <i class="fas fa-trash-alt"></i>
        </button>
    `;
    
    productList.appendChild(li);
}

function updateTotalDisplay() {
    totalValue.textContent = `Valor total: R$${total.toFixed(2)}`;
}

function handleDelete(event) {
    if (event.target.classList.contains('delete-btn')) {
        if (confirm("Você tem certeza que deseja remover este produto?")) {
            const li = event.target.closest('li'); // Seleciona o item da lista correspondente
            const subtotal = parseFloat(li.querySelector('span:last-child').textContent.split('R$')[1]); // Captura o subtotal do item
            total -= subtotal; // Atualiza o total
            updateTotalDisplay(); // Atualiza o valor total
            li.remove(); // Remove o item da lista
        }
    }
}

function handleFinalize() {
    if (total > 0) {
        alert(`Valor total: R$${total.toFixed(2)}`);
        resetSystem();
    } else {
        alert("Não há produtos registrados.");
    }
}

function resetSystem() {
    total = 0;
    productList.innerHTML = '';
    totalValue.textContent = 'Valor total: R$0.00';
}
