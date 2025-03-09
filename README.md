# Examen S2G energy

## Descripción del Proyecto

> Se requiere el diseño y desarrollo de una aplicación web para la gestión de estaciones de
> carga de vehículos eléctricos y la visualización de datos en tiempo real.

## Objetivos del Caso

- Frontend: Implementado en Next.js (React), con una interfaz responsiva e interactiva.
- Backend: Desarrollado en Python con FastAPI, asegurando alta eficiencia en la
  manipulación de datos.

## Requerimientos Específicos

### Backend

- [x] autenticación mediante JWT
- [x] Registrar una estación de carga con los siguientes datos: Nombre, Ubicación, Capacidad máxima en kW, Estado actual (activo/inactivo).
- [x] Consultar la lista de estaciones de carga.
- [x] Actualizar el estado de una estación.
- [x] Proporcionar datos para visualizaciones.
- [ ] Configurar un endpoint con APScheduler para cambiar automáticamente el estado de una estación después de un periodo de tiempo determinado.

### Frontend

- [ ] Mostrar la lista de estaciones de carga.
- [x] Permitir el registro de nuevas estaciones.
- [x] Actualizar el estado de una estación en tiempo real.
- [ ] Incluir al menos una gráfica interactiva con un filtro.
- [ ] Cada vez que se cambia el filtro, debe realizarse una solicitud al backend para obtener los datos filtrados.

## Criterios de Evaluación

- Calidad del código: Legibilidad, modularidad y buenas prácticas.
- Organización del proyecto: Estructura clara y mantenible.
- Documentación: Explicaciones precisas y fáciles de seguir.
- Implementación de requerimientos: Cumplimiento de los puntos básicos y extra.
- Comprensión de la experiencia de usuario (UX):
  - Flujo del usuario.
  - Tipos de usuarios y niveles de acceso.
- Adecuaciones, mejoras o innovaciones propuestas para optimizar la solución.

## Instalación del proyecto

### Requisitos

- Docker
- Git

### Levantar proyecto con docker

1. Descargar el proyecto con el comando `git clone https://github.com/maxir143/examen-S2G.git`.

2. Ingresa a la carpeta `cd examen-S2G`.

3. Revisar el documento **docker-compose.yaml** y corroborar que las variables de entorno sean las deseadas.

4. Ingresar el comando `docker compose build` y esperar a que la instalación de ambos módulos finalice.

5. Ingresar el comando `docker compose up -d` y verificar que ambos contenedores corran exitosamente.

6. Visitar el frontend desplegado en [localhost](http://localhost:3005/).

> Para mas información sobre la documentación técnica de la api visitar [documentación](http://localhost:3004/api/docs).
