import datetime
from datetime import datetime, timezone
import uuid
from peewee import (
    Model,
    CharField,
    DateTimeField,
    ForeignKeyField,
    UUIDField,
    IntegerField,
    FloatField,
    BooleanField,
)
from repository.schemas.user import UserSchema
from config import Settings
from peewee import SqliteDatabase

settings = Settings()


class ChargeStationModel(Model):
    id = UUIDField(primary_key=True, default=uuid.uuid4)
    user_id = ForeignKeyField(UserSchema, backref="charge_stations", field="id")
    name = CharField(max_length=50)
    lat = FloatField(default=0.0)
    long = FloatField(default=0.0)
    capacity = IntegerField(default=0)
    active = BooleanField(default=False)
    created_at = DateTimeField(default=datetime.now(tz=timezone.utc))
    updated_at = DateTimeField(default=datetime.now(tz=timezone.utc))

    class Meta:
        table_name = "login_records"
        database = SqliteDatabase(settings.DATABASE_NAME)
