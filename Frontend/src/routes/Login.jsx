import AuthLayout from "../layout/AuthLayout"
import NavButtonRegistro from "../components/NavButtonRegistro.jsx"
import { Link } from "react-router-dom"

//Importar imágenes
import LogoPalma from '../assets/images/logos/logo-palma.jpg' //Logo palma

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
            <div>
                <h1>Crea tu cuenta</h1>
            </div>
        </AuthLayout>
    )   
}