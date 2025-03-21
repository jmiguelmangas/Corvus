from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime
from ..models.connector import ConnectorType, ConnectorStatus

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

    class Config:
        from_attributes = True
