// main.js

import { getProducts, deleteProduct } from './api.js'; // Importa las funciones necesarias desde api.js

document.addEventListener('DOMContentLoaded', () => {
    renderProducts(); // Llama a la función para renderizar productos cuando se carga la página
});

export async function renderProducts() {
    try {
        const products = await getProducts(); // Obtiene los productos desde la API
        const productList = document.querySelector('.product-list');
        productList.innerHTML = ''; // Limpia la lista de productos antes de renderizar

        products.forEach(product => {
            const card = createProductCard(product);
            productList.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

export function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('card');

    const image = document.createElement('img');
    image.src = `./assets/${product.image}`; // Ruta local a la imagen del producto
    image.alt = product.name;
    card.appendChild(image);

    const infoContainer = document.createElement('div');
    infoContainer.classList.add('card-container--info');

    const name = document.createElement('p');
    name.textContent = product.name;
    infoContainer.appendChild(name);

    const valueContainer = document.createElement('div');
    valueContainer.classList.add('card-container--value');

    const price = document.createElement('p');
    price.textContent = `$ ${product.price.toFixed(2)}`;
    valueContainer.appendChild(price);

    const deleteIcon = document.createElement('img');
    deleteIcon.src = './assets/trashIcon.png'; // Ruta a la imagen de eliminar (ajustar según tu proyecto)
    deleteIcon.alt = 'Delete';
    deleteIcon.classList.add('delete-icon');
    deleteIcon.addEventListener('click', async () => {
        try {
            await deleteProduct(product.id); // Llama a la función para eliminar productos
            renderProducts(); // Vuelve a renderizar la lista después de eliminar
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    });
    valueContainer.appendChild(deleteIcon);

    infoContainer.appendChild(valueContainer);
    card.appendChild(infoContainer);

    return card;
}
