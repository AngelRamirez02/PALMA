import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Logos from "../components/Logos";
import NavUser from "../components/NavUser";

import {useData} from "../components/ContextModulo.jsx";

import classes from '../assets/styles/Routes/ContenidoModulo.module.css'

export default function ContenidoModulo(){
    // Obtenemos ambos parametros de la url
    const {idModulo, idContenido} = useParams(); 
    
    const navigate = useNavigate();

    // Obtenemos setPasoActual del contexto
    const { cargarModulo, contenidos, contenido_actual, pasoActual, loading, error, setPasoActual } = useData();

    useEffect(() => {
        const pasoUrl = parseInt(idContenido, 10);

        const inicializar = async () => {
            //Cargar datos del módulo si no están
            if (!loading && contenidos.length === 0) {
                await cargarModulo(idModulo);
            }
            
            // Sincronizar el paso con la URL
            // Hacemos esto despues de cargar, o si los datos ya están.
            if (!isNaN(pasoUrl) && pasoUrl !== pasoActual) {
                setPasoActual(pasoUrl);
            }
        };
        
        inicializar();
        
    }, [idModulo, idContenido, contenidos, cargarModulo, loading, setPasoActual, pasoActual]); // Dependencias

    const handlePracticarClick = () => {
        // 'pasoActual' ya está sincronizado por el useEffect
        navigate(`/practica/modulo/${idModulo}/contenido/${pasoActual}`)
    }

    // --- Renderizado ---
    if (loading && contenidos.length === 0) {
        return <p>Cargando módulo...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    
    // Comprobamos que el contenido_actual exista antes de intentar renderizar
    if (!contenido_actual) {
        return <p>Cargando contenido...</p>;
    }

    return(
        <>
            <Logos/>
            <NavUser/>
            <section>
                <div className={classes.contenido_modulo}>
                    <h2>{contenido_actual.nombre}</h2>
                    <div className="container-img">
                        <img src={contenido_actual.url_img_letra} alt="img-letra"></img>
                    </div>
                    <p>{contenido_actual.descripcion}</p>
                </div>
                <div className={classes.container_buttom}>
                    <button className={classes.buttom_practicar} onClick={handlePracticarClick}>Practicar</button>
                </div>
            </section>
        </>
    );

}