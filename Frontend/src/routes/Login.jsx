import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";

//Sercvicios
import { loginUser } from "../api/Login.js"

import AuthLayout from "../layout/AuthLayout"
import NavButtonRegistro from "../components/NavButtonRegistro.jsx"
import CardForm from "../components/CardForm.jsx"

//Importar imágenes
import LogoPalma from '../assets/images/logos/logo-palma.jpg' //Logo palma

//Importar estilos
import '../assets/styles/Home.css'

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
            // Aquí puedes redirigir al usuario o guardar el token, etc.
            //El componente se encarga de los efectos secundarios (guardar token y navegar)
            localStorage.setItem('accessToken', data.access_token);
            navigate('/cursos')
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
            <nav>
            <Link to="/" className="container-logo">
                <img src={LogoPalma} alt="logo-palma" className="logo-palma"/>
            </Link>
                <div className="container-buttons">
                    <NavButtonRegistro/>
                </div>
            </nav>
            <section>
                <CardForm>
                    <div className="container-logo-registro">
                        <img src={LogoPalma} alt="logo-palma" className="logo-palma-registro"/>
                    </div>
                    <h1 className="title-form">Iniciar Sesión</h1>
                    <form onSubmit={handleSubmit}>
                        <label className="input-label">
                            Correo Electrónico
                            <input 
                            className="input"
                            type="email" name="email" placeholder="Ingresa tu correo electrónico" required 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                        <label className="input-label">
                            Contraseña
                            <input 
                                className="input"
                                type="password" placeholder="Contraseña" required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        <button className="btn-registrarse" type="submit">Iniciar sesión</button>
                        <p>No tienes cuenta?<Link to="/registro" className="link-iniciar-sesion">Crear cuenta</Link></p>
                    </form>
                </CardForm>
            </section>
            {showErrorModal && (
            <div className="modal-overlay">
                <div className="modal-card">
                    <h2>¡Error!</h2>
                    <p>{error}</p>
                    <button 
                        className="btn-modal-error" 
                        onClick={() => setShowErrorModal(false)}
                    >
                        OK
                    </button>
                </div>
            </div>)}
        </AuthLayout>
    )   
}