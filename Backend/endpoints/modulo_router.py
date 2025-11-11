from fastapi import APIRouter, Depends, HTTPException, Query, Header
from sqlalchemy.orm import Session
from db.database import SessionLocal
from core.security import verificar_token

from models import ContenidoModulo
from models import modulo_completado

from services.modulos import get_modulos, get_contenidoModulo
from services.modulo_completado import get_modulosCompletados_User
from schemas import usuario

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
def get_modulos_completados(id_user:int, db: Session = Depends(get_db)):
    return get_modulosCompletados_User(id_user, db);