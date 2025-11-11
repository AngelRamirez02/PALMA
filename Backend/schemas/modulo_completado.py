from pydantic import BaseModel, Field

class ModuloCompletadoBase(BaseModel):
    id_modulo:int
    id_usuario:int