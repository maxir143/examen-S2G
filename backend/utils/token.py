from typing import Optional
from uuid import uuid4
from datetime import datetime, timezone, timedelta
from pydantic import BaseModel
from jose import jwt
from config import Settings
from models.annotated import StrUUID
from repository.users import get_user


class _Token(BaseModel):
    id: StrUUID
    sub: str
    email: str
    iat: float
    exp: float
    active_exp: Optional[float] = None


settings = Settings()


def session_token(
    user_id: str,
    email: str,
    active: bool = True,
) -> str:
    created_at = datetime.now(timezone.utc)
    expires_at = created_at + timedelta(minutes=settings.TOKEN_EXPIRATION_MINUTES)
    refresh_expires_at = created_at + timedelta(
        minutes=settings.REFRESH_TOKEN_EXPIRATION_MINUTES
    )
    token_id = uuid4()
    token = _Token(
        id=token_id,
        sub=user_id,
        email=email,
        iat=created_at.timestamp(),
        exp=refresh_expires_at.timestamp(),
        active_exp=expires_at.timestamp() if active else None,
    )
    return jwt.encode(token.model_dump(), settings.TOKEN_SECRET_KEY, algorithm="HS256")


def extract_token(token_string: str) -> _Token:
    token = jwt.decode(token_string, settings.TOKEN_SECRET_KEY, algorithms=["HS256"])
    return _Token(**token)


def validate_token(token_string: str) -> _Token:
    token = extract_token(token_string)

    if not token.active_exp:
        raise ValueError(detail="Token is not active")

    if token.active_exp < datetime.now(timezone.utc).timestamp():
        raise ValueError(detail="Token is expired")

    user = get_user(token.email)

    if not user:
        raise ValueError(detail="User not found")

    if str(user.token_id) != str(token.id):
        raise ValueError(detail="Token is not valid, please login again")

    return token
