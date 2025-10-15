import Logos from "../components/Logos"

//Importar estilos
import '../assets/styles/AuthLayout.css'

export default function AuthLayout({children}){
    return(
        <>
        <Logos/>
            <div className="container-auth">
                {children}
            </div>
        </>
    )
}