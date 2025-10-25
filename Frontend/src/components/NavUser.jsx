//Importar estilos
import classes from '../assets/styles/Components/NavUser.module.css'

//Importar imágenes
import LogoPalma from '../assets/images/logos/logo-palma.jpg' //Logo palma

export default function NavUser(){
    return(
        <nav className={classes.nav_user}>
            <div className={classes.container_logo}>
                <img src={LogoPalma} alt="logo-palma" className={classes.logo_palma}/>
            </div>
            <div>
                
            </div>
        </nav>
    )
}