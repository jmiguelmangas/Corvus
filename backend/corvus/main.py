from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api.routes import connectors
from .config.database import Base, engine

# Crear tablas en la base de datos
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Corvus API",
    description="API para la plataforma de gestión y análisis de datos Corvus",
    version="0.1.0",
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
    ],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir rutas
app.include_router(connectors.router, prefix="/api/connectors", tags=["connectors"])


@app.get("/api/health")
async def health_check():
    """Endpoint de verificación de salud del servicio"""
    return {"status": "healthy", "version": "0.1.0"}
