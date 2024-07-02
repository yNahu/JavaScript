let cart = [];
let currentProducts = products;
let productIdCounter = products.length + 1;

document.addEventListener('DOMContentLoaded', () => {
    loadProducts(products);
    document.getElementById('cart').addEventListener('click', showCart);
    document.querySelector('.close').addEventListener('click', closeModal);
    document.getElementById('pay-button').addEventListener('click', processPayment);
    document.getElementById('search-bar').addEventListener('input', handleSearch);

    const filterButtons = document.querySelectorAll('#filters button');
    filterButtons.forEach(button => button.addEventListener('click', handleFilter));

    document.getElementById('add-product-form').addEventListener('submit', addProduct);

    loadAdminProductList();
});

function loadProducts(productList) {
    const productListDiv = document.getElementById('product-list');
    productListDiv.innerHTML = '';
    productList.forEach(({ id, name, price }) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="https://via.placeholder.com/150?text=${name}" alt="${name}">
            <h3>${name}</h3>
            <p>Precio: $${price.toFixed(2)}</p>
            <button onclick="addToCart(${id})">Agregar al Carrito</button>
        `;
        productListDiv.appendChild(productDiv);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartCount();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart');
    cartCount.textContent = `Carrito (${cart.length})`;
}

function showCart() {
    const modal = document.getElementById('payment-modal');
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(({ name, price }, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `${name} - $${price.toFixed(2)} <button onclick="removeFromCart(${index})">Eliminar</button>`;
        cartItems.appendChild(itemDiv);
        total += price;
    });
    document.getElementById('total-amount').textContent = total.toFixed(2);
    modal.style.display = 'block';
}

function removeFromCart(index) {
    cart.splice(index, 1);
    showCart();
    updateCartCount();
}

function closeModal() {
    const modal = document.getElementById('payment-modal');
    modal.style.display = 'none';
}

function processPayment() {
    alert('Pago procesado con éxito');
    cart = [];
    updateCartCount();
    closeModal();
}

function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const filteredProducts = products.filter(({ name }) => name.toLowerCase().includes(searchTerm));
    loadProducts(filteredProducts);
}

function handleFilter(event) {
    const category = event.target.dataset.category;
    loadProducts(category === 'all' ? products : products.filter(({ category: productCategory }) => productCategory === category));
}

function addProduct(event) {
    event.preventDefault();
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const category = document.getElementById('product-category').value;

    const newProduct = {
        id: productIdCounter++,
        name,
        price,
        image: `https://via.placeholder.com/150?text=${name}`,
        category
    };

    products.push(newProduct);
    loadProducts(products);
    loadAdminProductList();
    event.target.reset();
}

function loadAdminProductList() {
    const adminProductList = document.getElementById('admin-product-list');
    adminProductList.innerHTML = '';
    products.forEach(({ id, name, price }) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'admin-product';
        productDiv.innerHTML = `
            <span>${name} - $${price.toFixed(2)}</span>
            <button onclick="editProduct(${id})">Modificar</button>
            <button onclick="deleteProduct(${id})">Eliminar</button>
        `;
        adminProductList.appendChild(productDiv);
    });
}

function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    const newName = prompt("Modificar nombre del producto:", product.name);
    const newPrice = parseFloat(prompt("Modificar precio del producto:", product.price));

    if (newName && !isNaN(newPrice)) {
        product.name = newName;
        product.price = newPrice;
        loadProducts(products);
        loadAdminProductList();
    }
}

function deleteProduct(productId) {
    products = products.filter(p => p.id !== productId);
    loadProducts(products);
    loadAdminProductList();
}
