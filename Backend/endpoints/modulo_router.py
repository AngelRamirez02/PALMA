from fastapi import APIRouter, Depends, HTTPException, Query, Header
from sqlalchemy.orm import Session
from db.database import SessionLocal
from core.security import verificar_token

from models import ContenidoModulo
from models import modulo_completado

from services.modulos import get_modulos, get_contenidoModulo, get_experiencia_modulo
from services.modulo_completado import get_modulosCompletados_User,set_modulo_completado
from services.user import set_experiencia_user

from schemas import usuario
from schemas.modulo_completado import ModuloCompletadoBase

from typing import Annotated
from jose import jwt, JWTError

from core.config import settings

#Conexión a la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

router = APIRouter(
    prefix="/modulos",
    tags=["Modulos"]
)

""""
@router.get("/")
def read_modulos(db:Session = Depends(get_db),
                 current_user: usuario.User = Depends(get_current_user)):
    return get_modulos(db)
    """

@router.get("/")
def read_modulos(db:Session = Depends(get_db), access_token: Annotated[str | None, Header()] = None):
    usuario = verificar_token(access_token, db)
    return get_modulos(db)

@router.get("/{id_modulo}/contenido")
def contenido_modulo(id_modulo: int, db: Session = Depends(get_db),access_token: Annotated[str | None, Header()] = None):
    usuario = verificar_token(access_token, db)
    return get_contenidoModulo(db,id_modulo)

@router.get("/moduloscompletados/{id_user}")
def get_modulos_completados(id_user:int, db: Session = Depends(get_db), access_token: Annotated[str | None, Header()] = None):
    usuario = verificar_token(access_token, db)
    return get_modulosCompletados_User(id_user, db)

@router.post("/registrar/modulocompletado")
def registrar_modulo_completado_endpoint(data:ModuloCompletadoBase,  db: Session = Depends(get_db)):
    #Obtener la experiencia ganada
    experiencia_ganada = get_experiencia_modulo(data.id_modulo, db)
    #Actualizar la experiencia del usuario con
    db_user = set_experiencia_user(data.id_usuario, experiencia_ganada, db)
    #Si no se actualiza la experiencia del usuario
    print(db_user)
    if not db_user:
        raise HTTPException(
            status_code=404, # 404 Not Found
            detail=f"No se pudo actualizar. Usuario con id {data.id_usuario} no encontrado."
        )
    return set_modulo_completado(data, db)

