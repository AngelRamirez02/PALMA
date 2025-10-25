import { Children } from "react"

import classes from '../assets/styles/Components/CardForm.module.css'

export default function CardLogin({children}){
    return(
        <div className={classes.card_form}>
            {children}
        </div>
    )
}   