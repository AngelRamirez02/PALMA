from sqlalchemy import Column, Integer, String, Date
from db.database import Base

class Usuario(Base):
    __tablename__ = 'usuario' #Nombre de la tyabla en la base de datos

    id = Column(Integer, primary_key=True, index=True)
    nombres = Column(String(100))
    apellido_paterno = Column(String(100))
    apellido_materno = Column(String(100))
    fecha_nacimiento = Column(Date)
    sexo = Column(String(10))
    email = Column(String(80), unique=True, index=True)
    hashed_password = Column(String(255))