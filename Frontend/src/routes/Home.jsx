import { Link } from "react-router-dom";
//Importar componentes
import NavAuth from "../components/NavAuth.jsx";

import AuthLayout from "../layout/AuthLayout.jsx";

//Importar estilos
import classes from "../assets/styles/Routes/Home.module.css";

export default function Home() {
  return (
    <AuthLayout>
      <NavAuth />
      <main>
        <div className={classes.container_home}>
          <h1 className={classes.titulo_home}>PALMA</h1>
          <h2 className={classes.descripcion_home}>
            Plataforma para el aprendizaje de la lengua de señas mexicana a
            través de visión artificial para la población de Acapulco
          </h2>
          <h3 className={classes.eslogan_home}>“Rompiendo las barreras de la comuniación”</h3>
          <Link to={"/login"} className={classes.btn_comenzar}>
            Comenzar
          </Link>
        </div>
      </main>
    </AuthLayout>
  );
}
