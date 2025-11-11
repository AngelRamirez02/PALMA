from sqlalchemy import Column, Integer, DateTime, ForeignKey,func
from sqlalchemy.orm import relationship
from db.database import Base

class ModuloCompletado(Base):
    __tablename__ = 'modulo_completado'
    id = Column(Integer, primary_key=True, index= True)
    id_modulo = Column(Integer,ForeignKey('modulo.id'))
    id_usuario = Column(Integer,ForeignKey('usuario.id'))
    fecha_completado = Column(
        DateTime(timezone=True),
        default=func.now(),      
        nullable=False          
    )

    usuario = relationship("Usuario",back_populates="modulos_completados")