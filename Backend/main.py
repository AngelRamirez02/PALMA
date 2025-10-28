from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from db.database import engine, Base

import models

from endpoints import usuario_router
from endpoints import modulo_router


print("Creando tablas en la base de datos...")
Base.metadata.create_all(bind=engine)
print("Tablas creadas exitosamente")


# Creación de la instancia de la aplicación FastAPI
app = FastAPI(
    title="Mi Proyecto API",
    description="Esta es la API para mi proyecto PALMA.",
    version="0.1.0"
)

# Permitir orígenes (ajusta con tu puerto de React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # o ["*"] si quieres todo abierto
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")

# Ruta raíz de prueba
@app.get("/")
def read_root():
    return {"message": "¡API funcionando! Visita /docs para la documentación."}

# Inclusión de los routers de la aplicación
app.include_router(usuario_router.router, prefix="/api", tags=["Usuarios"])

app.include_router(modulo_router.router, prefix="/api", tags=["Modulos"])