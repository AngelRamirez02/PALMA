from sqlalchemy.orm import Session

from models.modulo import Modulo

def get_modulos(db:Session):
    """
    Obtiene todos los modulos de la base de datos
    """
    return db.query(Modulo).all()