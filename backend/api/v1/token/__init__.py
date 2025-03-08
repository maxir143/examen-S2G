from fastapi import APIRouter
from .refresh import refresh_router


token_router = APIRouter(prefix="/token", tags=["TOKEN"])


token_router.include_router(refresh_router)
