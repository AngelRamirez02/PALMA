from pydantic import BaseModel, Field
from datetime import datetime

class ModuloCompletadoBase(BaseModel):
    id_modulo:int

class ModuloCompletado(ModuloCompletadoBase):
    id: int
    id_usuario: int
    fecha_completado: datetime # El campo que se genera automáticamente

    class Config:
        # Esto le da permiso a Pydantic para leer los datos 
        # desde un objeto de SQLAlchemy (ej. db_registro.id)
        from_attributes = True 
        # (Usa 'orm_mode = True' si usas Pydantic v1)