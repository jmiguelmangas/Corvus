from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import create_engine, text
from sqlalchemy.orm import Session

from ...config.database import SessionLocal
from ...models.connector import Connector, ConnectorStatus, ConnectorType
from ...schemas.connector import ConnectorCreate, ConnectorResponse, ConnectorUpdate

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/", response_model=List[ConnectorResponse])
async def list_connectors(db: Session = Depends(get_db)):
    """Obtener lista de todos los conectores."""
    return db.query(Connector).all()


@router.post("/", response_model=ConnectorResponse)
async def create_connector(
    connector: ConnectorCreate,
    db: Session = Depends(get_db),
):
    """Crear un nuevo conector."""
    db_connector = Connector(**connector.model_dump())
    db.add(db_connector)
    db.commit()
    db.refresh(db_connector)
    return db_connector


@router.get("/{connector_id}", response_model=ConnectorResponse)
async def get_connector(
    connector_id: int,
    db: Session = Depends(get_db),
):
    """Obtener detalles de un conector específico."""
    connector = db.query(Connector).filter(Connector.id == connector_id).first()
    if not connector:
        raise HTTPException(status_code=404, detail="Conector no encontrado")
    return connector


@router.put("/{connector_id}", response_model=ConnectorResponse)
async def update_connector(
    connector_id: int,
    connector: ConnectorUpdate,
    db: Session = Depends(get_db),
):
    """Actualizar un conector existente."""
    db_connector = db.query(Connector).filter(Connector.id == connector_id).first()
    if not db_connector:
        raise HTTPException(status_code=404, detail="Conector no encontrado")

    for field, value in connector.dict(exclude_unset=True).items():
        setattr(db_connector, field, value)

    db.commit()
    db.refresh(db_connector)
    return db_connector


@router.delete("/{connector_id}")
async def delete_connector(connector_id: int, db: Session = Depends(get_db)):
    """Eliminar un conector."""
    connector = db.query(Connector).filter(Connector.id == connector_id).first()
    if not connector:
        raise HTTPException(status_code=404, detail="Conector no encontrado")

    db.delete(connector)
    db.commit()
    return {"message": "Conector eliminado"}


@router.post("/{connector_id}/test")
async def test_connector(connector_id: int, db: Session = Depends(get_db)):
    """Probar la conexión de un conector."""
    connector = db.query(Connector).filter(Connector.id == connector_id).first()
    if not connector:
        raise HTTPException(status_code=404, detail="Conector no encontrado")

    try:
        config = connector.config
        if connector.type == ConnectorType.POSTGRESQL:
            user = config.get("user")
            password = config.get("password")
            host = config.get("host")
            port = config.get("port")
            database = config.get("database")
            connection_string = (
                f"postgresql://{user}:{password}@{host}:{port}/{database}"
            )
            engine = create_engine(connection_string)
            with engine.connect() as connection:
                connection.execute(text("SELECT 1"))

            # Actualizar estado a activo
            connector.status = ConnectorStatus.ACTIVE
            db.commit()
            db.refresh(connector)
            return {"message": "Conexión exitosa", "status": "active"}
    except Exception as e:
        # Si hay error, mantener estado en configuring
        connector.status = ConnectorStatus.CONFIGURING
        db.commit()
        raise HTTPException(status_code=400, detail=f"Error de conexión: {str(e)}")
