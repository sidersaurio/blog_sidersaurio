# El Blog del Sidersaurio

Un blog moderno y renovado con tecnología de punta, construido con Astro, TypeScript, Tailwind CSS, Supabase y Resend.

## ✨ Características

- **Tema Oscuro/Claro** - Sistema de temas con transiciones suaves
- **Autenticación** - Sign up, Sign in, y recuperación de contraseña con Supabase
- **Formulario de Contacto** - Integración con Resend para envío de emails
- **Responsive** - Diseño mobile-first completamente adaptable
- **Tech/Developer Aesthetic** - Diseño moderno con gradientes y componentes pulidos
- **Rendimiento** - Generado estáticamente con Astro

## 🚀 Quick Start

### Requisitos previos

- Node.js 18+
- npm, yarn, pnpm o bun

### Instalación

1. **Instalar dependencias**

```bash
npm install
```

2. **Configurar variables de entorno**

Copia `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

Necesitarás:
- **Supabase**: Crea un proyecto en [supabase.com](https://supabase.com)
- **Resend**: Obtén una API key en [resend.com](https://resend.com)

3. **Ejecutar en desarrollo**

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🔧 Configuración de Supabase

### Crear las tablas necesarias

1. Ve a tu dashboard de Supabase
2. Abre SQL Editor
3. Ejecuta el siguiente SQL:

```sql
-- Crear tabla para mensajes de contacto
CREATE TABLE contact_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Configurar RLS (Row Level Security)

```sql
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert contact messages"
ON contact_messages
FOR INSERT
WITH CHECK (true);
```

## 📁 Estructura del Proyecto

```
src/
├── api/                    # Endpoints API
│   └── contact.ts         # Endpoint para contacto
├── components/            # Componentes Astro
│   ├── Header.astro
│   ├── Footer.astro
│   ├── ThemeToggle.astro
│   └── ContactForm.astro
├── pages/                 # Páginas
│   ├── index.astro
│   ├── contact.astro
│   └── auth/
│       ├── signup.astro
│       ├── signin.astro
│       └── forgot-password.astro
├── styles/               # Estilos globales
└── utils/               # Funciones auxiliares
```

## 🎨 Personalización

### Cambiar los colores

Edita `src/styles/global.css`:

```css
:root {
  --accent-purple: #7c3aed;
  --accent-blue: #3b82f6;
  --accent-neon: #00ff88;
}
```

## 📚 Comandos

```bash
npm run dev        # Servidor de desarrollo
npm run build      # Construir para producción
npm run preview    # Previsualizar build
```

## 🌐 Desplegar en Vercel

1. Push a GitHub
2. Conecta el repositorio en [vercel.com](https://vercel.com)
3. Añade las variables de entorno
4. ¡Desplegado automáticamente!

---

Desarrollado por Antonio Molina @2026
