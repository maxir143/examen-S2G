from typing import Annotated, Union
from uuid import UUID
from datetime import datetime
from pydantic import PlainSerializer, PlainValidator, WithJsonSchema


StrUUID = Annotated[
    UUID,
    PlainSerializer(str, return_type=str),
    PlainValidator(
        lambda x: UUID(x, version=4) if isinstance(x, str) else x,
        json_schema_input_type=Union[str, UUID],
    ),
    WithJsonSchema(
        {
            "type": "string",
            "format": "uuid",
            "description": "UUID v4",
        },
        mode="serialization",
    ),
]


IsoStrDatetime = Annotated[
    datetime,
    PlainSerializer(
        lambda x: x.isoformat(sep="T", timespec="seconds"),
        return_type=str,
    ),
    PlainValidator(
        lambda x: datetime.fromisoformat(x) if isinstance(x, str) else x,
        json_schema_input_type=Union[str, datetime],
    ),
    WithJsonSchema(
        {
            "type": "string",
            "format": "date-time",
            "description": "ISO 8601 formatted datetime",
        },
        mode="serialization",
    ),
]
