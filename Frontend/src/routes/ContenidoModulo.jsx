import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Logos from "../components/Logos";
import NavUser from "../components/NavUser";

import {useData} from "../components/ContextModulo.jsx";

import classes from '../assets/styles/Routes/ContenidoModulo.module.css'

export default function ContenidoModulo(){
    const {idModulo} = useParams();
    
    const navigate = useNavigate();

    const { cargarModulo, contenidos, contenido_actual,pasoActual,loading, error } = useData();

    useEffect(() => async () => {
    // Si no estamos cargando y el array de contenidos está vacio
    //significa que acabamos de recargar la página!
    if (!loading && contenidos.length === 0) {
      //entonces se cargan los datos de este módulo
        cargarModulo(idModulo);

    }
  }, [idModulo, contenidos, cargarModulo, loading]); // Dependencias

    const handlePracticarClick = () => {
        // Navegar a la página de práctica del módulo actual
        navigate(`/practica/modulo/${idModulo}/contenido/${pasoActual}`)
    }

    // --- Renderizado ---
    if (loading && contenidos.length === 0) {
        return <p>Cargando módulo...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    
    if (contenidos.length === 0) {
        return <p>No se encontró contenido.</p>;
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
                    <button className={classes.buttom_practicar} onClick={ ()=> handlePracticarClick()}>Practicar</button>
                </div>
            </section>
        </>
    );

}