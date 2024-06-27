let currentMenuId = null;
const eliminadosMenu1 = [];
const eliminadosMenu2 = [];
const eliminadosMenu3 = [];

function mostrarDetalles(menuId) {
    currentMenuId = menuId;
    const imagenes = {
        menu1: "https://media.istockphoto.com/id/1295633127/es/foto/carne-de-pollo-a-la-parrilla-y-ensalada-de-verduras-frescas-de-tomate-aguacate-lechuga-y.jpg?s=612x612&w=0&k=20&c=gnuOg5gI009lfvkxnObtGubcG7nVVsqH61zIZkdpc-w=",
        menu2: "https://c.files.bbci.co.uk/DBBF/production/_105055265_bandejapaisa.jpg",
        menu3: "https://www.conasi.eu/blog/wp-content/uploads/2019/02/postres-con-frutas-des.jpg"
    };

    document.getElementById('detalleImagen').src = imagenes[menuId];

    const checkboxesContainer = document.getElementById('checkboxes');
    checkboxesContainer.innerHTML = '';

    const productosMenu1 = ['Entrada', 'Ensalada', 'Postre'];
    const productosMenu2 = ['Entrada', 'Ensalada', 'Postre'];

    if (menuId === 'menu1') {
        productosMenu1.forEach(producto => {
            const checkboxDiv = document.createElement('div');
            checkboxDiv.classList.add('form-check');
            const checkboxInput = document.createElement('input');
            checkboxInput.type = 'checkbox';
            checkboxInput.classList.add('form-check-input');
            checkboxInput.id = `${menuId}-${producto.replace(/\s+/g, '-')}`;
            checkboxInput.name = `${menuId}-productos`;
            checkboxInput.value = producto;
            const checkboxLabel = document.createElement('label');
            checkboxLabel.classList.add('form-check-label');
            checkboxLabel.setAttribute('for', checkboxInput.id);
            checkboxLabel.textContent = producto;
            checkboxDiv.appendChild(checkboxInput);
            checkboxDiv.appendChild(checkboxLabel);
            checkboxesContainer.appendChild(checkboxDiv);
        });
    } else if (menuId === 'menu2') {
        productosMenu2.forEach(producto => {
            const checkboxDiv = document.createElement('div');
            checkboxDiv.classList.add('form-check');
            const checkboxInput = document.createElement('input');
            checkboxInput.type = 'checkbox';
            checkboxInput.classList.add('form-check-input');
            checkboxInput.id = `${menuId}-${producto.replace(/\s+/g, '-')}`;
            checkboxInput.name = `${menuId}-productos`;
            checkboxInput.value = producto;
            const checkboxLabel = document.createElement('label');
            checkboxLabel.classList.add('form-check-label');
            checkboxLabel.setAttribute('for', checkboxInput.id);
            checkboxLabel.textContent = producto;
            checkboxDiv.appendChild(checkboxInput);
            checkboxDiv.appendChild(checkboxLabel);
            checkboxesContainer.appendChild(checkboxDiv);
        });
    }

    if (menuId === 'menu3') {
        actualizarElementosEliminadosMenu3();
    }

    $('#detalleMenu').modal('show');
}

function confirmarPedido() {
    const productosSeleccionados = Array.from(document.querySelectorAll(`input[name="${currentMenuId}-productos"]:checked`)).map(checkbox => checkbox.value);

    if (currentMenuId === 'menu1') {
        eliminadosMenu1.length = 0;
        eliminadosMenu1.push(...productosSeleccionados);
        actualizarElementosEliminadosMenu3();
    } else if (currentMenuId === 'menu2') {
        eliminadosMenu2.length = 0;
        eliminadosMenu2.push(...productosSeleccionados);
        actualizarElementosEliminadosMenu3();
    }

    const productosTotales = ['Entrada', 'Ensalada', 'Postre'];
    const productosNoSeleccionados = productosTotales.filter(producto => !productosSeleccionados.includes(producto));

    const menuCard = document.getElementById(currentMenuId);
    let stock = parseInt(menuCard.getAttribute('data-stock'));
    stock -= 1;

    menuCard.setAttribute('data-stock', stock);
    menuCard.querySelector('.count').textContent = stock;

    $('#detalleMenu').modal('hide');
    $('#agradecimientoMenu').modal('show');

    const detallesPedido = document.getElementById('detallesPedido');
    detallesPedido.innerHTML = `
        <div class="text-left">
            <p>Su pedido ha sido confirmado.</p>
            <p>A continuación, encontrará los detalles de lo que elimino:</p>
            <ul>
                ${productosSeleccionados.map(producto => `<li>${producto}</li>`).join('')}
            </ul>
            ${currentMenuId === 'menu3' ? `<p>Y los elementos eliminados del Menú 1 y 2:</p><ul id="eliminadosMenu123Detalles"></ul>` : ''}
            <p>Y su menú contará con:</p>
            <ul>
                ${productosNoSeleccionados.map(producto => `<li>${producto}</li>`).join('')}
            </ul>
        </div>`;

    if (currentMenuId === 'menu3') {
        const eliminadosMenu123Detalles = document.getElementById('eliminadosMenu123Detalles');
        eliminadosMenu123Detalles.innerHTML = '';
        eliminadosMenu3.forEach(elemento => {
            const li = document.createElement('li');
            li.textContent = elemento;
            eliminadosMenu123Detalles.appendChild(li);
        });
    }
}

function actualizarElementosEliminadosMenu3() {
    const eliminadosMenu3Detalles = document.getElementById('eliminadosMenu3');
    eliminadosMenu3Detalles.innerHTML = '';
    eliminadosMenu1.forEach(elemento => {
        if (!eliminadosMenu3.includes(elemento)) {
            eliminadosMenu3.push(elemento);
        }
    });
    eliminadosMenu2.forEach(elemento => {
        if (!eliminadosMenu3.includes(elemento)) {
            eliminadosMenu3.push(elemento);
        }
    });
    eliminadosMenu3.forEach(elemento => {
        const li = document.createElement('li');
        li.textContent = elemento;
        eliminadosMenu3Detalles.appendChild(li);
    });
}
