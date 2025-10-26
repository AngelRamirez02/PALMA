from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from db.database import SessionLocal

from services.modulos import get_modulos

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
def read_modulos(db:Session = Depends(get_db)):
    return get_modulos(db)