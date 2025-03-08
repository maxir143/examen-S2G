from datetime import datetime
from fastapi import APIRouter, HTTPException, Query
from typing import Annotated
from fastapi import APIRouter, Header
from models.annotated import StrUUID
from models.charge_station import ChargeStationModel, ChargeStationPartialModel
from models.response import SuccessResponse
from repository.charge_stations import (
    create_charge_station,
    get_charge_stations,
    update_charge_station,
)
from utils.token import validate_token


charge_station_router = APIRouter(prefix="/change-station", tags=["CHARGE_STATION"])


class _ListResponse(SuccessResponse):
    charge_stations: list[ChargeStationModel]


@charge_station_router.get("/list", response_model=_ListResponse)
def _list(
    x_token: Annotated[str | None, Header()] = None,
    limit: int = Query(100, ge=1, le=1000),
):
    token = validate_token(x_token)
    charge_stations = get_charge_stations(user_email=token.email, limit=limit)
    if len(charge_stations) == 0:
        raise HTTPException(detail="user have no charge stations", status_code=404)
    print(charge_stations[0])
    return _ListResponse(
        message="Charge station found", charge_stations=charge_stations
    )


class _GetResponse(SuccessResponse):
    charge_station: ChargeStationModel


@charge_station_router.get("/{id}", response_model=_GetResponse)
def _get(id: StrUUID, x_token: Annotated[str | None, Header()] = None):
    token = validate_token(x_token)
    charge_stations = get_charge_stations(user_email=token.email)
    if len(charge_stations) == 0:
        raise HTTPException(detail="user have no charge stations", status_code=404)
    return _GetResponse(
        message="Charge station found", charge_station=charge_stations[0]
    )


@charge_station_router.put(
    "/{id}", response_model=SuccessResponse, response_model_exclude_none=True
)
def _update(
    id: StrUUID,
    body: ChargeStationPartialModel,
    x_token: Annotated[str | None, Header()] = None,
):
    token = validate_token(x_token)
    body.updated_at = datetime.now()
    updated_station = update_charge_station(
        id=id, user_email=token.email, charge_station=body
    )
    if not updated_station:
        raise ValueError("The charge station could not be updated")
    return SuccessResponse(message="Charge station updated")


class _PostResponse(SuccessResponse):
    charge_station: ChargeStationModel


@charge_station_router.post("", response_model=_PostResponse)
def _create(
    body: ChargeStationPartialModel, x_token: Annotated[str | None, Header()] = None
):
    token = validate_token(x_token)
    created_station = create_charge_station(
        ChargeStationModel(
            active=body.active,
            capacity=body.capacity,
            lat=body.lat,
            long=body.long,
            name=body.name,
            user_email=token.email,
        )
    )
    if not created_station:
        raise Exception("The charge station could not be created")
    return _PostResponse(
        message="Charge station created", charge_station=created_station
    )
