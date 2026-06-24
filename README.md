# 🗓️ Gesti — Gestor de Turnos

Aplicación web para la gestión de turnos y reservas de actividades deportivas y recreativas.  
Desarrollada como Trabajo Práctico Integrador para la materia **Desarrollo de Sistemas Web (FrontEnd)**.

**IFTS N° 11 — Tecnicatura Superior en Desarrollo de Software**  
Docente: Federico Balbuena | 2026 — 1° cuatrimestre  
Autora: **Zoe Vivas**

---

## 🚀 ¿Qué es Gesti?

Gesti permite a un administrador crear actividades con sus horarios y profesores, y a los alumnos reservar su lugar en la actividad que prefieran. Todo queda registrado en una base de datos en la nube y se puede visualizar en un calendario mensual interactivo.

---

## ✨ Funcionalidades

- **Reserva de turnos** — formulario paso a paso para que el alumno elija actividad, horario y confirme su lugar
- **Calendario mensual** — vista de todas las reservas del mes con FullCalendar
- **Historial de reservas** — listado completo con opción de cancelación
- **Panel administrativo** — crear, editar y eliminar actividades y turnos
- **Persistencia en la nube** — datos guardados en MongoDB Atlas

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| Angular 17+ | Framework frontend (standalone components) |
| TypeScript | Lenguaje principal |
| RxJS | Manejo de estado reactivo con BehaviorSubject |
| FullCalendar | Visualización del calendario |
| HTML + CSS | Templates y estilos personalizados |

---

## 📁 Estructura del proyecto

```
src/app/
├── modules/
│   ├── feature/
│   │   ├── home/               # Página de bienvenida
│   │   ├── admin/              # Panel administrativo
│   │   ├── calendar/           # Vista de calendario
│   │   ├── historial-reservas/ # Historial de reservas
│   │   └── registro-reserva/   # Formulario de reserva
│   ├── shared/
│   │   ├── buttons/            # Botón reutilizable
│   │   ├── card/               # Contenedor card
│   │   ├── custom-input/       # Input con label
│   │   ├── custom-table/       # Tabla con headers dinámicos
│   │   └── navbar/             # Navegación lateral
│   ├── services/
│   │   ├── reserva.service.ts  # CRUD de reservas + estado reactivo
│   │   └── actividad.service.ts # CRUD de actividades y turnos
│   └── interfaces/
│       ├── reserva.interface.ts
│       ├── actividad.interface.ts
│       └── turno.interface.ts
```

---

## ⚙️ Cómo correr el proyecto

### Requisitos previos
- Node.js instalado
- Angular CLI instalado (`npm install -g @angular/cli`)

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/ZoevivasDev/GestiBackend.git

# 2. Instalar dependencias
npm install

# 3. Correr el servidor de desarrollo
ng serve
```

La app estará disponible en `http://localhost:4200`

> ⚠️ Para que funcione completamente necesitás tener el backend corriendo en `http://localhost:3000`.  
> Repositorio del backend: [GestiBackend](https://github.com/ZoevivasDev/GestiBackend)

---

## 🔗 Conexión con el Backend

La app consume una API REST propia desarrollada en Node.js + Express + MongoDB.

| Endpoint | Método | Descripción |
|---|---|---|
| `/api/actividades` | GET | Obtener todas las actividades con sus turnos |
| `/api/actividades` | POST | Crear actividad y turno |
| `/api/actividades/:id` | DELETE | Eliminar actividad y sus turnos |
| `/api/turnos/:id` | PUT | Editar un turno |
| `/api/reservas` | GET | Obtener todas las reservas |
| `/api/reservas` | POST | Crear una reserva |
| `/api/reservas/:id` | DELETE | Cancelar una reserva |

---

## 📚 Conceptos aplicados de la materia

- Arquitectura basada en componentes standalone
- Property binding, event binding y two-way binding
- Servicios e inyección de dependencias
- Routing con lazy loading
- Formularios reactivos con validaciones
- Consumo de APIs con HttpClient
- Estructuras de control `@if` y `@for`
- Comunicación entre componentes con `@Input` y `@Output`
