// Definición de productos y prototipos
// Constructor para la clase Producto
function Producto(nombre, precio, imagenFrontal, imagenTrasera) {
    this.nombre = nombre;
    this.precio = precio;
    this.imagenFrontal = imagenFrontal;
    this.imagenTrasera = imagenTrasera;
}

// Crear clase derivada ProductoConDescuento que hereda de Producto
function ProductoConDescuento(nombre, precio, imagenFrontal, imagenTrasera, descuento) {
    Producto.call(this, nombre, precio, imagenFrontal, imagenTrasera); // Hereda propiedades de Producto
    this.descuento = descuento || 0; // Propiedad descuento, por defecto es 0 si no se proporciona
}

// Establecer la herencia para ProductoConDescuento
ProductoConDescuento.prototype = Object.create(Producto.prototype); // Establece el prototipo
ProductoConDescuento.prototype.constructor = ProductoConDescuento; // Ajusta el constructor de la clase derivada

// Método para calcular el precio con descuento
ProductoConDescuento.prototype.calcularPrecioConDescuento = function() {
    return this.precio - (this.precio * this.descuento / 100); // Calcula el precio con el descuento aplicado
};

// Lista de productos, algunos con descuento aplicado
const productos = [
    new Producto("GRACEJONES", 2890, "vestido1.png", "vestido1.1.png"),  // Sin descuento
    new ProductoConDescuento("ANGELIS", 3590, "vestido2.png", "vestido2.2.png", 20),  // Con 20% de descuento
    new Producto("FANEL", 3750, "vestido3.png", "vestido3.3.png"),  // Sin descuento
    new ProductoConDescuento("AMIRYA", 2990, "vestido4.png", "vestido4.4.png", 20),  // Con 20% de descuento
    new Producto("JUDY", 3590, "vestido5.png", "vestido5.5.png"),  // Sin descuento
    new ProductoConDescuento("NOEMIE", 2990, "vestido6.png", "vestido6.6.png", 20)  // Con 20% de descuento
];

// Variables del carrusel
const carruselContenedor = document.getElementById("carrusel-contenedor"); // Contenedor donde se mostrarán los productos
let indiceInicio = 0;  // Índice del primer producto visible en el carrusel

// Función para cargar los productos en el carrusel
function cargarProductos() {
    carruselContenedor.innerHTML = ""; // Limpiar el contenedor de productos antes de cargar nuevos
    productos.forEach((producto) => {
        const div = document.createElement("div"); // Crear un nuevo contenedor para cada producto
        div.classList.add("producto"); // Añadir la clase 'producto'

        // Mostrar precio con descuento si aplica
        let precioOriginal = producto.precio.toFixed(2) + "€"; // Precio original con dos decimales
        let precioConDescuento = ""; // Inicializamos la variable para el precio con descuento
        let descuentoText = ""; // Inicializamos el texto del descuento

       // Verificar si el producto tiene descuento
        if (producto instanceof ProductoConDescuento) {
            precioConDescuento = producto.calcularPrecioConDescuento().toFixed(2) + "€"; // Calcular el precio con descuento
            descuentoText = `Descuento: ${producto.descuento}%`; // Mostrar el texto con el porcentaje de descuento
        }

        // Añadir el contenido HTML del producto
        div.innerHTML = `
            <img src="${producto.imagenFrontal}" alt="${producto.nombre}" 
                 data-frontal="${producto.imagenFrontal}" 
                 data-trasera="${producto.imagenTrasera}">
            <h3>${producto.nombre}</h3>
            ${producto instanceof ProductoConDescuento ? `<p><del>${precioOriginal}</del> <strong>${precioConDescuento}</strong></p>` : `<p><strong>${precioOriginal}</strong></p>`}
            <p>${descuentoText}</p>
            <button class="comprar-btn" data-producto="${producto.nombre}">Comprar</button>
        `;
        carruselContenedor.appendChild(div); // Añadir el producto al contenedor del carrusel
    });

    // Agregar evento hover para cambiar la imagen (imagen trasera)
    const imagenes = document.querySelectorAll(".producto img");
    imagenes.forEach((img) => {
        img.addEventListener("mouseover", () => {
            img.src = img.dataset.trasera; // Cambiar la imagen a la trasera al pasar el ratón
        });
        img.addEventListener("mouseout", () => {
            img.src = img.dataset.frontal; // Volver a la imagen frontal al quitar el ratón
        });
    });

    // Agregar evento de compra a cada botón de comprar
    const botonesComprar = document.querySelectorAll(".comprar-btn");
    botonesComprar.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const productoNombre = e.target.dataset.producto; // Obtener el nombre del producto desde el dataset
            const producto = productos.find((p) => p.nombre === productoNombre); // Buscar el producto en el array
            carrito.push(producto); // Agregar el producto al carrito
            actualizarCarrito(); // Actualizar el carrito

            // Mostrar mensaje de éxito con descuento si aplica
            if (producto instanceof ProductoConDescuento) {
                alert(`${producto.nombre} agregado al carrito. ¡Descuento del ${producto.descuento}% aplicado!`);
            } else {
                alert(`${producto.nombre} agregado al carrito.`);
            }
        });
    });
}

// Función para actualizar el carrusel mostrando siempre 3 productos
function actualizarCarrusel() {
    const totalProductos = productos.length; // Obtener el número total de productos
    carruselContenedor.innerHTML = ""; // Limpiar el carrusel

    for (let i = 0; i < 3; i++) { // Mostrar 3 productos a la vez
        const indice = (indiceInicio + i) % totalProductos; // Calcular el índice del producto a mostrar
        const producto = productos[indice]; // Obtener el producto correspondiente

        const div = document.createElement("div"); // Crear un nuevo contenedor para el producto
        div.classList.add("producto"); // Añadir la clase 'producto'

        // Mostrar precio con descuento si aplica
        let precioOriginal = producto.precio.toFixed(2) + "€"; // Precio original con dos decimales
        let precioConDescuento = ""; // Inicializamos la variable para el precio con descuento
        let descuentoText = ""; // Inicializamos el texto del descuento

        // Verificar si el producto tiene descuento
        if (producto instanceof ProductoConDescuento) {
            precioConDescuento = producto.calcularPrecioConDescuento().toFixed(2) + "€"; // Calcular el precio con descuento
            descuentoText = `Descuento: ${producto.descuento}%`; // Mostrar el texto con el porcentaje de descuento
        }

        // Añadir el contenido HTML del producto
        div.innerHTML = `
            <img src="${producto.imagenFrontal}" alt="${producto.nombre}" 
                 data-frontal="${producto.imagenFrontal}" 
                 data-trasera="${producto.imagenTrasera}">
            <h3>${producto.nombre}</h3>
            <p><del>${precioOriginal}</del> <strong>${precioConDescuento}</strong></p>
            <p>${descuentoText}</p>
            <button class="comprar-btn" data-producto="${producto.nombre}">Comprar</button>
        `;
        carruselContenedor.appendChild(div); // Añadir el producto al carrusel
    }

    // Agregar evento hover para cambiar la imagen (imagen trasera)
    const imagenes = document.querySelectorAll(".producto img");
    imagenes.forEach((img) => {
        img.addEventListener("mouseover", () => {
            img.src = img.dataset.trasera; // Cambiar a la imagen trasera
        });
        img.addEventListener("mouseout", () => {
            img.src = img.dataset.frontal; // Volver a la imagen frontal
        });
    });

    // Agregar evento de compra a cada botón de comprar
    const botonesComprar = document.querySelectorAll(".comprar-btn");
    botonesComprar.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const productoNombre = e.target.dataset.producto; // Obtener el nombre del producto
            const producto = productos.find((p) => p.nombre === productoNombre); // Buscar el producto
            carrito.push(producto); // Agregar al carrito
            actualizarCarrito(); // Actualizar el carrito
            alert(`${producto.nombre} agregado al carrito.`);
        });
    });
}

// Función para mover el carrusel (anterior o siguiente)
function moverCarrusel(direccion) {
    const totalProductos = productos.length; // Obtener el número total de productos
    if (direccion === "siguiente") {
        indiceInicio = (indiceInicio + 1) % totalProductos; // Mover al siguiente producto
    } else {
        indiceInicio = (indiceInicio - 1 + totalProductos) % totalProductos; // Mover al producto anterior
    }
    actualizarCarrusel(); // Actualizar la visualización del carrusel
}

// Eventos de navegación del carrusel
// Al hacer clic en el botón "anterior", se mueve el carrusel hacia atrás
document.getElementById("btn-anterior").addEventListener("click", () => moverCarrusel("anterior"));
// Al hacer clic en el botón "siguiente", se mueve el carrusel hacia adelante
document.getElementById("btn-siguiente").addEventListener("click", () => moverCarrusel("siguiente"));

// Variables del carrito
// Recuperamos el carrito del localStorage (si existe), o inicializamos uno vacío si no hay datos previos
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
// Referencias a los elementos de la interfaz
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
const finalizarCompraBtn = document.getElementById("finalizar-compra");
const carritoModal = document.getElementById("carrito-modal");
const closeModal = document.getElementById("close-modal");
const carritoIcono = document.getElementById("carrito-icono");

// Función para actualizar la interfaz del carrito
function actualizarCarrito() {
    listaCarrito.innerHTML = ""; // Limpiar la lista del carrito
    let total = 0; // Variable para almacenar el total de la compra

    // Recorremos cada producto del carrito
    carrito.forEach((producto, index) => {
        let precioFinal = producto.precio; // Precio del producto sin modificaciones

        // Si el producto tiene descuento, calculamos el precio con descuento
        if (producto instanceof ProductoConDescuento) {
            precioFinal = producto.calcularPrecioConDescuento();
        }

        // Creamos un elemento de lista (li) con el nombre y precio del producto
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${producto.nombre} - ${precioFinal.toFixed(2)}€</span>
            <button class="eliminar-producto" data-index="${index}">Eliminar</button>
        `;
        listaCarrito.appendChild(li); // Añadimos el nuevo elemento a la lista
        total += precioFinal; // Acumulamos el precio final de todos los productos
    });

    // Actualizamos el total del carrito en la interfaz
    totalCarrito.textContent = `${total.toFixed(2)}€`;
    // Guardamos el carrito actualizado en el localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Agregamos eventos a los botones de eliminación de productos
    document.querySelectorAll(".eliminar-producto").forEach((btn) =>
        btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index; // Obtenemos el índice del producto a eliminar
            carrito.splice(index, 1); // Eliminamos el producto del carrito
            actualizarCarrito(); // Actualizamos la interfaz después de eliminar el producto
        })
    );
}

// Evento para vaciar el carrito
vaciarCarritoBtn.addEventListener("click", () => {
    carrito.length = 0; // Limpiamos el carrito
    actualizarCarrito(); // Actualizamos la interfaz
    alert("El carrito ha sido vaciado."); // Mostramos un mensaje de confirmación
});

// Evento para finalizar la compra
finalizarCompraBtn.addEventListener("click", () => {
    if (carrito.length === 0) { // Si el carrito está vacío, mostramos un mensaje
        alert("El carrito está vacío. Agrega productos antes de finalizar la compra.");
        return;
    }

    // Obtenemos la fecha de la compra
    const fechaCompra = new Date();
    let resumenCompra = carrito
        .map((producto) => {
            let mensajeDescuento = "";
            // Verificamos si el producto tiene descuento
            if (producto instanceof ProductoConDescuento) {
                mensajeDescuento = ` (Descuento aplicado: ${producto.descuento}%)`;
            }
            // Formateamos cada producto para mostrar en el resumen de compra
            return `${producto.nombre} - ${producto.precio.toFixed(2)}€${mensajeDescuento}`;
        })
        .join("\n");

    // Mostramos un resumen de la compra con la fecha, productos y total
    alert(
        `Compra finalizada el ${fechaCompra.toLocaleString()}.\n\nProductos:\n${resumenCompra}\n\nTotal: ${totalCarrito.textContent}`
    );

    carrito.length = 0; // Limpiamos el carrito después de la compra
    actualizarCarrito(); // Actualizamos la interfaz
});

// Evento para abrir el carrito (mostramos el modal del carrito)
carritoIcono.addEventListener("click", () => {
    carritoModal.style.display = "flex"; // Hacemos visible el modal
});

// Evento para cerrar el modal del carrito
closeModal.addEventListener("click", () => {
    carritoModal.style.display = "none"; // Ocultamos el modal
});

// Inicializar el carrusel y el carrito al cargar la página
cargarProductos(); // Cargamos los productos para el carrusel
actualizarCarrito(); // Actualizamos la interfaz del carrito

// Mostrar el mensaje de éxito al enviar el formulario de contacto
document.getElementById("form-contacto").addEventListener("submit", (e) => {
    e.preventDefault(); // Evitamos el envío tradicional del formulario
    document.getElementById("mensaje-exito").style.display = "block"; // Mostramos un mensaje de éxito
});