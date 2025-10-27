from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from core.config import settings
from db.database import SessionLocal

from passlib.context import CryptContext
# Creamos una instancia de CryptContext.
# Le decimos qué algoritmos de hashing usar, en este caso, "bcrypt".
# "deprecated="auto"" se encargará de actualizar los hashes si en el futuro
# decidimos usar un algoritmo más nuevo.
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifica si una contraseña en texto plano coincide con una hasheada.
    """
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """
    Genera el hash de una contraseña en texto plano.
    """
    return pwd_context.hash(password)

# Función para obtener la BD
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def verificar_token(access_token: str, db:Session):
    """
    Validar el token y obtener el usario.
    """
    from services.auth import get_user_by_email

    credentials_exception = HTTPException( #
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Usuario no indentificado",
        headers={"WWW-Authenticate": "Bearer"},
    )
    if access_token is None: #Si el token está vacio
        raise credentials_exception
    try:
        #Decodificar el token
        user_info = jwt.decode(access_token, key=settings.SECRET_KEY, algorithms=settings.ALGORITHM)
        email: str = user_info.get('sub')#Obtener el correo del usuario
    except JWTError:#Error al codificar el token
        raise credentials_exception
    
    #Verificar que el correo sea uno existente
    user = get_user_by_email(db,email=email)
    if user is None:
        raise credentials_exception
    return user
