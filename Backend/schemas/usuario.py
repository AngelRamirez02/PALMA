from pydantic import BaseModel, Field, EmailStr
from datetime import date
from schemas.modulo_completado import ModuloCompletado

# --- 1. Esquema Base para no repetir código ---
class UserBase(BaseModel):
    nombres: str = Field(..., min_length=1, max_length=100)
    apellido_paterno: str = Field(..., min_length=1, max_length=100)
    apellido_materno: str = Field(..., min_length=1, max_length=100)
    fecha_nacimiento: date
    sexo: str = Field(..., max_length=10)
    # Pydantic validará automáticamente que esto sea un email.
    email: EmailStr

# --- Esquema para la Creación de Usuario (Lo que recibe la API) ---
class UserCreate(UserBase):
    # Se establece una longitud máxima de 72 caracteres para la contraseña,
    # que es el límite de bcrypt. También se añade una longitud mínima por seguridad.
    password: str = Field(
        ..., 
        min_length=8, 
        max_length=72, 
        description="La contraseña debe tener entre 8 y 72 caracteres."
    )

# Esquema para la Lectura de Usuario (Lo que devuelves desde la API) ---
class User(UserBase):
    id: int

    class Config:
        # Permite que Pydantic funcione con los modelos de SQLAlchemy
        from_attributes = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserExperiencia(BaseModel):
    id: int
    email: str
    experiencia: int # O 'experincia' si aún tienes el typo en el modelo

    class Config:
        from_attributes = True # (o orm_mode = True)

# Esquema para la respuesta completa del endpoint
class RespuestaModuloCompletado(BaseModel):
    mensaje: str
    experiencia_ganada: int
    usuario_actualizado: UserExperiencia # Usa tu schema de Usuario
    registro_modulo: ModuloCompletado # Usa tu nuevo schema