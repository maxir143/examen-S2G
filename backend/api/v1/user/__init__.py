from fastapi import APIRouter
from .login import login_router
from .sign_up import sign_up_router


user_router = APIRouter(prefix="/user", tags=["USER"])

user_router.include_router(login_router)
user_router.include_router(sign_up_router)
