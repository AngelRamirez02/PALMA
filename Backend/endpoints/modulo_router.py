from fastapi import APIRouter, Depends, HTTPException, Query, Header
from sqlalchemy.orm import Session
from db.database import SessionLocal
from core.security import verificar_token

from services.modulos import get_modulos
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