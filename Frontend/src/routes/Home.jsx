import { Link } from "react-router-dom"
//Importar componentes
import NavButtonLogin from "../components/NavButtonLogin.jsx"
import NavButtonRegistro from "../components/NavButtonRegistro.jsx"
import AuthLayout from "../layout/AuthLayout.jsx"

//Importar imágenes
import LogoPalma from '../assets/images/logos/logo-palma.jpg' //Logo palma

//Importar estilos
import '../assets/styles/Home.css'

export default function Home(){
    return(
        <AuthLayout>
        <nav>
            <div className="container-logo">
                <img src={LogoPalma} alt="logo-palma" className="logo-palma"/>
            </div>
            <div className="container-buttons">
                <NavButtonLogin/>
                <NavButtonRegistro/>
            </div>
        </nav>
        <main>
            <div className="container-home">
                <h1 className="titulo-home">PALMA</h1>
                <h2 className="descripcion-home">Plataforma para el aprendizaje de la lengua de señas mexicana a través de visión artificial para la población de Acapulco</h2>
                <h3>“Rompiendo las barreras de la comuniación”</h3>
                <Link to={"/login"} className="btn-comenzar">Comenzar</Link>
            </div>
        </main>
        </AuthLayout>
    )
}