from sqlalchemy.orm import Session

from models.modulo import Modulo
from models.contenido_modulo import ContenidoModulo

def get_modulos(db:Session):
    """
    Obtiene todos los modulos de la base de datos
    """
    return db.query(Modulo).all()

def get_contenidoModulo(db:Session, id_modulo:int):
    """
    Obtiene tood el contenido de un modulo
    """
    return db.query(ContenidoModulo).filter(ContenidoModulo.id_modulo == id_modulo).all()

def get_experiencia_modulo(id_modulo:int, db:Session):
    """
    Obtiene la experiencia de determinado modulo
    """
    return db.query(Modulo.experiencia).filter(Modulo.id == id_modulo).scalar()