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

    return ChargeStationModel(**new_station.__dict__)


def update_charge_station(
    id: str, user_email: str, charge_station: ChargeStationPartialModel
) -> bool:
    row_affected = (
        ChargeStationSchema.update(
            charge_station.model_dump(exclude_none=True, exclude_unset=True)
        )
        .where(
            ChargeStationSchema.id == id, ChargeStationSchema.user_email == user_email
        )
        .execute()
    )
    return bool(row_affected)


def get_charge_stations(
    user_email: str, id: Optional[str] = None, limit: int = 100
) -> ChargeStationModel:
    print(id)
    stations = (
        ChargeStationSchema.select()
        .where(ChargeStationSchema.user_email == user_email)
        .limit(limit)
        .execute()
    )

    if id:
        stations = (
            ChargeStationSchema.select()
            .where(
                ChargeStationSchema.user_email == user_email,
                ChargeStationSchema.id == id,
            )
            .execute()
        )

    return [ChargeStationModel(**station.__dict__) for station in stations]


def delete_charge_stations():
    ChargeStationSchema.delete().execute()
