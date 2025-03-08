from fastapi import APIRouter
from typing import Annotated
from fastapi import APIRouter, Header
from models.response import SuccessResponse
from utils.token import validate_token
from .list import list_router

charge_station_router = APIRouter(prefix="/change-station", tags=["CHARGE_STATION"])

charge_station_router.include_router(list_router)


class _Response(SuccessResponse):
    pass


@charge_station_router.get("", response_model=_Response)
def _get(x_token: Annotated[str | None, Header()] = None):
    token = validate_token(x_token)

    return _Response(message="Charge station")


@charge_station_router.post("", response_model=_Response)
def _create(x_token: Annotated[str | None, Header()] = None):
    token = validate_token(x_token)

    return _Response(message="Charge station created")


@charge_station_router.put("", response_model=_Response)
def _update(x_token: Annotated[str | None, Header()] = None):
    token = validate_token(x_token)

    return _Response(message="Charge station updated")
