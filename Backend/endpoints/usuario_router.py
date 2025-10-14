from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from db.database import SessionLocal
from services.auth import get_users, get_user_by_email, create_user
from schemas.usuario import User, UserCreate

#Conexión a la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

router = APIRouter(
    prefix="/usuarios",
    tags=["Usuarios"],
)

@router.get("/", response_model=list[User])
def read_users(db: Session = Depends(get_db)):
    return get_users(db)

@router.get("/hola")
def hola():
    return {"message": "Hola, esta es una ruta de prueba."}

#Crear un nuevo usuario
@router.post("/registrar", response_model=User)
def create_new_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="El email ya está registrado.")
    return create_user(db=db, user=user)
