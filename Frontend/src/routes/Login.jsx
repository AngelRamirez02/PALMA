import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";

//Sercvicios
import { loginUser } from "../api/Login.js"

import AuthLayout from "../layout/AuthLayout"
import NavAuth from "../components/NavAuth.jsx";
import CardForm from "../components/CardForm.jsx"

//Importar imágenes
import LogoPalma from '../assets/images/logos/logo-palma.jpg' //Logo palma

//Importar estilos
import classes from '../assets/styles/Routes/Login.module.css'

export default function Login(){
    //Estados para los imputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Estados para manejar la UI (carga y errores)
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    const [showErrorModal, setShowErrorModal] = useState(false); // Estado para mostrar el modal de error

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(null); // Reiniciar errores previos
        setCargando(true); // Indicar que la petición está en curso

        const UserCredenciales= {
            email: email,
            password: password
        };
        
        try {
            const data = await loginUser(UserCredenciales);
            console.log('Inicio de sesión exitoso:', data);
            // 2. Obtenemos los segundos de validez que envía la API (ej: 1800)
            const expiresInSeconds = data.expires_in;

            //Calculamos la marca de tiempo (timestamp) exacta de expiración
            //(new Date().getTime() da milisegundos actuales)
            const expirationTime = new Date().getTime() + (expiresInSeconds * 1000);

            // Guardamos AMBOS datos en localStorage
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('expires_in', expirationTime);
            
            //Redirigir 
            navigate('/modulos')
        } catch (err) {
            console.error('Error en el inicio de sesión:', err);
            setError(err.message); // Mostrar el mensaje de error al usuario
            setShowErrorModal(true);
        } finally {
            setCargando(false); // Finalizar el estado de carga
        }
    }
    
    return(
        <AuthLayout>
            <NavAuth/>
            <section className={classes.section}>
                <CardForm>
                    <div className={classes.container_logo_registro}>
                        <img src={LogoPalma} alt="logo-palma" className={classes.logo_palma_registro}/>
                    </div>
                    <h1 className="title_form">Iniciar Sesión</h1>
                    <form onSubmit={handleSubmit} className={classes.form_login}>
                        <label className={classes.input_label}>
                            Correo Electrónico
                            <input 
                            className={classes.input}
                            type="email" name="email" placeholder="Ingresa tu correo electrónico" required 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                        <label className={classes.input_label}>
                            Contraseña
                            <input 
                                className={classes.input}
                                type="password" placeholder="Contraseña" required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        <button className={classes.btn_login} type="submit">Iniciar sesión</button>
                        <p>No tienes cuenta?<Link to="/registro" className="link-iniciar-sesion">Crear cuenta</Link></p>
                    </form>
                </CardForm>
            </section>
            {showErrorModal && (
            <div className={classes.modal_overlay}>
                <div className={classes.modal_card}>
                    <h2>¡Error!</h2>
                    <p>{error}</p>
                    <button 
                        className={classes.btn_modal_error} 
                        onClick={() => setShowErrorModal(false)}
                    >
                        OK
                    </button>
                </div>
            </div>
            )}
        </AuthLayout>
    )   
}