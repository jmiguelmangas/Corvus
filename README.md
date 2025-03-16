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
- API Backend: http://localhost:8001
- Documentación API: http://localhost:8001/docs

## Desarrollo

### Convenciones de Código

- Backend: Seguimos PEP 8 y utilizamos Black para formateo
- Frontend: Seguimos las guías de estilo de ESLint y Prettier
- Commits: Seguimos la convención de Conventional Commits

### Flujo de Trabajo Git y CI/CD

1. Crear una rama desde `main` para cada feature/fix
2. Nombrar las ramas siguiendo el patrón:
   - `feat/nombre-feature`
   - `fix/nombre-fix`
   - `docs/nombre-documentacion`
   - `ci/nombre-cambio`
   - `refactor/nombre-refactor`

3. Commits deben seguir el formato Conventional Commits:
   ```
   <tipo>: <descripción>

   [cuerpo opcional]

   [pie opcional]
   ```
   Tipos permitidos: build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test

4. Crear Pull Request para revisión
   - Requiere al menos 1 aprobación
   - Todos los hilos de discusión deben estar resueltos
   - Los tests y el linting deben pasar

5. Merge a `main` después de aprobación
   - Se permiten merge, squash y rebase
   - La rama debe estar actualizada con main
   - No se permiten push forzados ni eliminación de la rama main

## Testing y CI/CD

### Backend
```bash
cd backend
# Ejecutar tests con cobertura
pytest --cov=corvus tests/

# Ejecutar linting
black .
isort .
flake8 .
```

### Frontend
```bash
cd frontend
# Ejecutar tests
npm test

# Ejecutar tests con watch mode
npm run test:watch

# Verificar tipos de TypeScript
npm run type-check

# Ejecutar linting
npm run lint

# Corregir problemas de linting automáticamente
npm run lint:fix
```

### Integración Continua
Cada pull request activa automáticamente:
1. Ejecución de tests de backend y frontend
2. Verificación de tipos TypeScript
3. Linting de código Python y TypeScript
4. Verificación del formato de commits

Todos estos checks deben pasar antes de que se pueda hacer merge a main.

## Documentación

- [Documentación de API](http://localhost:8000/docs)
- [Guía de Contribución](./CONTRIBUTING.md)
- [Arquitectura](./docs/ARCHITECTURE.md)

## Licencia

Este proyecto está bajo la licencia MIT.
