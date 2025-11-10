import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom"

//Rutas de las paginas
import Home from './routes/Home.jsx'
import Registro from './routes/Registro.jsx'
import Login from './routes/Login.jsx'
import Modulos from './routes/Modulos.jsx'
import ContenidoModulo from './routes/ContenidoModulo.jsx'
import PracticaModulo from './routes/PracticaModulo.jsx'

//Componente para ruta protegita
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { DataContextProvider } from './components/ContextModulo.jsx'

// --- Rutas Públicas ---
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/registro",
    element: <Registro/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },

  // -- Rutas Protegidas ---
  {
  // Este <ProtectedRoute /> protege a TODOS sus hijos
  element: <ProtectedRoute />, 
  children: [
    {
      element: <DataContextProvider />, //El Provider solo envuelve a este grupo
      children: [
        {
          path: "modulos",
          element: <Modulos />,
        },
        {
          path: "modulo/contenido/:idModulo/contenido/:idContenido", 
          element: <ContenidoModulo />
        },
        {
          path: "practica/modulo/:idModulo/contenido/:pasoActualModulo",
          element: <PracticaModulo />
        }
      ]
    }
  ]
},
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)