import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom"

//PRutas de las paginas
import Home from './routes/Home.jsx'
import Registro from './routes/Registro.jsx'
import Login from './routes/Login.jsx'
import Modulos from './routes/Modulos.jsx'

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
  {
    path: "/modulos",
    element: <Modulos/>,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)