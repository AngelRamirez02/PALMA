import Logos from "../components/Logos"

//Importar estilos
import classes from '../assets/styles/layout/AuthLayout.module.css'

export default function AuthLayout({children}){
    return(
        <>
        <Logos/>
            <div className={classes.container_auth}>
                {children}
            </div>
        </>
    )
}