from fastapi import APIRouter, HTTPException
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


class _Response(SuccessResponse):
    pass


@charge_station_router.get("/{id}", response_model=_Response)
def _get(id: StrUUID, x_token: Annotated[str | None, Header()] = None):
    token = validate_token(x_token)
    charge_stations = get_charge_stations(user_id=token.sub, id=id)
    if len(charge_stations) == 0:
        raise HTTPException(detail="user have no charge stations", status_code=404)
    return _Response(
        message="Charge station found", data={"charge_station": charge_stations[0]}
    )


@charge_station_router.get("/list", response_model=_Response)
def _list(x_token: Annotated[str | None, Header()] = None):
    token = validate_token(x_token)
    charge_stations = get_charge_stations(user_id=token.sub)
    if len(charge_stations) == 0:
        raise HTTPException(detail="user have no charge stations", status_code=404)
    return _Response(
        message="Charge station found", data={"charge_stations": charge_stations}
    )


@charge_station_router.put(
    "/{id}", response_model=_Response, response_model_exclude_none=True
)
def _update(
    id: StrUUID,
    body: ChargeStationPartialModel,
    x_token: Annotated[str | None, Header()] = None,
):
    token = validate_token(x_token)
    updated_station = update_charge_station(id, token.sub, body)
    if not updated_station:
        raise Exception("The charge station could not be updated")
    return _Response(message="Charge station updated")


@charge_station_router.post("", response_model=_Response)
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
            user_id=token.sub,
        )
    )
    if not created_station:
        raise Exception("The charge station could not be created")
    return _Response(
        message="Charge station created",
        data={"charge_station": created_station.model_dump()},
    )
