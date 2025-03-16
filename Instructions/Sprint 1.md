# Sprint 1: Fundamentos y Arquitectura Base

## Guía Detallada de Tareas e Instrucciones

**Duración:** 2 semanas  
**Objetivo:** Establecer la estructura base del proyecto Corvus y sus componentes core

---

## Tareas para DevOps

### 1. Configuración de Repositorio y Entornos

**Estimación:** 1 día

- Crear repositorio Git en GitHub/GitLab con estructura inicial
- Configurar protecciones de rama (main protegida, requiere PR)
- Crear README.md con descripción del proyecto e instrucciones iniciales
- Configurar .gitignore para Python, React y entornos locales

### 2. Configuración de Entornos de Desarrollo

**Estimación:** 2 días

- Crear Docker Compose para entorno de desarrollo local con:
    - Contenedor para API Python (FastAPI)
    - Base de datos PostgreSQL para metadatos
    - Base de datos de prueba para conectores
    - Neo4j para Knowledge Graph
- Documentar proceso de instalación en README.md
- Verificar que los contenedores se comunican correctamente

### 3. Implementación de CI/CD Básico

**Estimación:** 2 días

- Configurar pipeline CI en GitHub Actions/GitLab CI con:
    - Verificación de formato de código (black, flake8)
    - Ejecución de tests unitarios
    - Build de contenedores Docker
- Crear scripts para despliegue en entorno de desarrollo
- Documentar proceso de CI/CD

### 4. Preparación de Entorno de Testing

**Estimación:** 1 día

- Configurar base de datos de test con datos de muestra
- Preparar scripts de inicialización para tests de integración
- Configurar herramientas de coverage de tests

---

## Tareas para Desarrolladores Backend

### 1. Estructura Base del Proyecto Backend

**Estimación:** 1 día

- Crear estructura de directorios Python siguiendo estructura propuesta:
    
    Copiar
    
    `corvus/ ├── config/ ├── connectors/ ├── api/ ├── models/ ├── security/ ├── etl/ ├── metadata/ └── utils/`
    
- Configurar pyproject.toml o setup.py para dependencias
- Definir estándares de codificación (docstrings, typing)

### 2. Implementación de API Base

**Estimación:** 2 días

- Configurar FastAPI con estructura base
- Implementar healthcheck endpoint (/api/health)
- Configurar middleware para logging, CORS, etc.
- Implementar estructura de rutas para cada módulo
- Documentar API con OpenAPI/Swagger

### 3. Definición de Modelos Básicos

**Estimación:** 3 días

- Implementar modelos SQLAlchemy para:
    - Conectores (tipo, configuración, estado)
    - Fuentes de datos (conexión a conectores)
    - Usuarios y permisos básicos
    - Metadatos de tablas/colecciones
    - Registros de trabajos (jobs)
- Crear migraciones iniciales con Alembic
- Agregar docstrings completos a todos los modelos

### 4. Pruebas Unitarias Base

**Estimación:** 2 días

- Configurar pytest para tests unitarios
- Implementar fixtures para testing
- Crear tests para modelos y endpoints básicos
- Configurar cobertura de código y reportes

---

## Tareas para Desarrolladores Frontend

### 1. Estructura Base del Proyecto Frontend

**Estimación:** 1 día

- Inicializar proyecto React con TypeScript usando Create React App o Vite
- Configurar ESLint y Prettier
- Definir estructura de directorios:
    
    Copiar
    
    `src/ ├── api/ ├── components/ ├── pages/ ├── context/ ├── hooks/ ├── utils/ └── types/`
    
- Crear README con instrucciones de desarrollo

### 2. Configuración de UI Base

**Estimación:** 2 días

- Integrar Material UI o biblioteca de componentes elegida
- Crear componentes base reutilizables:
    - Layout principal con sidebar y header
    - Tablas con ordenación y paginación
    - Formularios y validación
    - Componentes de alerta/notificación
- Implementar tema básico con colores del proyecto

### 3. Conexión con API Backend

**Estimación:** 1 día

- Configurar cliente HTTP (axios o fetch)
- Crear estructura para llamadas a API
- Implementar interceptores para manejo de errores
- Configurar tipos TypeScript para respuestas de API

### 4. Página de Dashboard Inicial

**Estimación:** 1 día

- Crear página de dashboard vacía
- Implementar navegación básica
- Conectar con endpoint de healthcheck
- Añadir placeholder para componentes futuros

### 5. Hooks para API y Context

**Estimación:** 1 día

- Crear hooks personalizados para operaciones comunes
- Implementar context para estados globales
- Configurar gestión de autenticación básica
- Implementar manejo de errores consistente

---

## Tareas para Arquitecto/Líder Técnico

### 1. Documentación de Arquitectura Detallada

**Estimación:** 3 días

- Crear diagrama detallado de arquitectura de componentes
- Documentar flujo de datos entre componentes
- Definir interfaces entre módulos del sistema
- Documentar decisiones de arquitectura (ADRs)

### 2. Definición de Contratos de API

**Estimación:** 2 días

- Definir contratos OpenAPI para todos los endpoints planeados
- Crear documentación de referencia de API
- Definir estándares de respuesta (errores, paginación, etc.)

### 3. Plan de Pruebas

**Estimación:** 1 día

- Definir estrategia de pruebas (unitarias, integración, e2e)
- Crear templates para casos de prueba
- Definir métricas de calidad y cobertura

### 4. Coordinación de Sprint y Definición de DoD

**Estimación:** 1 día

- Establecer reuniones diarias de sincronización
- Definir criterios de "Definición de Terminado" (DoD)
- Preparar demo de fin de sprint
- Coordinar resolución de impedimentos

---

## Instrucciones Detalladas por Rol

### Para DevOps:

1. **Docker Compose específico:**
    
    yaml
    
    Copiar
    
    `version: '3.8' services:   corvus-api:    build: ./backend    ports:      - "8000:8000"    environment:      - DATABASE_URL=postgresql://corvus:corvus@postgres:5432/corvus      - NEO4J_URI=bolt://neo4j:7687      - DEBUG=true    volumes:      - ./backend:/app    depends_on:      - postgres      - neo4j     postgres:    image: postgres:14    environment:      - POSTGRES_USER=corvus      - POSTGRES_PASSWORD=corvus      - POSTGRES_DB=corvus    ports:      - "5432:5432"    volumes:      - postgres-data:/var/lib/postgresql/data     neo4j:    image: neo4j:4.4    environment:      - NEO4J_AUTH=neo4j/corvus    ports:      - "7474:7474"      - "7687:7687"    volumes:      - neo4j-data:/data volumes:   postgres-data:  neo4j-data:`
    
2. **CI Pipeline (GitHub Actions):**
    
    yaml
    
    Copiar
    
    `name: Corvus CI on:   push:    branches: [ main, develop ]  pull_request:    branches: [ main, develop ] jobs:   backend-tests:    runs-on: ubuntu-latest    steps:      - uses: actions/checkout@v3      - name: Set up Python        uses: actions/setup-python@v4        with:          python-version: '3.10'      - name: Install dependencies        run: |          cd backend          pip install -e ".[dev]"      - name: Lint        run: |          cd backend          black --check .          flake8      - name: Test        run: |          cd backend          pytest --cov=corvus   frontend-tests:    runs-on: ubuntu-latest    steps:      - uses: actions/checkout@v3      - name: Set up Node        uses: actions/setup-node@v3        with:          node-version: '16'      - name: Install dependencies        run: |          cd frontend          npm install      - name: Lint        run: |          cd frontend          npm run lint      - name: Test        run: |          cd frontend          npm test`
    

### Para Desarrolladores Backend:

1. **Estructura de proyecto FastAPI:** Archivo principal `backend/corvus/api/main.py`:
    
    python
    
    Copiar
    
    `from fastapi import FastAPI, Depends from fastapi.middleware.cors import CORSMiddleware from .routes import connectors, datasources, metadata, security from .middleware.logging import LoggingMiddleware app = FastAPI(     title="Corvus API",    description="API para Proyecto Corvus - Plataforma de datos para IA",    version="0.1.0" ) # Configurar CORS app.add_middleware(     CORSMiddleware,    allow_origins=["*"],  # En producción limitar a orígenes conocidos    allow_credentials=True,    allow_methods=["*"],    allow_headers=["*"], ) # Añadir middleware de logging app.add_middleware(LoggingMiddleware) # Añadir rutas app.include_router(connectors.router, prefix="/api/connectors", tags=["connectors"]) app.include_router(datasources.router, prefix="/api/datasources", tags=["datasources"]) app.include_router(metadata.router, prefix="/api/metadata", tags=["metadata"]) app.include_router(security.router, prefix="/api/security", tags=["security"]) @app.get("/api/health", tags=["health"]) async def health_check():     return {"status": "ok", "version": "0.1.0"}`
    
2. **Modelo base SQLAlchemy:** `backend/corvus/models/connector.py`:
    
    python
    
    Copiar
    
    `from datetime import datetime from typing import Optional, Dict, Any from sqlalchemy import Column, Integer, String, DateTime, JSON, Boolean from sqlalchemy.orm import relationship from .base import Base class Connector(Base):     """    Modelo para almacenar información sobre los conectores disponibles.         Attributes:        id (int): Identificador único del conector        name (str): Nombre descriptivo del conector        connector_type (str): Tipo de conector (postgresql, mysql, rest_api, etc.)        config (Dict): Configuración específica del conector en formato JSON        is_enabled (bool): Indica si el conector está habilitado        created_at (datetime): Fecha y hora de creación        updated_at (datetime): Fecha y hora de última actualización        datasources (relationship): Relación con las fuentes de datos que usan este conector    """    __tablename__ = "connectors"     id = Column(Integer, primary_key=True, index=True)    name = Column(String(255), nullable=False)    connector_type = Column(String(50), nullable=False)    config = Column(JSON, nullable=False, default={})    is_enabled = Column(Boolean, default=True, nullable=False)    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)     datasources = relationship("DataSource", back_populates="connector")     def __repr__(self) -> str:        return f"<Connector(id={self.id}, name='{self.name}', type='{self.connector_type}')>"`
    
3. **Ejemplo de test unitario:** `backend/tests/api/test_health.py`:
    
    python
    
    Copiar
    
    `from fastapi.testclient import TestClient from corvus.api.main import app client = TestClient(app) def test_health_check():     """Test que el endpoint de health check responde correctamente."""    response = client.get("/api/health")    assert response.status_code == 200    assert response.json() == {"status": "ok", "version": "0.1.0"}`
    

### Para Desarrolladores Frontend:

1. **Configuración de cliente API:** `frontend/src/api/client.ts`:
    
    typescript
    
    Copiar
    
    `import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'; // Crear instancia base de axios const apiClient: AxiosInstance = axios.create({   baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',  headers: {    'Content-Type': 'application/json',  },  timeout: 10000, }); // Interceptor para requests apiClient.interceptors.request.use(   (config: AxiosRequestConfig) => {    // Aquí se pueden añadir tokens de autenticación    return config;  },  (error: AxiosError) => {    return Promise.reject(error);  } ); // Interceptor para respuestas apiClient.interceptors.response.use(   (response: AxiosResponse) => {    return response;  },  (error: AxiosError) => {    // Manejo centralizado de errores    if (error.response) {      // Error del servidor con respuesta      console.error('API Error:', error.response.data);    } else if (error.request) {      // Error sin respuesta (network)      console.error('Network Error:', error.message);    } else {      // Otros errores      console.error('Error:', error.message);    }    return Promise.reject(error);  } ); export default apiClient;`
    
2. **Componente Layout básico:** `frontend/src/components/layout/MainLayout.tsx`:
    
    tsx
    
    Copiar
    
    ``import React, { ReactNode, useState } from 'react'; import { AppBar, Box, CssBaseline, Drawer, IconButton, Toolbar, Typography } from '@mui/material'; import MenuIcon from '@mui/icons-material/Menu'; import Sidebar from './Sidebar'; interface MainLayoutProps {   children: ReactNode;  title?: string; } const drawerWidth = 240; const MainLayout: React.FC<MainLayoutProps> = ({ children, title = 'Corvus' }) => {   const [mobileOpen, setMobileOpen] = useState(false);   const handleDrawerToggle = () => {    setMobileOpen(!mobileOpen);  };   return (    <Box sx={{ display: 'flex' }}>      <CssBaseline />             {/* App Bar */}      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>        <Toolbar>          <IconButton            color="inherit"            aria-label="open drawer"            edge="start"            onClick={handleDrawerToggle}            sx={{ mr: 2, display: { sm: 'none' } }}          >            <MenuIcon />          </IconButton>          <Typography variant="h6" noWrap component="div">            {title}          </Typography>        </Toolbar>      </AppBar>             {/* Sidebar para móvil */}      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>        <Drawer          variant="temporary"          open={mobileOpen}          onClose={handleDrawerToggle}          sx={{            display: { xs: 'block', sm: 'none' },            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },          }}        >          <Sidebar />        </Drawer>                 {/* Sidebar para desktop */}        <Drawer          variant="permanent"          sx={{            display: { xs: 'none', sm: 'block' },            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },          }}          open        >          <Sidebar />        </Drawer>      </Box>             {/* Contenido principal */}      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>        <Toolbar /> {/* Espaciado para compensar AppBar */}        {children}      </Box>    </Box>  ); }; export default MainLayout;``
    
3. **Hooks para API y Context**:
    
    typescript
    
    Copiar
    
    `// frontend/src/hooks/useAuth.ts import { useState, useCallback } from 'react'; import apiClient from '../api/client'; import { User } from '../types/auth'; export const useAuth = () => {   const [user, setUser] = useState<User | null>(null);  const [loading, setLoading] = useState(false);  const [error, setError] = useState<string | null>(null);     const login = useCallback(async (username: string, password: string) => {    setLoading(true);    setError(null);    try {      const response = await apiClient.post('/api/auth/login', { username, password });      setUser(response.data);      return response.data;    } catch (err) {      setError('Error de autenticación. Verifique sus credenciales.');      throw err;    } finally {      setLoading(false);    }  }, []);     const logout = useCallback(async () => {    setLoading(true);    try {      await apiClient.post('/api/auth/logout');      setUser(null);    } catch (err) {      setError('Error al cerrar sesión');      throw err;    } finally {      setLoading(false);    }  }, []);     return { user, loading, error, login, logout }; };`
    
    typescript
    
    Copiar
    
    `// frontend/src/context/AuthContext.tsx import React, { createContext, useContext, useState, ReactNode } from 'react'; import { User } from '../types/auth'; import { useAuth as useAuthHook } from '../hooks/useAuth'; interface AuthContextType {   user: User | null;  loading: boolean;  error: string | null;  login: (username: string, password: string) => Promise<any>;  logout: () => Promise<void>; } const AuthContext = createContext<AuthContextType | undefined>(undefined); export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {   const auth = useAuthHook();     return (    <AuthContext.Provider value={auth}>      {children}    </AuthContext.Provider>  ); }; export const useAuth = () => {   const context = useContext(AuthContext);  if (context === undefined) {    throw new Error('useAuth must be used within an AuthProvider');  }  return context; };`
    

## Definición de Terminado (DoD)

Para considerar una tarea como completada, debe cumplir los siguientes criterios:

1. **Código**:
    - Implementado según los requisitos
    - Pasa todos los linters configurados
    - Incluye documentación de código (docstrings, comentarios)
    - Sigue las convenciones de estilo del proyecto
2. **Testing**:
    - Incluye tests unitarios con cobertura >80%
    - Todos los tests pasan exitosamente
    - Incluye casos de prueba tanto positivos como negativos
3. **Revisión**:
    - Código revisado por al menos un miembro del equipo
    - Comentarios de revisión resueltos
    - Aprobado para merge
4. **Documentación**:
    - Documentación técnica actualizada (si aplica)
    - README actualizado con nuevas instrucciones (si aplica)
    - API documentada si se añaden/modifican endpoints
5. **Integración**:
    - Código integrado en la rama de desarrollo
    - Pasa el pipeline de CI
    - No introduce regresiones

## Demo de Fin de Sprint

Para la demo de fin de sprint, preparar:

1. Instancia funcional del entorno de desarrollo con todos los componentes
2. Demostración del endpoint de healthcheck funcionando
3. Visualización de la estructura del proyecto (backend y frontend)
4. Ejecución de tests para demostrar calidad del código
5. Demostración del pipeline CI/CD funcionando

Esta demo debe ser accesible para stakeholders no técnicos, explicando el valor de esta fase de fundamentos para el éxito del proyecto.

## Estructura de dependencias y versionado

### Para el backend (Python), crear un archivo `pyproject.toml`:

toml

Copiar

`[build-system] requires = ["setuptools>=42", "wheel"] build-backend = "setuptools.build_meta" [project] name = "corvus" version = "0.1.0" description = "Corvus Data Platform for AI" readme = "README.md" authors = [     {name = "Your Team", email = "team@example.com"} ] [project.optional-dependencies] dev = [     "pytest>=7.0.0",    "pytest-cov>=4.0.0",    "black>=22.3.0",    "flake8>=4.0.1",    "mypy>=0.942", ] [tool.black] line-length = 88 target-version = ["py39", "py310"] include = '\.pyi?$' [tool.pytest.ini_options] minversion = "7.0" testpaths = ["tests"]`

### Para el frontend (React), un `package.json` bien definido:

json

Copiar

`{   "name": "corvus-ui",  "version": "0.1.0",  "private": true,  "dependencies": {    "@emotion/react": "^11.10.5",    "@emotion/styled": "^11.10.5",    "@mui/icons-material": "^5.11.0",    "@mui/material": "^5.11.0",    "axios": "^1.2.1",    "react": "^18.2.0",    "react-dom": "^18.2.0",    "react-router-dom": "^6.5.0",    "react-scripts": "5.0.1",    "typescript": "^4.9.4"  },  "devDependencies": {    "@testing-library/jest-dom": "^5.16.5",    "@testing-library/react": "^13.4.0",    "@testing-library/user-event": "^14.4.3",    "@types/jest": "^29.2.4",    "@types/node": "^18.11.17",    "@types/react": "^18.0.26",    "@types/react-dom": "^18.0.9",    "eslint": "^8.30.0",    "eslint-plugin-react": "^7.31.11",    "eslint-plugin-react-hooks": "^4.6.0",    "prettier": "^2.8.1"  },  "scripts": {    "start": "react-scripts start",    "build": "react-scripts build",    "test": "react-scripts test",    "eject": "react-scripts eject",    "lint": "eslint src --ext .js,.jsx,.ts,.tsx",    "format": "prettier --write 'src/**/*.{js,jsx,ts,tsx,json,css,md}'"  },  "browserslist": {    "production": [      ">0.2%",      "not dead",      "not op_mini all"    ],    "development": [      "last 1 chrome version",      "last 1 firefox version",      "last 1 safari version"    ]  } }`

## Configuraciones de Linting y Formato

### Para el backend, crear un archivo `.flake8`:

Copiar

`[flake8] max-line-length = 88 extend-ignore = E203 exclude = .git,__pycache__,build,dist`

### Para el frontend, crear un archivo `.eslintrc.js`:

javascript

Copiar

`module.exports = {   root: true,  parser: '@typescript-eslint/parser',  plugins: ['@typescript-eslint', 'react-hooks'],  extends: [    'eslint:recommended',    'plugin:@typescript-eslint/recommended',    'plugin:react/recommended',    'plugin:react-hooks/recommended',  ],  settings: {    react: {      version: 'detect',    },  },  rules: {    'react/react-in-jsx-scope': 'off',    'react/prop-types': 'off',  }, };`

## Estructura de directorios completa recomendada

Copiar

`/ ├── backend/ │   ├── corvus/ │   │   ├── __init__.py │   │   ├── api/ │   │   ├── config/ │   │   ├── connectors/ │   │   ├── models/ │   │   ├── schemas/ │   │   ├── services/ │   │   └── utils/ │   ├── tests/ │   ├── pyproject.toml │   └── README.md ├── frontend/ │   ├── public/ │   ├── src/ │   │   ├── api/ │   │   ├── assets/ │   │   ├── components/ │   │   ├── context/ │   │   ├── hooks/ │   │   ├── pages/ │   │   ├── types/ │   │   └── utils/ │   ├── package.json │   └── README.md ├── devops/ │   ├── docker/ │   │   ├── backend/ │   │   └── frontend/ │   ├── k8s/ │   └── test-data/ ├── docker-compose.yml └── README.md`

## Consideraciones finales para el Sprint 1

1. **Puesta en marcha rápida**: Asegúrate de documentar un proceso de "quick start" para que nuevos desarrolladores puedan configurar el entorno fácilmente.
2. **Estándares de código**: Establece claramente las convenciones de código y asegúrate de que estén documentadas.
3. **Git Flow**: Define el flujo de trabajo con Git (protección de ramas, convenciones de commits, proceso de PR).
4. **Logging centralizado**: Implementa un sistema de logging estructurado desde el principio.
5. **Métricas de calidad**: Establece métricas claras para la calidad del código y los objetivos de cobertura de pruebas.

Este enfoque asegurará que el Sprint 1 establezca una base sólida no solo para la funcionalidad, sino también para las prácticas de desarrollo que garantizarán el éxito del proyecto a largo plazo.