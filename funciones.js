
const btnBuscar = document.querySelector('.barra-lateral .botonbuscar');
const inputBusqueda = document.querySelector('.barra-lateral #busqueda');
const inputMinPrecio = document.querySelector('#min-precio');
const inputMaxPrecio = document.querySelector('#max-precio');
const tarjetas = document.querySelectorAll('.tarjeta-producto');


function filtrarProductos() {
  const texto = inputBusqueda.value.toLowerCase();
  const min = parseFloat(inputMinPrecio.value) || 0;       
  const max = parseFloat(inputMaxPrecio.value) || Infinity; 

  tarjetas.forEach(tarjeta => {
    const titulo = tarjeta.querySelector('h3').textContent.toLowerCase();
    const artista = tarjeta.querySelector('.artista').textContent.toLowerCase();
    const precioTexto = tarjeta.querySelector('.precio').textContent.replace(' Bs', '');
    const precio = parseFloat(precioTexto) || 0;

    
    const textoCoincide = titulo.includes(texto) || artista.includes(texto);
    const precioCoincide = precio >= min && precio <= max;

    if (textoCoincide && precioCoincide) {
      tarjeta.style.display = 'block';
    } else {
      tarjeta.style.display = 'none';
    }
  });
}


btnBuscar.addEventListener('click', filtrarProductos);
inputBusqueda.addEventListener('keyup', filtrarProductos);
inputMinPrecio.addEventListener('change', filtrarProductos);
inputMaxPrecio.addEventListener('change', filtrarProductos);
