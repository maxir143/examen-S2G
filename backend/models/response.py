import uuid
from pydantic import BaseModel, ConfigDict, Field
from models.annotated import StrUUID


class _BaseResponse(BaseModel):
    operation: StrUUID = Field(default_factory=uuid.uuid4)


class ErrorResponse(_BaseResponse):
    error: str = Field(
        description="Description of the error",
        examples=["This error occurred because..."],
    )


class SuccessResponse(_BaseResponse):
    message: str = Field("Success operation", description="Operation details")
    model_config = ConfigDict(extra="allow")
