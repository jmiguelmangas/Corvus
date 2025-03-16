from uuid import uuid4

import pytest
from fastapi.testclient import TestClient

from corvus.models.connector import ConnectorStatus, ConnectorType


# Helper para generar IDs únicos
def generate_unique_id():
    return str(uuid4())


def test_create_connector(client):
    response = client.post(
        "/api/connectors/",
        json={
            "name": f"Test Connector Create {generate_unique_id()}",
            "description": "Test Description",
            "type": "postgresql",
            "config": {
                "host": "localhost",
                "port": 5432,
                "database": "corvus",
                "user": "corvus",
                "password": "corvus",
            },
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert "Test Connector Create" in data["name"]
    assert data["type"] == "postgresql"
    assert data["status"] == ConnectorStatus.CONFIGURING
    assert "id" in data


def test_list_connectors(client):
    # Crear un conector primero
    create_response = client.post(
        "/api/connectors/",
        json={
            "name": f"Test Connector List {generate_unique_id()}",
            "type": "postgresql",
            "config": {
                "host": "localhost",
                "port": 5432,
                "database": "corvus",
                "user": "corvus",
                "password": "corvus",
            },
        },
    )
    assert create_response.status_code == 200

    response = client.get("/api/connectors/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    # Verificar que al menos uno de los conectores tiene el nombre esperado
    assert any("Test Connector List" in connector["name"] for connector in data)
    assert data[0]["type"] == "postgresql"


def test_test_connector(client):
    # Crear un conector
    create_response = client.post(
        "/api/connectors/",
        json={
            "name": f"Test Connector Test {generate_unique_id()}",
            "type": "postgresql",
            "config": {
                "host": "localhost",
                "port": 5432,
                "database": "corvus",
                "user": "corvus",
                "password": "corvus",
            },
        },
    )
    assert create_response.status_code == 200
    data = create_response.json()
    assert "id" in data
    connector_id = data["id"]

    # Intentar probar la conexión
    response = client.post(f"/api/connectors/{connector_id}/test")
    assert response.status_code in [200, 400]  # Puede fallar si no hay BD disponible

    # Verificar que el estado del conector se actualiza
    get_response = client.get(f"/api/connectors/{connector_id}")
    assert get_response.status_code == 200
    connector = get_response.json()
    assert connector["status"] in [ConnectorStatus.ACTIVE, ConnectorStatus.ERROR, ConnectorStatus.CONFIGURING]
