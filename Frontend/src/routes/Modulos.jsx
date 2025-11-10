import { useState, useEffect } from "react";

import Logos from "../components/Logos";
import NavUser from "../components/NavUser";

import {getModulos} from '../api/Modulos.js'
import { useData } from "../components/ContextModulo.jsx";
import { useNavigate } from "react-router-dom";

import classes from'../assets/styles/Routes/Modulos.module.css'

export default function CursosDashboard() {
    const navigate = useNavigate();
    const [modulos, setModulos] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        const cargarModulos = async () => {
            try {
                const data = await getModulos(); 
                setModulos(data);
                console.log(data)
            } catch (err) {
                if (err.status === 401) {
                    localStorage.removeItem('access_token');
                    navigate('/login'); 
                } else {
                    setError(err.message); 
                }
            }
        };
        cargarModulos();
    }, [navigate]); // Añadimos navigate como dependencia

    const { cargarModulo, loading } = useData(); 
    
    const handleModuloClick = async (idModulo) => {
        if (!loading) {
            try {
                // Carga el módulo (esto resetea el paso a 0 en el contexto)
                await cargarModulo(idModulo); 
                // Navegamos explícitamente al primer contenido (índice 0)
                navigate(`/modulo/contenido/${idModulo}/contenido/0`); 
            } catch (err) {
                setError(err.message);
            }
        }
    }

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
                                onClick={ () => handleModuloClick(modulo.id) }
                                >
                                    Comenzar
                                </button>
                            </div>
                        </div>
                    </div>
                    ))}
            </section>
        </>
    );
}