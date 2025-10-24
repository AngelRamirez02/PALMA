//Importar imágenes
import LogoPalma from '../assets/images/logos/logo-palma.jpg' //Logo palma
import NavButtonLogin from './NavButtonLogin'
import NavButtonRegistro from './NavButtonRegistro'
export default function NavUser(){

    return(
        <nav>
            <div className="container-logo">
                <img src={LogoPalma} alt="logo-palma" className="logo-palma"/>
            </div>
            <div>
                
            </div>
        </nav>
    )
}