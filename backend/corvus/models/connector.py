from datetime import datetime
from typing import Optional
from sqlalchemy import Column, Integer, String, DateTime, JSON, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import relationship
import enum

from ..config.database import Base

class ConnectorType(str, enum.Enum):
    POSTGRESQL = "postgresql"
    MYSQL = "mysql"
    MONGODB = "mongodb"
    ELASTICSEARCH = "elasticsearch"
    REST_API = "rest_api"

class ConnectorStatus(str, enum.Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    ERROR = "error"
    CONFIGURING = "configuring"

class Connector(Base):
    """Modelo para los conectores de fuentes de datos."""
    __tablename__ = "connectors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    description = Column(String, nullable=True)
    type = Column(SQLEnum(ConnectorType))
    config = Column(JSON)
    status = Column(SQLEnum(ConnectorStatus), default=ConnectorStatus.CONFIGURING)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relaciones
    data_sources = relationship("DataSource", back_populates="connector")

class DataSource(Base):
    """Modelo para las fuentes de datos específicas dentro de un conector."""
    __tablename__ = "data_sources"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    connector_id = Column(Integer, ForeignKey("connectors.id"))
    schema = Column(JSON)  # Esquema de la fuente de datos
    source_metadata = Column(JSON)  # Metadatos adicionales
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relaciones
    connector = relationship("Connector", back_populates="data_sources")
