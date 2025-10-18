import { Link } from 'react-router-dom';

//Importar estilos
import '../assets/styles/Home.css'

export default function NavButtonLogin(){
    return(
        <Link to="/login" className="button-login button" >
            <span className="text-bold">Iniciar sesión</span>
        </Link>
    )
}