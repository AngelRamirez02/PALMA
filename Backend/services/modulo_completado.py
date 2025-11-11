from sqlalchemy.orm import Session

from models.modulo_completado import ModuloCompletado
from schemas.modulo_completado import ModuloCompletadoBase

def get_modulosCompletados_User(id_usuario:int, db:Session):
    """
    Obtiene los modulos que ha completado el usuario
    """
    return db.query(ModuloCompletado).filter(ModuloCompletado.id_usuario==id_usuario).all()


def set_modulo_completado(data:ModuloCompletadoBase, db:Session):
    """
    Registrar el modulo que ha completado el usuario
    """
    db_modulo_completado = ModuloCompletado(
        id_modulo = data.id_modulo,
        id_usuario = data.id_usuario
        )
    db.add(db_modulo_completado)
    db.commit()
    db.refresh(db_modulo_completado)
    return db_modulo_completado
