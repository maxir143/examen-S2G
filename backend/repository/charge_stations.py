from typing import Optional
from models.charge_station import ChargeStationModel, ChargeStationPartialModel
from repository.schemas import ChargeStationSchema, UserSchema


def create_charge_station(charge_station: ChargeStationModel) -> ChargeStationModel:
    new_station: ChargeStationSchema = ChargeStationSchema.create(
        id=charge_station.id,
        user_id=charge_station.user_id,
        name=charge_station.name,
        lat=charge_station.lat,
        long=charge_station.long,
        capacity=charge_station.capacity,
        active=charge_station.active,
        created_at=charge_station.created_at,
        updated_at=charge_station.updated_at,
    )

    return ChargeStationModel(**new_station.__dict__)


def update_charge_station(
    id: str, user_id: str, charge_station: ChargeStationPartialModel
) -> bool:
    row_affected = (
        ChargeStationSchema.update(charge_station.model_dump()).where(
            ChargeStationSchema.id == id, ChargeStationSchema.user_id == user_id
        )
    ).execute()

    return bool(row_affected)


def get_charge_stations(user_id: str, id: Optional[str] = None) -> ChargeStationModel:
    stations = (
        ChargeStationSchema.select()
        .where(ChargeStationSchema.user_id == user_id)
        .execute()
    )

    if id:
        stations = (
            ChargeStationSchema.select()
            .where(ChargeStationSchema.user_id == user_id, ChargeStationSchema.id == id)
            .execute()
        )

    return [ChargeStationModel(**station.__dict__) for station in stations]
