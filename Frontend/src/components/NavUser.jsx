import { useNavigate } from 'react-router-dom';

import ProgressBar from 'react-bootstrap/ProgressBar';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Dropdown } from 'react-bootstrap';
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
                            color: 'black',
                            fontWeight: 'bold',
                            fontSize: '0.9rem'
                        }}>
                            {`${user.experiencia}/1000 EXP`}
                        </span>
                    </div>
                </div>
                <Dropdown style={{ width: "15%" }}>
            {/* 1. Dropdown.Toggle: Es el botón que activa el menú.
               - variant="link": Quita el fondo gris de botón estándar.
               - className="p-0 border-0": Quita padding y bordes extra.
               - id: Es necesario para accesibilidad.
            */}
            <Dropdown.Toggle 
                variant="link"
                id="dropdown-custom-components"
                className="p-0 border-0 text-dark d-flex align-items-center"
                style={{ textDecoration: 'none', backgroundColor:"fffff" }} // Quita el subrayado del link
            >
                <i 
                    className="bi bi-person-circle" 
                    style={{ fontSize: '3.5rem' }}
                ></i>
            </Dropdown.Toggle>

            {/* 2. Dropdown.Menu: Contiene los items */}
            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Divider /> {/* Línea divisoria opcional */}
                <Dropdown.Item href="#/action-3">Cerrar Sesión</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
            </div>
        </nav>
    )
}