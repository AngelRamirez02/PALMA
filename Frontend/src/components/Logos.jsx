import logo_gob from '../assets/images/logos/logo-gob.png'
import logo_edu from '../assets/images/logos/logo-educacion.png'
import logo_tec from '../assets/images/logos/logo-tecnm.png'
import logo_tec_aca from '../assets/images/logos/logo_tecnm_acapulco.jpg'

import '../assets/styles/Logos.css'

export default function Logos(){
    return(
        <>
        <title>Palma</title>
        <header className='header'>
            <div>
                <img src={logo_gob} alt="logo-gobierno" className='logo-img'/>
            </div>
            <div>
                <img src={logo_edu} alt="logo-eduacion" className='logo-img'/>
            </div>
            <div>
                <img src={logo_tec} alt="logo-tecnm" className='logo-img'/>
            </div>
            <div>
                <img src={logo_tec_aca} alt="logo-tecnm-acapulco" className='logo-img'/>
            </div>
        </header>
        </>
    )
}