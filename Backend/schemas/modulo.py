from pydantic import BaseModel, Field

class ModuloBase(BaseModel):
    nombre:str = Field(..., min_length=1, max_length=100)
    descripcion: str
    link_img:str

class Modulo(ModuloBase):
    id: int