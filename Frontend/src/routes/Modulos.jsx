import Logos from "../components/Logos";
import NavUser from "../components/NavUser";

import icon_modulo from '../assets/images/icon-modulo.png'

import '../assets/styles/Modulos.css'

export default function CursosDashboard() {
    return (
        <>
            <Logos />
            <NavUser/>
            <section className="modulos-seccion">
                <div className="card-modulo">
                    <div className="contain-icon">
                        <img src={icon_modulo} alt="icon-modulo" className="icon"/>
                    </div>
                    <div className="info-modulo">
                        <strong>Vocales</strong>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia, velit dolorem! Repellat nobis dignissimos ut, ipsam odit aperiam laborum earum doloribus delectus distinctio expedita. Voluptatum accusamus illum vero possimus fugit!</p>
                        <button>Comenzar</button>
                    </div>
                </div>
            </section>

        </>
    );
}