# Barber App - Frontend

###  Aplicación web desarrollada para la gestión de turnos en una barbería. Permite a clientes reservar turnos, a barberos administrar su disponibilidad y servicios, y a administradores gestionar el sistema completo.


### 🚀 Tecnologías utilizadas
- Next.js 16
- React
- TypeScript
- TailwindCSS
- Redux Toolkit
- Formik + Yup
- Fetch API

### 📌 Funcionalidades principales
👤 Clientes
- Registro e inicio de sesión
- Reserva de turnos
- Visualización de turnos activos e historial

✂️ Barberos
- Configuración de disponibilidad semanal
- Selección de servicios ofrecidos
- Visualización de agenda (turnos activos e historial)
🛠️ Administrador

- Gestión de servicios
- Control de usuarios
- Visualización general del sistema

📅 Sistema de turnos
- Prevención de conflictos de horarios
- Separación entre turnos activos e historial
- Estados de turno:
Activo ,
Cancelado y
Finalizado

🎯 Características destacadas

- UI responsive (mobile-first)
- Manejo de estados global con Redux
- Formularios validados con Formik + Yup
- Feedback visual mediante Toasts
- Manejo de errores en frontend
- Paginación en historial de turnos


--- 

### 📂 Estructura del proyecto
```js
/app
/components
  /ui
    /organisms
    /molecules
    /atoms
/lib
  /redux
/types
/validations
```
--- 

### ⚙️ Instalación y uso
1. Clonar repositorio
```bash
git clone https://github.com/tu-usuario/tu-repo.git
```


2. Instalar dependencias
```bash
npm install
```


3. Variables de entorno
Crear un archivo .env.local:
```bash
NEXT_PUBLIC_API_URL=http://localhost:3002
```


4. Ejecutar en desarrollo
```bash
npm run dev
```

🌐 Backend

Este proyecto depende de una API REST desarrollada en Node.js.

👉 Asegurate de tener el backend corriendo en:

```bash
http://localhost:3002
```

### 🔐 Autenticación

El sistema utiliza autenticación basada en cookies (con credenciales incluidas en fetch).

### 📱 Responsive Design

La aplicación está optimizada para:

- Desktop
- Tablet
- Mobile

### 🧠 Decisiones técnicas
- Arquitectura basada en componentes reutilizables
- Separación clara entre lógica y UI
- Estado global centralizado con Redux
- Uso de DTOs tipados para consistencia

### 🚧 Mejoras futuras
- Login con Google
- Notificaciones (email / WhatsApp)
- Dashboard con métricas
- Pagos online
- Sistema de reseñas
- WebSockets para actualizaciones en tiempo real
- Endpoints dinamicos

### 👨‍💻 Autor

Desarrollado por Diego Canales

Este proyecto es de uso personal / portfolio.