from datetime import datetime, timezone
from typing import Optional
from models.charge_station import ChargeStationModel, ChargeStationPartialModel
from repository.schemas import ChargeStationSchema


def create_charge_station(
    charge_station: ChargeStationPartialModel,
) -> ChargeStationModel:
    new_station: ChargeStationSchema = ChargeStationSchema.create(
        user_email=charge_station.user_email,
        name=charge_station.name,
        lat=charge_station.lat,
        long=charge_station.long,
        capacity=charge_station.capacity,
        active=charge_station.active,
        updated_at=charge_station.updated_at,
    )

    return ChargeStationModel(**new_station.__dict__["__data__"])


def update_charge_station(
    id: str, user_email: str, charge_station: ChargeStationPartialModel
) -> bool:
    charge_station.updated_at = datetime.now(tz=timezone.utc)
    row_affected = (
        ChargeStationSchema.update(
            charge_station.model_dump(exclude_none=True, exclude_unset=True)
        )
        .where(ChargeStationSchema.id == id)
        .execute()
    )
    return bool(row_affected)


def get_charge_stations(
    user_email: str, id: Optional[str] = None, limit: int = 100
) -> ChargeStationModel:

    stations = (
        ChargeStationSchema.select()
        .limit(limit)
        .order_by(ChargeStationSchema.updated_at.desc())
        .execute()
    )

    if id:
        stations = (
            ChargeStationSchema.select()
            .where(
                ChargeStationSchema.id == id,
            )
            .execute()
        )

    return [ChargeStationModel(**station.__dict__["__data__"]) for station in stations]


def delete_charge_stations():
    ChargeStationSchema.delete().execute()
