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

| Comando                | Acción                                         |
| :--------------------- | :--------------------------------------------- |
| `npm install`          | Instala las dependencias                       |
| `npm run dev`          | Inicia el servidor de desarrollo en `localhost:4321` |
| `npm run build`        | Construye el sitio para producción en `./dist/` |
| `npm run preview`      | Vista previa del build antes de deployar       |
| `npm run astro ...`    | Ejecuta comandos de Astro CLI                  |

## 🌐 Despliegue

Este proyecto está configurado para desplegarse en **Netlify**, aunque también es compatible con otras plataformas como Vercel o Cloudflare Pages.

### Despliegue en Netlify (Recomendado)

El proyecto incluye configuración lista para Netlify:

1. **Conecta tu repositorio a Netlify:**
   - Ve a [Netlify](https://app.netlify.com)
   - Conecta tu repositorio de GitHub/GitLab
   - Netlify detectará automáticamente la configuración

2. **Configuración automática:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `20` (configurado automáticamente)

3. **Variables de entorno (opcional):**
   Si necesitas configurar variables de entorno para el endpoint API (por ejemplo, para integración con servicios externos), puedes agregarlas en la configuración de Netlify:
   - Ve a Site settings → Environment variables
   - Agrega las variables necesarias

4. **Despliegue automático:**
   - Cada push a la rama `main` desplegará automáticamente
   - Los Pull Requests generarán preview deployments

### Despliegue en Vercel

1. Conecta tu repositorio en [Vercel](https://vercel.com)
2. Vercel detectará automáticamente Astro
3. El adaptador de Netlify puede funcionar, pero se recomienda usar `@astrojs/vercel` para mejor integración

### Despliegue en Cloudflare Pages

1. Conecta tu repositorio en [Cloudflare Pages](https://pages.cloudflare.com)
2. Build command: `npm run build`
3. Build output directory: `dist`
4. Para API routes, considera usar `@astrojs/cloudflare` adapter

### Notas sobre el Endpoint API

El endpoint `/api/submit-registration` está configurado como función serverless. Actualmente simula el procesamiento. Para producción, necesitarás:

- Integrar con una base de datos (Supabase, Firebase, etc.)
- Configurar servicio de email (Resend, SendGrid, etc.)
- O integrar con Google Sheets API

Consulta el archivo `src/pages/api/submit-registration.json.ts` para más detalles.

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
│   │   └── ...
│   ├── layouts/         # Layouts de página
│   │   └── BaseLayout.astro
│   ├── pages/          # Páginas del sitio
│   │   ├── index.astro
│   │   ├── quienes-somos.astro
│   │   ├── servicios.astro
│   │   ├── contacto.astro
│   │   └── blog/
│   ├── content/        # Contenido en Markdown
│   │   └── blog/
│   └── styles/         # Estilos globales
│       └── global.css
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
