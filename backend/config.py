from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PORT: int = 8000
    HOST: str = "0.0.0.0"
    DATABASE_NAME: str
    TOKEN_SECRET_KEY: str
    TOKEN_EXPIRATION_MINUTES: int = 60
    REFRESH_TOKEN_EXPIRATION_MINUTES: int = 60 * 24 * 7
    BASE_PATH: str = "/api"

    model_config = SettingsConfigDict(env_file=".env")
