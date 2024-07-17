// formHandler.js

import { addProduct } from './api'; // Importa la función necesaria desde api.js

document.getElementById('addProductForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get('name');
    const price = parseFloat(formData.get('price'));
    const image = formData.get('image');

    try {
        await addProduct({ name, price, image }); // Llama a la función para agregar productos
        event.target.reset(); // Resetea el formulario después de enviar
        renderProducts(); // Vuelve a renderizar la lista de productos actualizada
    } catch (error) {
        console.error('Error adding product:', error);
    }
});

function clearForm() {
    document.getElementById('addProductForm').reset();
}
