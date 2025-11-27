# DiverMataró - Asociación de Diversidad Funcional

Sitio web oficial de DiverMataró, una asociación dedicada a apoyar a personas con diversidad funcional y sus familias en Mataró, Barcelona.

## 🌟 Características

- **Navegación moderna y accesible** con efectos visuales espectaculares
- **Modo oscuro funcional** con persistencia en localStorage
- **Diseño responsive** optimizado para móvil, tablet y escritorio
- **Sistema de blog** con contenido en Markdown
- **Formulario de inscripción** con validación en tiempo real
- **Accesibilidad mejorada** con ARIA labels y skip links
- **Performance optimizada** con Astro para generación estática

## 🛠️ Tecnologías

- **[Astro](https://astro.build)** - Framework web moderno
- **[React](https://react.dev)** - Componentes interactivos
- **[Tailwind CSS v4](https://tailwindcss.com)** - Estilos utility-first
- **[TypeScript](https://www.typescriptlang.org)** - Tipado estático
- **[Lucide React](https://lucide.dev)** - Iconos modernos
- **[React Hook Form](https://react-hook-form.com)** - Gestión de formularios
- **[Zod](https://zod.dev)** - Validación de esquemas

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Gusi-ui/stellar-saturn.git

# Entrar al directorio
cd stellar-saturn

# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev
```

El sitio estará disponible en `http://localhost:4321`

## 🚀 Comandos

| Comando             | Acción                                               |
| :------------------ | :--------------------------------------------------- |
| `npm install`       | Instala las dependencias                             |
| `npm run dev`       | Inicia el servidor de desarrollo en `localhost:4321` |
| `npm run build`     | Construye el sitio para producción en `./dist/`      |
| `npm run preview`   | Vista previa del build antes de deployar             |
| `npm run astro ...` | Ejecuta comandos de Astro CLI                        |

## 🌐 Despliegue

Este proyecto está configurado para desplegarse en **Netlify**, aunque también es compatible con otras plataformas como Vercel o Cloudflare Pages.

### Despliegue en Netlify (Recomendado)

El proyecto incluye configuración lista para Netlify y está optimizado para el **plan gratuito**.

#### Límites del Plan Gratuito de Netlify:

- ✅ **300 minutos de build/mes** - Suficiente para ~10-15 despliegues al mes
- ✅ **100GB de bandwidth/mes** - Más que suficiente para un sitio de asociación
- ✅ **Funciones serverless** - Timeout de 10 segundos (suficiente para nuestro endpoint)
- ✅ **Variables de entorno** - Ilimitadas
- ✅ **Despliegues automáticos** - Ilimitados

#### Pasos para desplegar:

1. **Conecta tu repositorio a Netlify:**
   - Ve a [Netlify](https://app.netlify.com)
   - Conecta tu repositorio de GitHub/GitLab
   - Netlify detectará automáticamente la configuración

2. **Configuración automática:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `20` (configurado automáticamente)

3. **Variables de entorno (requeridas para Supabase):**
   - Ve a **Site settings** → **Environment variables**
   - Agrega las siguientes variables:
     ```
     PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
     SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key-aqui
     ```
   - ⚠️ **Importante**: Configura estas variables ANTES del primer despliegue

4. **Despliegue automático:**
   - Cada push a la rama `main` desplegará automáticamente
   - Los Pull Requests generarán preview deployments
   - Los builds suelen tardar 1-2 minutos

#### Optimizaciones para el Plan Gratuito:

- ✅ **Cache de assets**: Configurado para maximizar el uso del CDN
- ✅ **Build optimizado**: Solo genera lo necesario
- ✅ **Funciones serverless eficientes**: Sin sesiones persistentes ni auto-refresh
- ✅ **Headers de seguridad**: Configurados para mejor rendimiento

#### Monitoreo del Uso:

Puedes monitorear tu uso en **Team settings** → **Usage**:

- Build minutes utilizados
- Bandwidth consumido
- Funciones invocadas

Si necesitas más recursos, Netlify ofrece planes de pago muy accesibles.

### Despliegue en Vercel

1. Conecta tu repositorio en [Vercel](https://vercel.com)
2. Vercel detectará automáticamente Astro
3. El adaptador de Netlify puede funcionar, pero se recomienda usar `@astrojs/vercel` para mejor integración

### Despliegue en Cloudflare Pages

1. Conecta tu repositorio en [Cloudflare Pages](https://pages.cloudflare.com)
2. Build command: `npm run build`
3. Build output directory: `dist`
4. Para API routes, considera usar `@astrojs/cloudflare` adapter

### Configuración de Base de Datos (Supabase)

El proyecto está configurado para usar **Supabase** como base de datos para almacenar las inscripciones del formulario.

#### Pasos para configurar Supabase:

1. **Crear cuenta en Supabase:**
   - Ve a [supabase.com](https://supabase.com) y crea una cuenta gratuita
   - Crea un nuevo proyecto

2. **Configurar la base de datos:**
   - En el dashboard de Supabase, ve a **SQL Editor**
   - Ejecuta el script SQL del archivo `supabase-schema.sql` que crea la tabla `registrations`

3. **Obtener las credenciales:**
   - Ve a **Settings** → **API**
   - Copia la **Project URL** (será tu `PUBLIC_SUPABASE_URL`)
   - Copia la **service_role** key (será tu `SUPABASE_SERVICE_ROLE_KEY`)
   - ⚠️ **IMPORTANTE**: La service_role key tiene permisos completos, nunca la expongas en el cliente

4. **Configurar variables de entorno:**

   **En Netlify:**
   - Ve a tu sitio en Netlify → **Site settings** → **Environment variables**
   - Agrega las siguientes variables:
     ```
     PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
     SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key-aqui
     ```

   **Para desarrollo local:**
   - Crea un archivo `.env` en la raíz del proyecto:
     ```
     PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
     SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key-aqui
     ```
   - ⚠️ **No subas el archivo `.env` al repositorio** (ya está en `.gitignore`)

5. **Verificar la configuración:**
   - Despliega los cambios en Netlify
   - Prueba el formulario de inscripción
   - Verifica en Supabase → **Table Editor** → `registrations` que los datos se están guardando

#### Estructura de la Base de Datos

La tabla `registrations` almacena:

- `id`: UUID único del registro
- `full_name`: Nombre completo
- `email`: Correo electrónico (único)
- `phone`: Teléfono de contacto
- `functional_diversity`: Tipo de diversidad funcional
- `relationship`: Relación con la asociación
- `newsletter`: Consentimiento para newsletter
- `consent`: Consentimiento para tratamiento de datos
- `created_at`: Fecha de creación
- `updated_at`: Fecha de última actualización

#### Próximas mejoras sugeridas:

- **Envío de emails de confirmación** (usando Resend, SendGrid, etc.)
- **Notificaciones por WhatsApp** cuando llegue una nueva inscripción
- **Panel de administración** para ver y gestionar las inscripciones
- **Integración con Google Sheets** para exportar datos

Consulta los archivos `src/pages/api/submit-registration.json.ts` y `supabase-schema.sql` para más detalles.

## 📁 Estructura del Proyecto

```
stellar-saturn/
├── public/              # Archivos estáticos
│   ├── logoDiverMataro.png
│   ├── favicondivermataro.png
│   └── accessibility.css
├── src/
│   ├── components/      # Componentes reutilizables
│   │   ├── Navigation.astro
│   │   ├── Footer.astro
│   │   ├── ThemeToggle.tsx
│   │   ├── RegistrationForm.tsx
│   │   └── ...
│   ├── layouts/         # Layouts de página
│   │   └── BaseLayout.astro
│   ├── pages/          # Páginas del sitio
│   │   ├── index.astro
│   │   ├── quienes-somos.astro
│   │   ├── servicios.astro
│   │   ├── contacto.astro
│   │   ├── api/        # Endpoints API
│   │   │   └── submit-registration.json.ts
│   │   └── blog/
│   ├── lib/            # Utilidades y librerías
│   │   └── supabase.ts # Cliente de Supabase
│   ├── content/        # Contenido en Markdown
│   │   └── blog/
│   └── styles/         # Estilos globales
│       └── global.css
├── supabase-schema.sql # Esquema SQL para la base de datos
├── netlify.toml         # Configuración de Netlify
├── astro.config.mjs     # Configuración de Astro
└── package.json
```

## 🎨 Características de Diseño

### Navegación

- Logo con efecto de resplandor al hover
- Enlaces con estado activo según la página actual
- Efecto glassmorphism con backdrop-blur
- Animaciones suaves y transiciones
- Menú móvil responsive

### Modo Oscuro

- Toggle automático con preferencia del sistema
- Persistencia en localStorage
- Transiciones suaves entre temas
- Iconos dinámicos (sol/luna)

### Accesibilidad

- Navegación por teclado completa
- ARIA labels en todos los elementos interactivos
- Skip to main content link
- Contraste de colores WCAG AA
- Soporte para lectores de pantalla

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo una licencia privada. Todos los derechos reservados © DiverMataró.

## 📧 Contacto

**DiverMataró**

- Web: [https://asociacionmataro.org](https://asociacionmataro.org)
- Email: info@asociacionmataro.org
- WhatsApp: +34 600 000 000

---

Desarrollado con ❤️ usando Astro, React y Tailwind CSS
