from datetime import datetime
from typing import Any, Dict, Optional

from pydantic import BaseModel, ConfigDict

from ..models.connector import ConnectorStatus, ConnectorType


class ConnectorBase(BaseModel):
    name: str
    description: Optional[str] = None
    type: ConnectorType
    config: Dict[str, Any]


class ConnectorCreate(ConnectorBase):
    pass


class ConnectorUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    config: Optional[Dict[str, Any]] = None
    status: Optional[ConnectorStatus] = None


class ConnectorResponse(ConnectorBase):
    id: int
    status: ConnectorStatus
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
