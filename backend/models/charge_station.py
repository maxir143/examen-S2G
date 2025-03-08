from datetime import datetime
from typing import Optional
import uuid
from pydantic import BaseModel, Field
from models.annotated import IsoStrDatetime, StrUUID


class ChargeStationModel(BaseModel):
    id: StrUUID = Field(
        default_factory=uuid.uuid4,
        description="Unique identifier for the charge station",
        example="123e4567-e89b-12d3-a456-426614174000",
    )
    user_email: str = Field(
        None,
        description="Identifier of the user who owns the charge station",
        example="example@domain.com",
    )
    name: str = Field(
        None, description="Name of the charge station", example="Main Street Station"
    )
    lat: float = Field(
        0.0,
        description="Latitude of the charge station location",
        example=40.712776,
        ge=-90.0,
        le=90.0,
    )
    long: float = Field(
        0.0,
        description="Longitude of the charge station location",
        example=-74.005974,
        ge=-180.0,
        le=180.0,
    )
    capacity: int = Field(0, description="Capacity of the charge station", example=10)
    active: bool = Field(
        False,
        description="Status of the charge station, whether it is active or not",
        example=True,
    )
    created_at: IsoStrDatetime = Field(
        default_factory=datetime.now,
        description="Timestamp when the charge station was created",
        example="2023-10-01T12:00:00Z",
    )
    updated_at: IsoStrDatetime = Field(
        default_factory=datetime.now,
        description="Timestamp when the charge station was last updated",
        example="2023-10-01T12:00:00Z",
    )


class ChargeStationPartialModel(BaseModel):
    user_email: Optional[str] = Field(
        None,
        description="Identifier of the user who owns the charge station",
        example="example@domain.com",
    )
    name: Optional[str] = Field(
        None, description="Name of the charge station", example="Main Street Station"
    )
    lat: Optional[float] = Field(
        0.0,
        description="Latitude of the charge station location",
        example=40.712776,
        ge=-90.0,
        le=90.0,
    )
    long: Optional[float] = Field(
        0.0,
        description="Longitude of the charge station location",
        example=-74.005974,
        ge=-180.0,
        le=180.0,
    )
    capacity: Optional[int] = Field(
        0, description="Capacity of the charge station", example=10
    )
    active: Optional[bool] = Field(
        False,
        description="Status of the charge station, whether it is active or not",
        example=True,
    )
    updated_at: Optional[IsoStrDatetime] = Field(
        default_factory=datetime.now,
        description="Timestamp when the charge station was last updated",
        example="2023-10-01T12:00:00Z",
    )
