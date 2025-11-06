import Logos from "../components/Logos";
import NavUser from "../components/NavUser";

import {useData} from "../components/ContextModulo.jsx";

export default function ContenidoModulo(){
    
    const {contenido_actual} = useData();
    console.log(contenido_actual);

    return(
        <>
            <Logos/>
            <NavUser/>
            <p>Here</p>
            <p>{contenido_actual.id}</p>
        </>
    );

}