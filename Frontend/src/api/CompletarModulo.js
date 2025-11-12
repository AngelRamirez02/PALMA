export const completarModulo = async (id_modulo) => {
    //Obtener token de acceso
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
        // Si no hay token, no tiene sentido hacer la petición.
        // Lanzamos un error que el componente puede capturar.
        throw new Error("No se encontró el token de acceso.")
    }

    const datos_modulo = {
        "id_modulo":id_modulo
    }

    const response = await fetch(`http://127.0.0.1:8000/api/modulos/registrar/modulocompletado`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'access-token': accessToken
        },
        body: JSON.stringify(datos_modulo)
    })

    if (!response.ok){
        //Creamos el objeto de error
        const error = new Error("Error en la petición");
        //Le añadimos el status
        error.status = response.status;

        let errorData = {};
        try {
            //Intentamos leer el JSON
            errorData = await response.json();
        } catch (e) {
            // Si falla (no es JSON), usamos el texto de estado
            errorData = { detail: response.statusText || 'Error en la respuesta' };
        }
        
        // Asignamos el mensaje de FastAPI al error original
        error.message = errorData.detail || `Error ${response.status}`;
        
        //LANZAMOS EL ERROR ORIGINAL (que sí tiene .status)
        throw error;
    }

    //Devolvemos el json con los datos
    return response.json();
}