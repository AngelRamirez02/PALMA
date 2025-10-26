from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from db.database import SessionLocal
from core.security import get_current_user

from services.modulos import get_modulos
from schemas import usuario

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

@router.get("/")
def read_modulos(db:Session = Depends(get_db),
                 current_user: usuario.User = Depends(get_current_user)):
    return get_modulos(db)