from fastapi import APIRouter
from .user import user_router
from .token import token_router
from .charge_station import charge_station_router


v1_router = APIRouter(prefix="/v1")

v1_router.include_router(user_router)
v1_router.include_router(token_router)
v1_router.include_router(charge_station_router)
