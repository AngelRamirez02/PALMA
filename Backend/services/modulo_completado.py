from sqlalchemy.orm import Session

from models.modulo_completado import ModuloCompletado
from schemas.modulo_completado import ModuloCompletadoBase

def get_modulosCompletados_User(id_usuario:int, db:Session):
    """
    Obtiene los modulos que ha completado el usuario
    """
    return db.query(ModuloCompletado).filter(ModuloCompletado.id_usuario==id_usuario).all()

def verificar_moduloCompletado(data:ModuloCompletadoBase, db:Session):
    """
    Verifica si el usuario ya cuenta con ese modulo completado
    """
    db_modulo_completado = db.query(ModuloCompletado).filter(ModuloCompletado.id_modulo==data.id_modulo , 
                                                            ModuloCompletado.id_usuario == data.id_usuario).all()
    #Si hay un registro regresa verdadero sino falso
    if db_modulo_completado:
        return True
    else:
        return False


def set_modulo_completado(data:ModuloCompletadoBase, db:Session):
    """
    Registrar el modulo que ha completado el usuario
    """
    if verificar_moduloCompletado(data, db):#Si el usuario ya cuenta con ese modoulo completado, mensaje de repaso
        return {
            "mensaje": "Repaso del modulo"
        }
    db_modulo_completado = ModuloCompletado(
        id_modulo = data.id_modulo,
        id_usuario = data.id_usuario
        )
    db.add(db_modulo_completado)
    db.commit()
    db.refresh(db_modulo_completado)
    return db_modulo_completado
