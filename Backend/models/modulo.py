from sqlalchemy import Column, Integer, String, Text
from db.database import Base

class Modulo(Base):
    __tablename__ = 'modulo'
    id = Column(Integer,  primary_key=True, index=True)
    nombre = Column(String(100), unique=True)
    descripcion = Column(Text)
    link_imagen = Column(String(500))