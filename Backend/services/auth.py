from sqlalchemy.orm import Session

from schemas.usuario import UserCreate
from models.usuario import Usuario
from core.security import get_password_hash

def get_users(db: Session):
    """Obtiene todos los usuarios de la base de datos."""
    return db.query(Usuario).all()

def get_user_by_id(db: Session, id: int):
    """Obtiene un usuario por su ID."""
    return db.query(Usuario).filter(Usuario.id == id).first()

def get_user_by_email(db: Session, email: str):
    """Obtiene un usuario por su dirección de email."""
    return db.query(Usuario).filter(Usuario.email == email).first()

# --- CAMBIO 2: Actualizar la firma de la función ---
# La función ahora espera un objeto 'user' del tipo 'UserCreate'.
# FastAPI se encargará de que los datos que lleguen aquí ya hayan pasado
# las validaciones definidas en UserCreate (ej. longitud de la contraseña).
def create_user(db: Session, user: UserCreate):
    """
    Crea un nuevo usuario en la base de datos con la contraseña hasheada.
    """
    #hashed_password = get_password_hash(user.password)
    
    db_user = Usuario(
        nombres=user.nombres,
        apellido_paterno=user.apellido_paterno,
        apellido_materno=user.apellido_materno,
        fecha_nacimiento=user.fecha_nacimiento,
        sexo=user.sexo,
        email=user.email,
        hashed_password=user.password  # Se guarda el hash, no la contraseña original
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
