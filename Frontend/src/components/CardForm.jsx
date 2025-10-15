import { Children } from "react"

import '../assets/styles/CardForm.css'

export default function CardLogin({children}){
    return(
        <div className="card-form">
            {children}
        </div>
    )
}   