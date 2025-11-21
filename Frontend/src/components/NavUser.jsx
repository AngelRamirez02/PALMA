import { useNavigate } from 'react-router-dom';

import ProgressBar from 'react-bootstrap/ProgressBar';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
//Importar estilos
import classes from '../assets/styles/Components/NavUser.module.css'

//Importar imágenes
import LogoPalma from '../assets/images/logos/logo-palma.jpg' //Logo palma
import { useEffect, useState } from 'react';

import { getUser } from '../api/Usuario';

export default function NavUser(){
    const navigate = useNavigate();
    const [user, setUser] =useState([]);
    
    useEffect(()=>{
        const cargarUser = async()=>{
            try{
                const data = await getUser();
                setUser(data);
                console.log(data);
            }catch(err){
                if(err.status === 401){
                        localStorage.removeItem('access_token');
                        navigate('/login'); 
                } else {
                    setError(err.message); 
                }
            }
        };
        cargarUser();
    },[navigate]);

    return(
        <nav className={classes.nav_user}>
            <div className={classes.container_logo}>
                <img src={LogoPalma} alt="logo-palma" className={classes.logo_palma}/>
            </div>
            <div className={classes.container_bar_user}>
                <div className={classes.container_progress_bar}>
                    <p className={classes.text_exp}>Experiencia actual:</p>
                    <div style={{ position: 'relative' }}> {/* 1. Contenedor Relativo */}
                        <ProgressBar 
                            max={1000} 
                            now={user.experiencia} 
                            variant="success"
                            style={{ height: '20px' }}
                        />
                        {/*El Texto absoluto */}
                        <span style={{
                            position: 'absolute',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center', // Centrado Horizontal
                            alignItems: 'center',     // Centrado Vertical
                            top: 0,
                            bottom: 0,
                            zIndex: 1,
                            color: 'black',           // <--- AQUÍ CAMBIAS EL COLOR
                            fontWeight: 'bold',       // Opcional: Para que se lea mejor
                            fontSize: '0.9rem'        // Opcional: Ajustar tamaño
                        }}>
                            {`${user.experiencia}/1000`}
                        </span>
                    </div>
                </div>
                <div className={classes.container_icon_user}>
                    <i className="bi bi-person-circle"
                    style={{ fontSize: '3.5rem'}}>
                    </i>
                </div>
            </div>
        </nav>
    )
}