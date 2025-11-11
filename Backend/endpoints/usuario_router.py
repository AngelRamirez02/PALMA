from fastapi import APIRouter, Depends, HTTPException, Header, Query
from sqlalchemy.orm import Session

from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
from typing import Annotated

from db.database import SessionLocal
from services.auth import get_users, get_user_by_email, create_user
from services.user import set_experiencia_user
from schemas.usuario import User, UserCreate, UserLogin, UserExperiencia
from services.modulos import get_experiencia_modulo

from core.config import settings
from core.security import verify_password, verificar_token

from fastapi.security import OAuth2PasswordRequestForm

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

def create_access_token(data: dict) -> str:
    """
    Genera un nuevo token de acceso JWT.
    """
    to_encode = data.copy()
    # Define el tiempo de expiración del token (desde ahora en UTC)
    expire = datetime.now(timezone.utc) + timedelta(seconds=settings.ACCESS_TOKEN_EXPIRE_SECONDS)
    
    # Agrega los claims de expiración (exp) y "emitido en" (iat) al payload
    to_encode.update({"exp": expire, "iat": datetime.now(timezone.utc)})
    
    #Codifica el token con la clave secreta y el algoritmo
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    
    return encoded_jwt

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

#Inicio de sesión de usuario
@router.post("/login")
def login_user(user: UserLogin,db: Session = Depends(get_db)):
    db_user = get_user_by_email(db, email=user.email)
    #Verificar si el usuario existe
    if not db_user:
        raise HTTPException(status_code=400, detail="Email o contraseña incorrectos.")
    #Verificar la contraseña
    if not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Email o contraseña incorrectos.")
        
    token_jw = create_access_token(data={"sub": db_user.email})
    # Devuelve el token, el tipo, y la duración en segundos.
    return {
        "access_token": token_jw,
        "token_type": "bearer",
        "expires_in": settings.ACCESS_TOKEN_EXPIRE_SECONDS # Envía la duración
    }

@router.post("/update/experiencia")
def actualizar_experiencia(user_data:UserExperiencia, db:Session =Depends(get_db), access_token: Annotated[str | None, Header()] = None):
    user = verificar_token(access_token,db)#Verifca que la sesion del usuario esté activa
    experiencia_ganada = get_experiencia_modulo(UserExperiencia.id_modulo, db) #Obtiene la experiencia del modulo completao
    
    #Llama a la función para actualizar la nueva experiencia
    return set_experiencia_user(UserExperiencia.id_user, experiencia_ganada,db)

