FROM python:3.10-slim

WORKDIR /app

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Instalar poetry
RUN pip install poetry

# Copiar archivos de configuración
COPY pyproject.toml poetry.lock* ./

# Configurar poetry para no crear entorno virtual
RUN poetry config virtualenvs.create false

# Instalar dependencias
RUN poetry install --no-dev --no-interaction --no-ansi

# Copiar el código
COPY . .

# Exponer puerto
EXPOSE 8000

# Comando para ejecutar la aplicación
CMD ["poetry", "run", "uvicorn", "corvus.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
