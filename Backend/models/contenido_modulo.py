from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from db.database import Base

class ContenidoModulo(Base):
    __tablename__ = 'contenido_modulo'
    id = Column(Integer,  primary_key=True, index=True)
    #Llave foranea que apunta a la tabla modulo
    id_modulo = Column(Integer, ForeignKey('modulo.id'), nullable=False)
    descripcion = Column(Text)
    recursos = Column(Text)
    resultado_esperado = Column(Text)
    modulo = relationship("Modulo", back_populates="contenidos")