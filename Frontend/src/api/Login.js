// src/api/authService.js

/**
 * Realiza una petición a la API para iniciar sesión.
 * @param {string} email - El email del usuario.
 * @param {string} password - La contraseña del usuario.
 * @returns {Promise<object>} - Una promesa que resuelve con los datos del token.
 * @throws {Error} - Lanza un error si el inicio de sesión falla.
 */
export const loginUser = async (UserCredenciales) => {
    const response = await fetch('http://127.0.0.1:8000/api/usuarios/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(UserCredenciales),
    });

    if (!response.ok) {
        const errorData = await response.json();
        // Lanzamos un error que será capturado por el componente
        throw new Error(errorData.detail || 'Error en el inicio de sesión');
    }

    // Si todo va bien, devolvemos los datos
    return response.json();
};