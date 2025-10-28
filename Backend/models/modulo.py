from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import relationship
from db.database import Base

class Modulo(Base):
    __tablename__ = 'modulo'
    id = Column(Integer,  primary_key=True, index=True)
    nombre = Column(String(100), unique=True)
    descripcion = Column(Text)
    link_imagen = Column(String(500))

    contenidos = relationship(
        "ContenidoModulo", 
        back_populates="modulo", 
        cascade="all, delete-orphan"
    )
