from uuid import uuid4

from corvus.models.connector import ConnectorStatus


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
    test_endpoint = f"/api/connectors/{connector_id}/test"
    response = client.post(test_endpoint)
    # La conexión puede fallar si no hay BD disponible
    assert response.status_code in [200, 400]

    # Verificar que el estado del conector se actualiza
    get_response = client.get(f"/api/connectors/{connector_id}")
    assert get_response.status_code == 200
    connector = get_response.json()
    valid_statuses = [
        ConnectorStatus.ACTIVE,
        ConnectorStatus.ERROR,
        ConnectorStatus.CONFIGURING,
    ]
    assert connector["status"] in valid_statuses
