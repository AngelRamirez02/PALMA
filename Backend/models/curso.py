from sqlalchemy import Column, Integer, String, Text
from db.database import Base

class Curso(Base):
    __tablename__ = 'curso'
    id = Column(Integer,  primary_key=True, index=True)
    nombre = Column(String(255), unique=True)
    descripcion = Column(Text(500))
    link_imagen = Column(String(255))