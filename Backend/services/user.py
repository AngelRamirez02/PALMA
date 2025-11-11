from sqlalchemy.orm import Session

from models.usuario import Usuario

def get_experiencia_user(id_user:int, db:Session):
    """
    Obtiene la experiencia actual del usuario ¿
    """
    return db.query(Usuario.experiencia).filter(Usuario.id==id_user).scalar()

def set_experiencia_user(id_user:int, experiencia_ganada:int,db:Session):
    #Obtener la experiencia actual del usuario
    experiencia_actual = get_experiencia_user(id_user, db)
    #calcular nueva experiencia
    nueva_experiencia = experiencia_actual + experiencia_ganada

    db_user = db.query(Usuario).filter(Usuario.id == id_user).first()

    if db_user:
        db_user.experiencia = nueva_experiencia
        db.commit()
        db.refresh(db_user)
        return {"id":db_user.id,
                "email":db_user.email,
                "experiencia":db_user.experiencia}
    else:
        return None
