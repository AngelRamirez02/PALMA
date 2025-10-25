import logo_gob from '../assets/images/logos/logo-gob.png'
import logo_edu from '../assets/images/logos/logo-educacion.png'
import logo_tec from '../assets/images/logos/logo-tecnm.png'
import logo_tec_aca from '../assets/images/logos/logo_tecnm_acapulco.jpg'

import classes from '../assets/styles/Components/Logos.module.css'

export default function Logos(){
    return(
        <>
        <title>Palma</title>
        <header className={classes.header}>
            <div>
                <img src={logo_gob} alt="logo-gobierno" className={classes.logo_img}/>
            </div>
            <div>
                <img src={logo_edu} alt="logo-eduacion" className={classes.logo_img}/>
            </div>
            <div>
                <img src={logo_tec} alt="logo-tecnm" className={classes.logo_img}/>
            </div>
            <div>
                <img src={logo_tec_aca} alt="logo-tecnm-acapulco" className={classes.logo_img}/>
            </div>
        </header>
        </>
    )
}