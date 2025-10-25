import Logos from "../components/Logos";
import NavUser from "../components/NavUser";

import icon_modulo from '../assets/images/icon-modulo.png'

import classes from'../assets/styles/Routes/Modulos.module.css'

export default function CursosDashboard() {
    return (
        <>
            <Logos />
            <NavUser/>
            <section className={classes.modulos_seccion}>
                <div className={classes.card_modulo}>
                    <div className={classes.contain_icon}>
                        <img src={icon_modulo} alt="icon-modulo" className={classes.icon}/>
                    </div>
                    <div className={classes.info_modulo}>
                        <h3>Hola</h3>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia, velit dolorem! Repellat nobis dignissimos ut, ipsam odit aperiam laborum earum doloribus delectus distinctio expedita. Voluptatum accusamus illum vero possimus fugit!</p>
                        <button>Comenzar</button>
                    </div>
                </div>
            </section>

        </>
    );
}