
const btnBuscar = document.querySelector('.barra-lateral .botonbuscar');
const inputBusqueda = document.querySelector('.barra-lateral #busqueda');
const inputMinPrecio = document.querySelector('#min-precio');
const inputMaxPrecio = document.querySelector('#max-precio');
const ordenarSelect = document.querySelector('.ordenar');
const productosContainer = document.querySelector('.productos');

let tarjetas = Array.from(document.querySelectorAll('.tarjeta-producto'));

function filtrarProductos() {
  const texto = inputBusqueda?.value.toLowerCase() || '';
  const min = parseFloat(inputMinPrecio?.value) || 0;
  const max = parseFloat(inputMaxPrecio?.value) || Infinity;

  tarjetas.forEach(tarjeta => {
    const titulo = tarjeta.querySelector('h3').textContent.toLowerCase();
    const artista = tarjeta.querySelector('.artista')?.textContent.toLowerCase() || '';
    const precioTexto = tarjeta.querySelector('.precio').textContent.replace(' Bs', '');
    const precio = parseFloat(precioTexto) || 0;

    const textoCoincide = titulo.includes(texto) || artista.includes(texto);
    const precioCoincide = precio >= min && precio <= max;

    tarjeta.style.display = (textoCoincide && precioCoincide) ? 'block' : 'none';
  });
}


function ordenarProductos() {
  if (!ordenarSelect) return;

  const criterio = ordenarSelect.value;
  let tarjetasVisibles = tarjetas.filter(t => t.style.display !== 'none');

  tarjetasVisibles.sort((a, b) => {
    if (criterio === 'nuevo') {
      const fechaA = new Date(a.querySelector('.fecha')?.textContent.replace('Lanzado: ', '') || 0);
      const fechaB = new Date(b.querySelector('.fecha')?.textContent.replace('Lanzado: ', '') || 0);
      return fechaB - fechaA;
    } else if (criterio === 'precio') {
      const precioA = parseFloat(a.querySelector('.precio').textContent.replace(' Bs', '')) || 0;
      const precioB = parseFloat(b.querySelector('.precio').textContent.replace(' Bs', '')) || 0;
      return precioA - precioB;
    }
    return 0;
  });

  tarjetasVisibles.forEach(tarjeta => productosContainer.appendChild(tarjeta));
}


if (btnBuscar) btnBuscar.addEventListener('click', () => { filtrarProductos(); ordenarProductos(); });
if (inputBusqueda) inputBusqueda.addEventListener('keyup', () => { filtrarProductos(); ordenarProductos(); });
if (inputMinPrecio) inputMinPrecio.addEventListener('change', () => { filtrarProductos(); ordenarProductos(); });
if (inputMaxPrecio) inputMaxPrecio.addEventListener('change', () => { filtrarProductos(); ordenarProductos(); });
if (ordenarSelect) ordenarSelect.addEventListener('change', ordenarProductos);


let carrito = [];

function actualizarCarrito() {
  let carritoHTML = document.getElementById('carrito');
  if (!carritoHTML) {
    carritoHTML = document.createElement('div');
    carritoHTML.id = 'carrito';
    carritoHTML.style.position = 'fixed';
    carritoHTML.style.top = '20px';
    carritoHTML.style.right = '20px';
    carritoHTML.style.backgroundColor = '#fff';
    carritoHTML.style.border = '1px solid #ccc';
    carritoHTML.style.padding = '15px';
    carritoHTML.style.width = '250px';
    carritoHTML.style.maxHeight = '400px';
    carritoHTML.style.overflowY = 'auto';
    carritoHTML.style.zIndex = '9999';
    carritoHTML.style.borderRadius = '10px';
    document.body.appendChild(carritoHTML);
  }

  carritoHTML.innerHTML = '<h3>Carrito</h3>';
  if (carrito.length === 0) {
    carritoHTML.innerHTML += '<p>Carrito vacío</p>';
    return;
  }

  let total = 0;
  carrito.forEach((item, index) => {
    carritoHTML.innerHTML += `
      <div style="margin-bottom:8px; border-bottom:1px solid #ccc; padding-bottom:5px;">
        <strong>${item.nombre}</strong> <br>
        ${item.artista ? item.artista + '<br>' : ''}
        Precio: ${item.precio} Bs <br>
        <button data-index="${index}" class="quitar">Quitar</button>
      </div>
    `;
    total += item.precio;
  });

  carritoHTML.innerHTML += `<hr><p><strong>Total: ${total} Bs</strong></p>`;

 
  carritoHTML.querySelectorAll('.quitar').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index);
      carrito.splice(idx, 1);
      actualizarCarrito();
    });
  });
}

function agregarAlCarrito(nombre, artista, precio) {
  carrito.push({ nombre, artista, precio });
  actualizarCarrito();
}


tarjetas.forEach(tarjeta => {
  const btn = tarjeta.querySelector('.boton-comprar');
  if (btn) {
    btn.addEventListener('click', () => {
      const nombre = tarjeta.querySelector('h3').textContent;
      const artista = tarjeta.querySelector('.artista')?.textContent || '';
      const precio = parseFloat(tarjeta.querySelector('.precio').textContent.replace(' Bs', '')) || 0;
      agregarAlCarrito(nombre, artista, precio);
    });
  }
});



const botonCarrito = document.getElementById('abrirCarrito');
if (botonCarrito) {
  botonCarrito.addEventListener('click', () => {
    const carrito = document.getElementById('carrito');
    if (carrito) {
      carrito.classList.toggle('visible');
    }
  });
}


actualizarCarrito();

