from passlib.context import CryptContext

# Creamos una instancia de CryptContext.
# Le decimos qué algoritmos de hashing usar, en este caso, "bcrypt".
# "deprecated="auto"" se encargará de actualizar los hashes si en el futuro
# decidimos usar un algoritmo más nuevo.
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifica si una contraseña en texto plano coincide con una hasheada.
    """
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """
    Genera el hash de una contraseña en texto plano.
    """
    return pwd_context.hash(password)