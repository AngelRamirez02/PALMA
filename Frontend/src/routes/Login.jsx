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
                    <h2 className="title-form">Iniciar Sesión</h2>
                </CardForm>
            </section>
        </AuthLayout>
    )   
}