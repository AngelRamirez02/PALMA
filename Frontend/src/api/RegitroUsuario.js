/**
 * Función para registrar un nuevo usuario en el backend.
 * @param {object} usuarioData - Los datos del usuario a registrar.
 * @returns {Promise<object>} La respuesta del servidor en formato JSON.
 */
export async function registrarUsuario(usuarioData) {
    // ¡Importante! Cambia esta URL por la de tu backend en FastAPI.
    const API_URL = 'http://localhost:8000/api/usuarios/registrar'; 

    try {
        const respuesta = await fetch(API_URL, {
            method: 'POST', // Especificamos que es una petición POST
            headers: {
                'Content-Type': 'application/json', // Indicamos que enviaremos datos en formato JSON
            },
            body: JSON.stringify(usuarioData), // Convertimos el objeto de JS a una cadena JSON
        });

        // Si la respuesta no es exitosa (ej. error 400, 500), lanzamos un error.
        if (!respuesta.ok) {
            const errorData = await respuesta.json(); // Intentamos leer el cuerpo del error
            throw new Error(errorData.detail || 'No se pudo completar el registro.');
        }

        // Si todo fue bien, devolvemos la respuesta del servidor.
        return await respuesta.json();

    } catch (error) {
        console.error('Error al registrar usuario:', error);
        // Volvemos a lanzar el error para que el componente que llama a esta función pueda manejarlo.
        throw error;
    }
}

// Puedes agregar aquí más funciones para otras peticiones (login, obtener datos, etc.)