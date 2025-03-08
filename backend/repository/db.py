from peewee import SqliteDatabase
from repository.schemas import LoginSchema, UserSchema, ChargeStationSchema


def get_db(database_name: str) -> SqliteDatabase:
    """Get connection to database"""
    db = SqliteDatabase(database_name)
    db.connect()
    return db


def init_db(db: SqliteDatabase):
    db.create_tables([UserSchema, LoginSchema, ChargeStationSchema])
    db.close()
