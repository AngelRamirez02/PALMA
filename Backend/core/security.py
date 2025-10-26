from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import jwt, exceptions
from core.config import settings
from db.database import SessionLocal
import models

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

# La URL es la de tu endpoint de login.
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/usuarios/login")

# Función para obtener la BD (ya la tienes, pero la necesitamos aquí)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 2. Esta es la nueva dependencia "guardián" 🛡️
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """
    Dependencia para obtener el usuario actual a partir de un token JWT.
    """
    from services.auth import get_user_by_email
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="No se pudieron validar las credenciales",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        # Decodifica el token usando la clave secreta
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        
        # Extrae el email del subject del token
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
            
    except exceptions.ExpiredSignatureError:
        # Si el token está expirado o es inválido, lanza un error
        raise credentials_exception

    #Verifica que el usuario del token realmente exista en la BD
    user = get_user_by_email(db, email=email)
    if user is None:
        raise credentials_exception
    
    #Si todo está bien, devuelve el objeto del usuario
    return user