import { Link } from 'react-router-dom'
import '../assets/styles/Home.css'

export default function NavButtonLogin(){
    return(
        <Link to="/registro" className="button-regisrtrarse button" >
            <span className="text-bold">Registrarse</span>
        </Link>
    )
}