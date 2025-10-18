from pydantic import BaseModel, Field, EmailStr
from datetime import date

# --- 1. Esquema Base para no repetir código ---
class UserBase(BaseModel):
    nombres: str = Field(..., min_length=1, max_length=100)
    apellido_paterno: str = Field(..., min_length=1, max_length=100)
    apellido_materno: str = Field(..., min_length=1, max_length=100)
    fecha_nacimiento: date
    sexo: str = Field(..., max_length=10)
    # Pydantic validará automáticamente que esto sea un email.
    email: EmailStr

# --- 2. Esquema para la Creación de Usuario (Lo que recibes en la API) ---
class UserCreate(UserBase):
    # --- LA SOLUCIÓN ESTÁ AQUÍ ---
    # Se establece una longitud máxima de 72 caracteres para la contraseña,
    # que es el límite de bcrypt. También se añade una longitud mínima por seguridad.
    password: str = Field(
        ..., 
        min_length=8, 
        max_length=72, 
        description="La contraseña debe tener entre 8 y 72 caracteres."
    )

# --- 3. Esquema para la Lectura de Usuario (Lo que devuelves desde la API) ---
# NUNCA se debe devolver la contraseña.
class User(UserBase):
    id: int

    class Config:
        # Permite que Pydantic funcione con los modelos de SQLAlchemy
        from_attributes = True
