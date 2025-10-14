from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    """
    Configuraciones de la aplicación leídas desde variables de entorno.
    Al no tener valores por defecto, Pydantic se asegurará de que estas
    variables existan en el archivo .env.
    """
    
    # --- Configuración de la base de datos ---
    DATABASE_URL: str

    # --- Configuración de JWT (JSON Web Tokens) ---
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    # Configuración para que Pydantic lea desde un archivo .env
    # Esta es la nueva forma de hacerlo en Pydantic v2.
    # Pydantic buscará un archivo llamado ".env" en el directorio
    # desde donde se ejecute la aplicación.
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding='utf-8')

# Se crea una instancia de la clase Settings que será importada en otros módulos.
settings = Settings()