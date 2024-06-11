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
    productList.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="https://via.placeholder.com/150?text=${product.name}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Precio: $${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Agregar al Carrito</button>
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
    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `${item.name} - $${item.price.toFixed(2)} <button onclick="removeFromCart(${index})">Eliminar</button>`;
        cartItems.appendChild(itemDiv);
        total += item.price;
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
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
    loadProducts(filteredProducts);
}

function handleFilter(event) {
    const category = event.target.dataset.category;
    if (category === 'all') {
        loadProducts(products);
    } else {
        const filteredProducts = products.filter(product => product.category === category);
        loadProducts(filteredProducts);
    }
}

function addProduct(event) {
    event.preventDefault();
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const category = document.getElementById('product-category').value;

    const newProduct = {
        id: productIdCounter++,
        name: name,
        price: price,
        image: `https://via.placeholder.com/150?text=${name}`,
        category: category
    };

    products.push(newProduct);
    loadProducts(products);
    loadAdminProductList();
    event.target.reset();
}

function loadAdminProductList() {
    const adminProductList = document.getElementById('admin-product-list');
    adminProductList.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'admin-product';
        productDiv.innerHTML = `
            <span>${product.name} - $${product.price.toFixed(2)}</span>
            <button onclick="editProduct(${product.id})">Modificar</button>
            <button onclick="deleteProduct(${product.id})">Eliminar</button>
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
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex > -1) {
        products.splice(productIndex, 1);
        loadProducts(products);
        loadAdminProductList();
    }
}
