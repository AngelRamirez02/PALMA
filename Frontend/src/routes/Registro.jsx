//Importar componentes
import AuthLayout from "../layout/AuthLayout.jsx"
import NavButtonLogin from "../components/NavButtonLogin.jsx"

//Importar imágenes
import LogoPalma from '../assets/images/logos/logo-palma.jpg' //Logo palma

//Importar estilos
import '../assets/styles/Home.css'
import { Link } from "react-router-dom"
//import '../assets/styles/Registro.css'

export default function Registro(){
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
            <div>
                <h1>Crea tu cuenta</h1>
            </div>
        </AuthLayout>
    )
}