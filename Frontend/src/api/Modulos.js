
export const getModulos = async () => {
    
    // 1. Verificar el token PRIMERO
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
        // Si no hay token, no tiene sentido hacer la petición.
        // Lanzamos un error que el componente puede capturar.
        throw new Error("No se encontró el token de acceso.");
    }
    console.log(accessToken);
    const response = await fetch('http://127.0.0.1:8000/api/modulos', {
        method: 'GET',
        headers: {
            // 2. 'Content-Type' eliminado, no es necesario para GET
            'access-token': accessToken
        },
    });

    if (!response.ok) {
        // Creamos un objeto de error
        const error = new Error("Error en la petición");
        // Le añadimos el status para poder leerlo en el componente
        error.status = response.status;
        try {
            // Intentamos leer el JSON (el 'detail' de FastAPI)
            const errorData = await response.json();
            error.message = errorData.detail || `Error ${response.status}`;
        } catch (e) {
            // Si falla (no es JSON), usamos el texto de estado (ej. "Not Found")
            errorData = { detail: response.statusText };
        }
        //Mensaje de error mejorado
        const errorMessage = errorData.detail || 'Error desconocido al obtener los módulos';
        throw new Error(errorMessage);
    }

    // Si todo va bien, devolvemos los datos
    return response.json();
}