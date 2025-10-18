import { Link } from "react-router-dom"

import AuthLayout from "../layout/AuthLayout"
import NavButtonRegistro from "../components/NavButtonRegistro.jsx"
import CardForm from "../components/CardForm.jsx"

//Importar imágenes
import LogoPalma from '../assets/images/logos/logo-palma.jpg' //Logo palma

//Importar estilos
import '../assets/styles/Home.css'

export default function Login(){
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
                    <form action="">
                        <label className="input-label">
                            Correo Electrónico
                            <input 
                            className="input"
                            type="email" name="email" placeholder="Ingresa tu correo electrónico" required 
                            />
                        </label>
                        <label className="input-label">
                            Contraseña
                            <input 
                                className="input"
                                type="password" placeholder="Contraseña" required
                            />
                        </label>
                        <button className="btn-registrarse" type="submit">Iniciar sesión</button>
                        <p>No tienes cuenta?<Link to="/registro" className="link-iniciar-sesion">Crear cuenta</Link></p>
                    </form>
                </CardForm>
            </section>
        </AuthLayout>
    )   
}