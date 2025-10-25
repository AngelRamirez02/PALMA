import { Link } from 'react-router-dom'
import classes from '../assets/styles/Components/ButtonRegistro.module.css'

export default function ButtonLogin(){
    return(
        <Link to="/registro" className={classes.button_regisrtrarse}>
            <span className={classes.text_bold}>Registrarse</span>
        </Link>
    )
}