import { createContext, useState, useContext, useCallback } from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import { getContenidoModulo } from "../api/ContenidoModulo";


export const DataContext = createContext();

//Hook personalizado
export const useData = () =>{
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useData debe usarse dentro de DataContextProvider");
    }
    return context;
}

export function DataContextProvider(){
    const navigate = useNavigate();
    //ESTADOS
    const [contenidos, setContenidos] = useState([]); //Array con todos los contenidos
    const [pasoActual, setPasoActual] = useState(0); //Indice del paso actual
    const [loading, setLoading] = useState(false);    // Estado de carga
    const [error, setError] = useState(null);

    const cargarModulo = useCallback(async(idModulo) =>{
        if(!idModulo) return; //No hacer nada sino hay ID
        setLoading(true);
        try{
            //Llamar a la funcion de la api
            const data = await getContenidoModulo(idModulo);
            setContenidos(data);
            setPasoActual(0); //Reiniciar al primer paso
        }
        catch(err){
            // Comprobamos si el error tiene el status 401
            if (err.status === 401) {
                
                //limpiar el token inválido
                localStorage.removeItem('access_token');
                
                // Redirigimos al usuario a la página de login
                navigate('/login'); 
                
            }else {
                // Si es cualquier otro error, solo lo mostramos
                setError(err.message); 
            }
            setContenidos([]); // En caso de error, vaciar los datos
        }
        finally{
            setLoading(false);
        }
    },[navigate])

    //Funcion para avanzar entre los contenidos
    const irSiguiente = () => {
        // Solo avanzamos si no estamos en el último paso
        setPasoActual((prevPaso) => {
        if (prevPaso < contenidos.length - 1) {
            return prevPaso + 1;
        }
        return prevPaso;
        });
    };

    const valor = {
        //Funciones
        cargarModulo,
        irSiguiente,
        setPasoActual,

        //Valores y estados
        contenidos,
        pasoActual,
        contenido_actual:contenidos[pasoActual],
        total_contenido:contenidos.length,
        error,
        loading
    }
    return(
        <DataContext.Provider value={valor}>
            
            <Outlet/>
        </DataContext.Provider>
    );
}