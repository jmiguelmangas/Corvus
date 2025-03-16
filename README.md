# Proyecto Corvus

Corvus es una plataforma de gestión y análisis de datos que permite la integración y exploración eficiente de múltiples fuentes de datos.

## Estructura del Proyecto

```
corvus/
├── backend/
│   ├── config/
│   ├── connectors/
│   ├── api/
│   ├── models/
│   ├── security/
│   ├── etl/
│   ├── metadata/
│   └── utils/
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── types/
└── docker/
    ├── backend/
    ├── frontend/
    └── db/
```

## Requisitos

- Docker y Docker Compose
- Python 3.10+
- Node.js 18+
- PostgreSQL 15+
- Neo4j 5+

## Configuración del Entorno de Desarrollo

1. Clonar el repositorio:
```bash
git clone https://github.com/yourusername/corvus.git
cd corvus
```

2. Configurar el entorno backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # En Windows: .\venv\Scripts\activate
pip install -r requirements.txt
```

3. Configurar el entorno frontend:
```bash
cd frontend
npm install
```

4. Iniciar el entorno con Docker Compose:
```bash
docker-compose up -d
```

5. Acceder a la aplicación:
- Frontend: http://localhost:3000
- API Backend: http://localhost:8000
- Documentación API: http://localhost:8000/docs

## Desarrollo

### Convenciones de Código

- Backend: Seguimos PEP 8 y utilizamos Black para formateo
- Frontend: Seguimos las guías de estilo de ESLint y Prettier
- Commits: Seguimos la convención de Conventional Commits

### Flujo de Trabajo Git

1. Crear una rama desde `main` para cada feature/fix
2. Nombrar las ramas siguiendo el patrón:
   - `feature/nombre-feature`
   - `fix/nombre-fix`
   - `docs/nombre-documentacion`
3. Crear Pull Request para revisión
4. Merge a `main` después de aprobación

## Testing

### Backend
```bash
cd backend
pytest
```

### Frontend
```bash
cd frontend
npm test
```

## Documentación

- [Documentación de API](http://localhost:8000/docs)
- [Guía de Contribución](./CONTRIBUTING.md)
- [Arquitectura](./docs/ARCHITECTURE.md)

## Licencia

Este proyecto está bajo la licencia MIT.
