//Contenido del carrito 
    document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoDropdown = document.querySelector('#carrito-dropdown tbody');
    const carritoCompleto = document.querySelector('#carrito-completo');
    const carritoListaCompleta = document.querySelector('#carrito-lista-completa tbody');
    const totalPrecioElement = document.querySelector('#total-precio');
    const verCarritoBtn = document.querySelector('#ver-carrito');
    const checkoutModal = document.querySelector('#checkout-modal');
    const checkoutForm = document.querySelector('#checkout-form');
    const closeModalBtn = document.querySelector('.close');

    // Manejar clics en los botones de "Añadir al carrito"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const productoElement = event.target.closest('.ofert-1');
            const productoId = productoElement.dataset.id;
            const productoNombre = productoElement.querySelector('h3').textContent;
            const productoPrecio = productoElement.querySelector('.precio').textContent;
            const productoImagen = productoElement.querySelector('img').src;

            const producto = {
                id: productoId,
                nombre: productoNombre,
                precio: productoPrecio,
                imagen: productoImagen
            };

            // Añadir producto al carrito
            carrito.push(producto);
            guardarCarrito();
            actualizarCarrito();
        });
    });

    verCarritoBtn.addEventListener('click', (event) => {
        event.preventDefault();
        toggleCarritoDropdown();
        mostrarCarritoCompleto();
    });

    checkoutForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const accountNumber = document.querySelector('#account-number').value;
        alert(`Número de cuenta: ${accountNumber}\n¡Gracias por su compra!`);
        checkoutModal.style.display = 'none';
        carrito.length = 0;
        guardarCarrito();
        actualizarCarrito();
        mostrarCarritoCompleto();
    });

    closeModalBtn.addEventListener('click', () => {
        checkoutModal.style.display = 'none';
    });

    function guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function actualizarCarrito() {
        // Limpiar carrito
        carritoDropdown.innerHTML = '';

        // Añadir productos al carrito
        carrito.forEach(producto => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td><img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: 50px;"></td>
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
                <td><button class="remove-from-cart" data-id="${producto.id}">Eliminar</button></td>
            `;

            carritoDropdown.appendChild(row);
        });

        // Mostrar el carrito desplegable
        document.querySelector('.cart-dropdown').style.display = 'block';

        // Añadir funcionalidad para eliminar productos
        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', (event) => {
                const productoId = event.target.dataset.id;
                eliminarDelCarrito(productoId);
            });
        });
    }

    function eliminarDelCarrito(productoId) {
        const index = carrito.findIndex(producto => producto.id === productoId);
        if (index !== -1) {
            carrito.splice(index, 1);
            guardarCarrito();
            actualizarCarrito();
            mostrarCarritoCompleto();
        }
    }

    function toggleCarritoDropdown() {
        const carritoDropdownElement = document.querySelector('.cart-dropdown');
        if (carritoDropdownElement.style.display === 'block') {
            carritoDropdownElement.style.display = 'none';
        } else {
            carritoDropdownElement.style.display = 'block';
        }
    }

    function mostrarCarritoCompleto() {
        // Limpiar carrito completo
        carritoListaCompleta.innerHTML = '';

        // Añadir productos al carrito completo
        carrito.forEach(producto => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td><img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: 50px;"></td>
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
                <td><button class="remove-from-cart" data-id="${producto.id}">Eliminar</button></td>
            `;

            carritoListaCompleta.appendChild(row);
        });

        // Calcular el precio total
        const totalPrecio = carrito.reduce((total, producto) => {
            const precio = parseFloat(producto.precio.replace('€', '').replace(',', '.')); // Reemplazar la coma por punto si es necesario
            return total + (isNaN(precio) ? 0 : precio);
        }, 0);
        
        totalPrecioElement.textContent = `Total: ${totalPrecio.toFixed(2)}€`;
        // Mostrar el carrito completo
        carritoCompleto.style.display = 'block';

        // Añadir funcionalidad para eliminar productos en la vista completa del carrito
        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', (event) => {
                const productoId = event.target.dataset.id;
                eliminarDelCarrito(productoId);
            });
        });

        // Mostrar el modal de checkout
        document.querySelector('#checkout-btn').addEventListener('click', (event) => {
            event.preventDefault();
            checkoutModal.style.display = 'block';
        });
    }

    // Inicializar el carrito al cargar la página
    actualizarCarrito();
});

// Manejo de cuentas de usuario
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#login-form');
    const registerForm = document.querySelector('#register-form');
    const logoutBtn = document.querySelector('#logout-btn');
    const userInfo = document.querySelector('#user-info');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.querySelector('#login-email').value;
        const password = document.querySelector('#login-password').value;
        // Lógica de autenticación aquí

        localStorage.setItem('user', JSON.stringify({ email }));
        mostrarInfoUsuario();
    });

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.querySelector('#register-email').value;
        const password = document.querySelector('#register-password').value;
        // Lógica de registro aquí

        localStorage.setItem('user', JSON.stringify({ email }));
        mostrarInfoUsuario();
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('user');
        mostrarInfoUsuario();
    });

    function mostrarInfoUsuario() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            userInfo.textContent = `Bienvenido, ${user.email}`;
            loginForm.style.display = 'none';
            registerForm.style.display = 'none';
            logoutBtn.style.display = 'block';
        } else {
            userInfo.textContent = '';
            loginForm.style.display = 'block';
            registerForm.style.display = 'block';
            logoutBtn.style.display = 'none';
        }
    }

    // Inicializar la info de usuario al cargar la página
    mostrarInfoUsuario();
});

