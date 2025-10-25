import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import ButtonLogin from "./ButtonLogin.jsx";
import ButtonRegistro from "./ButtonRegistro.jsx";

import classes from "../assets/styles/Components/NavAuth.module.css";

import LogoPalma from "../assets/images/logos/logo-palma.jpg";

export default function NavAuth() {
  //Detectar en que ruta se encuentra
  const location = useLocation();
  return (
    <nav className={classes.nav_auth}>
      <Link to="/" className={classes.container_logo}>
        <img src={LogoPalma} alt="logo-palma" className={classes.logo_palma} />
      </Link>
      <div className={classes.container_buttons}>
        {/* Muestra el botón de Login SI NO estás en /login */}
        {location.pathname !== "/login" && <ButtonLogin />}

        {/* Muestra el botón de Registro SI NO estás en /registro */}
        {location.pathname !== "/registro" && <ButtonRegistro/>}
      </div>
    </nav>
  );
}
