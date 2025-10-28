import { useState, useEffect } from "react";

import Logos from "../components/Logos";
import NavUser from "../components/NavUser";

import {getModulos} from '../api/Modulos.js'

import icon_modulo from '../assets/images/icon-modulo.png'

import classes from'../assets/styles/Routes/Modulos.module.css'

export default function CursosDashboard() {

    const [modulos, setModulos] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
    const cargarModulos = async () => {
        try {
            // Llama a tu nueva función
            const data = await getModulos(); 
            
            setModulos(data);
            console.log(data)

        }catch (err) {
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
        }
    };

    cargarModulos();
  }, []); // El array vacío asegura que se ejecute solo una vez

    return (
        <>
            <Logos />
            <NavUser/>
            <section className={classes.modulos_seccion}>
                <h2 className={classes.titulo_section}>Modulos de aprendizaje</h2>
                {modulos.map(modulo =>(
                    <div key={modulo.id} className={classes.card_modulo}>
                        <div className={classes.contain_icon}>
                            <img src={modulo.link_imagen} alt="icon-modulo" className={classes.icon}/>
                        </div>
                        <div className={classes.info_modulo}>
                            <h3 className={classes.titulo_modulo}>{modulo.nombre}</h3>
                            <p className={classes.descrip_modulo}>{modulo.descripcion}</p>
                            <div className={classes.container_btn}>
                                <button 
                                className={classes.btn_modulo}
                                onClick={ () => handleModuloClick(modulo.id) }>Comenzar</button>
                            </div>
                        </div>
                    </div>
                    ))}
            </section>
        </>
    );
}