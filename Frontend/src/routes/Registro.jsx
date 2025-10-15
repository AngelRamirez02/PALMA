import { useState } from "react"
import { Link } from "react-router-dom"

//Importar componentes
import AuthLayout from "../layout/AuthLayout.jsx"
import NavButtonLogin from "../components/NavButtonLogin.jsx"
import CardForm from "../components/CardForm.jsx"

import { registrarUsuario } from "../api/RegitroUsuario.jsx"

//Importar imágenes
import LogoPalma from '../assets/images/logos/logo-palma.jpg' //Logo palma

//Importar estilos
import '../assets/styles/Home.css'
import '../assets/styles/Registro.css'

export default function Registro(){
    //Estados para los inputs
    const [nombres, setNombres] = useState('');
    const [apellidoPaterno, setApellidoPaterno] = useState('');
    const [apellidoMaterno, setApellidoMaterno] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [sexo, setSexo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Estados para manejar la UI (carga y errores)
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async(event) => {
        event.preventDefault();

        // 1. Validación simple: que las contraseñas coincidan
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return; // Detenemos la ejecución
        }
        
        // 2. Limpiar errores previos y activar estado de carga
        setError(null);
        setCargando(true);

        const usuario = {
        nombres: "string",
        apellido_paterno: "string",
        apellido_materno: "string",
        fecha_nacimiento: "2025-10-15",
        sexo: "string",
        email: "user@example.com",
        password: "stringst"
        };
        console.log('Datos del usuario a registrar:', usuario);
        try {
            // 4. Llamar a la función del servicio API
            const data = await registrarUsuario(usuario);
            console.log('Usuario registrado con éxito:', data);
            alert('¡Registro exitoso! Ahora inicia sesión.'); // O un mensaje más elegante
            navigate('/login'); // Redirigir al login después del registro exitoso

        } catch (error) {
            // 5. Si hay un error, lo mostramos al usuario
            setError(error.message || 'Ocurrió un error inesperado.');
            console.error(error);
        } finally {
            // 6. Desactivar el estado de carga, tanto si hubo éxito como si hubo error
            setCargando(false);
        }
    };

    return(
        <AuthLayout>
        <nav>
            <Link to="/" className="container-logo">
                <img src={LogoPalma} alt="logo-palma" className="logo-palma"/>
            </Link>
                <div className="container-buttons">
                    <NavButtonLogin/>
                </div>
            </nav>
            <section>
                <CardForm>
                    <h1>Crea tu cuenta</h1>
                    <form className="form-registro" onSubmit={handleSubmit}>
                        <label className="input-label"> 
                            Nombre(s)
                            <input
                                className="input"
                                id="nombres" 
                                type="text" placeholder="Nombres" required
                                value={nombres}
                                onChange={(e) => setNombres(e.target.value)}   
                            />
                        </label>
                        <label className="input-label">
                            Apellido paterno
                            <input 
                            className="input"
                            type="text" placeholder="Apellido paterno" required
                            value={apellidoPaterno}
                            onChange={(e) => setApellidoPaterno(e.target.value)}
                            />
                        </label>
                        <label className="input-label">
                            Apellido materno
                            <input 
                            className="input"
                            type="text" placeholder="Apellido materno" required
                            value={apellidoMaterno}
                            onChange={(e) => setApellidoMaterno(e.target.value)}
                            />
                        </label>
                        <label className="input-label">
                            Fecha de nacimiento
                            <input 
                                className="input" type="date"
                                value={fechaNacimiento}
                                onChange={(e) => setFechaNacimiento(e.target.value)}
                                required
                            />
                        </label>
                        <div className="container-sexo">
                            <legend>Sexo:</legend>
                                <div>
                                    <input 
                                        type="radio" id="masculino" name="sexo" value="masculino"
                                        checked={sexo === 'masculino'}
                                        onChange={(e) => setSexo(e.target.value)}
                                    />
                                    <label htmlFor="masculino">Masculino</label>
                                </div>
                                <div>
                                    <input 
                                        type="radio" id="femenino" name="sexo" value="femenino"
                                        checked={sexo === 'femenino'}
                                        onChange={(e) => setSexo(e.target.value)}
                                    />
                                    <label htmlFor="femenino">Femenino</label>
                                </div>
                                <div>
                                    <input 
                                        type="radio" id="otro" name="sexo" value="otro"
                                        checked={sexo === 'otro'}
                                        onChange={(e) => setSexo(e.target.value)}
                                    />
                                    <label htmlFor="otro">Prefiero no decirlo</label>
                                </div>
                        </div>
                        <label className="input-label">
                            Correo electrónico
                            <input 
                                className="input"
                                type="email" placeholder="Correo electrónico" required
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
                        <label className="input-label">
                            Confirmar contraseña
                            <input 
                                className="input"
                                type="password" placeholder="Confirmar contraseña" required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </label>
                        <button className="btn-registrarse" type="submit">Registrarse</button>
                        <p>¿Ya tienes una cuenta? <Link to="/login" className="link-iniciar-sesion">Inicia sesión</Link></p>    
                    </form>
                </CardForm>
            </section>
        </AuthLayout>
    )
}