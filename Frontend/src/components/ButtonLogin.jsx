import { Link } from 'react-router-dom';

//Importar estilos
import classes from '../assets/styles/Components/ButtonLogin.module.css'

export default function ButtonLogin(){
    return(
        <Link to="/login" className={classes.button_login} >
            <span className={classes.text_bold}>Iniciar sesión</span>
        </Link>
    )
}