import pytest
from fastapi.testclient import TestClient
from corvus.models.connector import ConnectorType, ConnectorStatus

def test_create_connector(client):
    response = client.post(
        "/api/connectors/",
        json={
            "name": "Test Connector",
            "description": "Test Description",
            "type": "postgresql",
            "config": {
                "host": "localhost",
                "port": 5432,
                "database": "test_db",
                "user": "test_user",
                "password": "test_password"
            }
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Test Connector"
    assert data["type"] == "postgresql"
    assert data["status"] == "configuring"

def test_list_connectors(client):
    # Crear un conector primero
    client.post(
        "/api/connectors/",
        json={
            "name": "Test Connector",
            "type": "postgresql",
            "config": {
                "host": "localhost",
                "port": 5432,
                "database": "test_db",
                "user": "test_user",
                "password": "test_password"
            }
        },
    )
    
    response = client.get("/api/connectors/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) > 0
    assert data[0]["name"] == "Test Connector"

def test_test_connector(client):
    # Crear un conector
    create_response = client.post(
        "/api/connectors/",
        json={
            "name": "Test Connector",
            "type": "postgresql",
            "config": {
                "host": "localhost",
                "port": 5432,
                "database": "test_db",
                "user": "test_user",
                "password": "test_password"
            }
        },
    )
    connector_id = create_response.json()["id"]
    
    # Intentar probar la conexión
    response = client.post(f"/api/connectors/{connector_id}/test")
    assert response.status_code in [200, 400]  # Puede fallar si no hay BD disponible
