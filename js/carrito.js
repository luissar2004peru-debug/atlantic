// ============================================================
// LÓGICA DEL CARRITO DE COMPRAS (carrito.js)
// ============================================================

// Elementos de la Interfaz del Carrito Lateral
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartCloseBtn = document.getElementById('cartCloseBtn');
const cartBody = document.getElementById('cartBody');
const cartTotal = document.getElementById('cartTotal');
const cartVaciarBtn = document.getElementById('cartVaciarBtn');

// Buscar el botón de "Carrito" en tu Navbar. 
// Asegúrate de que el botón de tu menú tenga la clase o id 'btn-carrito' o cámbialo aquí.
const navbarCartBtn = document.querySelector('.btn-outline-light') || document.querySelector('[href="#carrito"]'); 

// Estado de la aplicación: Lista de productos en memoria
let carritoItems = [
    // Datos simulados iniciales para probar la funcionalidad de inmediato
    { id: 1, nombre: "Bono de Bienvenida Casino", precio: 50.00, img: "img/imgPrin.webp" },
    { id: 2, nombre: "Fichas Torneo Póker Junio", precio: 120.00, img: "img/imgPrin.webp" }
];

// --- 1. ABRIR Y CERRAR MENÚ ---
function toggleCart() {
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
}

if(navbarCartBtn) {
    navbarCartBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Evita saltos de página si es un enlace
        toggleCart();
    });
}
cartCloseBtn.addEventListener('click', toggleCart);
cartOverlay.addEventListener('click', toggleCart);


// --- 2. RENDERIZAR ITEMS DEL CARRITO ---
function actualizarCarritoUI() {
    // Limpiamos el contenedor
    cartBody.innerHTML = '';

    if (carritoItems.length === 0) {
        cartBody.innerHTML = `<p class="cart_vacio_text">Tu carrito está vacío.</p>`;
        cartTotal.textContent = 'S/. 0.00';
        return;
    }

    let sumaTotal = 0;

    // Inyectamos dinámicamente cada producto usando plantillas literales
    carritoItems.forEach(item => {
        sumaTotal += item.precio;
        
        const itemHTML = `
            <div class="cart_item">
                <img src="${item.img}" alt="${item.nombre}" class="cart_item_img">
                <div class="cart_item_info">
                    <span class="cart_item_name">${item.nombre}</span>
                    <span class="cart_item_price">S/. ${item.precio.toFixed(2)}</span>
                </div>
                <button class="cart_item_remove" onclick="eliminarProducto(${item.id})">&times;</button>
            </div>
        `;
        cartBody.insertAdjacentHTML('beforeend', itemHTML);
    });

    // Actualizamos el precio acumulado total
    cartTotal.textContent = `S/. ${sumaTotal.toFixed(2)}`;
}

// --- 3. ELIMINAR 1 A 1 ---
window.eliminarProducto = function(id) {
    // Filtramos el arreglo para sacar el elemento clickeado
    carritoItems = carritoItems.filter(item => item.id !== id);
    actualizarCarritoUI();
};

// --- 4. VACIAR TODOS LOS PRODUCTOS ---
cartVaciarBtn.addEventListener('click', () => {
    carritoItems = []; // Limpiamos por completo el arreglo
    actualizarCarritoUI();
});

// Inicializar la interfaz al cargar la web
document.addEventListener('DOMContentLoaded', actualizarCarritoUI);