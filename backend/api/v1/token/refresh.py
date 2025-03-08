from typing import Annotated
from fastapi import APIRouter, HTTPException, Header
from models.common import TokenPayload
from models.response import SuccessResponse
from repository.users import get_user
from utils.token import extract_token, session_token


refresh_router = APIRouter(prefix="/refresh")


class _Response(SuccessResponse):
    data: TokenPayload


@refresh_router.get("", response_model=_Response)
def _token_refresh(x_token: Annotated[str | None, Header()] = None):
    try:
        token = extract_token(x_token)
    except ValueError:
        raise HTTPException(status_code=401, detail="Token is not valid")

    if not token.active_exp:
        raise HTTPException(status_code=403, detail="Token is not active")

    user = get_user(token.email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    new_token = session_token(str(user.id), user.email, active=True)

    new_token_object = extract_token(new_token)

    return SuccessResponse(
        message="Token refreshed successfully", data=TokenPayload(token=new_token)
    )
