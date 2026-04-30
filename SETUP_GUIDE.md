# Guía de Configuración - Autenticación Supabase

Esta guía te ayudará a configurar la autenticación de Supabase para El Blog del Sidersaurio.

## 1. Crear Proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Espera a que se inicialice (puede tomar unos minutos)

## 2. Obtener Credenciales

1. En el dashboard de Supabase, ve a **Settings > API**
2. Copia estos valores:
   - **Project URL** → `PUBLIC_SUPABASE_URL`
   - **anon public key** → `PUBLIC_SUPABASE_ANON_KEY`

## 3. Configurar Variables de Entorno

En tu archivo `.env.local`:

```
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 4. Crear Tablas de Base de Datos

### Tabla de Mensajes de Contacto

Ve a **SQL Editor** en Supabase y ejecuta:

```sql
CREATE TABLE contact_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Configurar Row Level Security (RLS)

```sql
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Permitir a todos insertar mensajes
CREATE POLICY "Allow anyone to insert"
ON contact_messages
FOR INSERT
WITH CHECK (true);

-- Permitir a usuarios autenticados leer
CREATE POLICY "Allow authenticated users to view"
ON contact_messages
FOR SELECT
USING (auth.role() = 'authenticated');
```

## 5. Configurar Autenticación por Email

1. En **Authentication > Providers**, verifica que **Email** está habilitado
2. Ve a **Email Templates** si quieres personalizar los emails
3. Configura el dominio en **Authentication > URL Configuration**

## 6. Configurar Resend para Emails Transaccionales

### Crear Cuenta en Resend

1. Ve a [resend.com](https://resend.com)
2. Crea una cuenta
3. Obtén tu **API Key**

### Configurar Variables

En `.env.local`:

```
RESEND_API_KEY=re_your_api_key
PUBLIC_RESEND_FROM_EMAIL=noreply@yourdomain.com
CONTACT_EMAIL=contact@yourdomain.com
```

### Verificar Dominio (Producción)

Para producción, necesitas verificar tu dominio en Resend:

1. Ve a **Domains** en Resend
2. Añade tu dominio
3. Sigue las instrucciones DNS
4. Usa tu dominio verificado en `PUBLIC_RESEND_FROM_EMAIL`

## 7. Probar la Configuración

### Test del Formulario de Contacto

1. Inicia el servidor: `npm run dev`
2. Ve a `http://localhost:3000/contact`
3. Completa y envía el formulario
4. Verifica que:
   - El mensaje se guardó en Supabase
   - Recibiste un email en `CONTACT_EMAIL`
   - El usuario recibió email de confirmación

### Test de Autenticación

1. Ve a `http://localhost:3000/auth/signup`
2. Crea una cuenta
3. Verifica el email
4. Intenta iniciar sesión en `/auth/signin`

## 8. Desplegar en Vercel

### Añadir Variables en Vercel

1. Ve a tu proyecto en [vercel.com](https://vercel.com)
2. **Settings > Environment Variables**
3. Añade todas las variables de `.env.local`:
   - `PUBLIC_SUPABASE_URL`
   - `PUBLIC_SUPABASE_ANON_KEY`
   - `RESEND_API_KEY`
   - `PUBLIC_RESEND_FROM_EMAIL`
   - `CONTACT_EMAIL`

### Configurar URL en Supabase

Actualiza la URL de tu sitio en Supabase:

1. **Authentication > URL Configuration**
2. Añade tu URL de Vercel:
   - Redirect URLs: `https://yourdomain.com/auth/callback`
   - Site URL: `https://yourdomain.com`

## Solución de Problemas

### "Invalid API Key"

- Verifica que copió la clave completa sin espacios
- Asegúrate de usar `anon` key, no `service_role` key

### "Table does not exist"

- Verifica que ejecutaste el SQL para crear la tabla
- Comprueba el nombre exacto en el editor SQL de Supabase

### Emails no llegan

- Verifica que `CONTACT_EMAIL` es correcto
- Comprueba spam/promotions
- En desarrollo, pueden no llegar - usa `RESEND_API_KEY` en modo test

### Error CORS

- Asegúrate de que tienes `output: 'hybrid'` en `astro.config.mjs`
- Verifica que las URLs coinciden exactamente (http vs https)

## Próximos Pasos

1. Personaliza los templates de email en `src/api/contact.ts`
2. Añade más campos al formulario de contacto
3. Configura políticas de RLS más específicas
4. Implementa middleware de autenticación para rutas protegidas

¡Tu blog está listo para usar!
