from typing import Annotated
from fastapi import APIRouter, Header
from models.response import SuccessResponse
from utils.token import validate_token

list_router = APIRouter(prefix="/list")


class _Response(SuccessResponse):
    pass


@list_router.get("", response_model=_Response)
def _list(x_token: Annotated[str | None, Header()] = None):
    token = validate_token(x_token)

    return _Response(message="Charge stations")
