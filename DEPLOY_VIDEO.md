# Deploy del Video en Producción

## ⚠️ Importante: Video No Incluido en Git

El archivo `public/hero-video.mp4` (13MB) **NO está en Git** porque:

- GitHub tiene límite de tamaño de archivos (recomendado < 50MB por repo)
- Los videos grandes ralentizan clones y pulls
- Es mejor práctica servir videos desde CDN

---

## 🚀 Opciones para Deploy del Video

### Opción 1: Netlify Large Media (Recomendado)

Netlify puede manejar archivos grandes automáticamente:

1. **El video se sube manualmente a Netlify:**

   ```bash
   # Después del deploy, sube el video via Netlify CLI
   netlify deploy --prod --dir=public
   ```

2. **O colócalo en la carpeta public en el servidor Netlify**

3. **La URL `/hero-video.mp4` funcionará** automáticamente

### Opción 2: Usar URL Externa (CDN)

Cambiar en `HeroSection.astro`:

```astro
<!-- En lugar de: -->
<source src="/hero-video.mp4" type="video/mp4" />

<!-- Usar CDN: -->
<source src="https://tu-cdn.com/hero-video.mp4" type="video/mp4" />
```

**CDNs gratuitos recomendados:**

- Cloudinary (https://cloudinary.com) - 25GB gratis
- Bunny CDN (https://bunny.net) - Muy económico
- Netlify Large Media - Integrado con Netlify

### Opción 3: Subir Manualmente a Netlify

1. Haz el deploy normal (sin el video)
2. Accede al dashboard de Netlify
3. Ve a **Deploys > Deploy settings > Asset optimization**
4. Sube el video manualmente a la carpeta `public/`

### Opción 4: Git LFS (Large File Storage)

Si prefieres tener el video en Git:

```bash
# Instalar Git LFS
git lfs install

# Trackear archivos de video
git lfs track "*.mp4"

# Añadir y commit
git add .gitattributes
git add public/hero-video.mp4
git commit -m "Add video with LFS"
git push
```

**Nota:** Netlify soporta Git LFS automáticamente.

---

## ✅ Solución Temporal: Video de Placeholder

Mientras configuras el video en producción, el Hero usa:

```astro
<video poster="https://images.unsplash.com/...">
  <source src="/hero-video.mp4" type="video/mp4" />
</video>
```

Si el video no existe, mostrará el **poster** (imagen de Unsplash) que sí funciona.

---

## 📝 Pasos para Deploy

### 1. Deploy sin Video (Ahora)

```bash
git push origin main
```

El sitio se desplegará con:

- ✅ Todo el código funcionando
- ✅ Hero con imagen de poster
- ⚠️ Video no disponible (muestra poster)

### 2. Subir Video Después

Elige una de las opciones arriba y:

1. Sube el video a Netlify/CDN
2. El Hero automáticamente usará el video cuando esté disponible
3. Hasta entonces, muestra la imagen de poster

---

## 🎯 Recomendación

Para **DiverMataró**, recomiendo:

### Solución A: Netlify + Manual Upload

1. **Ahora:** Push sin video (funcionará con poster)
2. **Después del deploy:** Sube `hero-video.mp4` via Netlify CLI
3. **Resultado:** Video funcionando en `/hero-video.mp4`

```bash
# Después del primer deploy:
netlify deploy --prod
# Cuando pregunte por el directorio, selecciona public/
# Y asegúrate de incluir hero-video.mp4
```

### Solución B: Usar Cloudinary (CDN Gratuito)

1. Crea cuenta en https://cloudinary.com (gratis)
2. Sube `hero-video.mp4`
3. Copia la URL del video
4. Actualiza `HeroSection.astro`:

```astro
<source src="https://res.cloudinary.com/TU-CUENTA/video/upload/hero-video.mp4" type="video/mp4" />
```

5. Commit y push

---

## 🔍 Verificación

Después del deploy, verifica:

```bash
# Ver si el video se cargó
curl -I https://tu-sitio.netlify.app/hero-video.mp4

# Debería responder:
# HTTP/2 200 (si está disponible)
# HTTP/2 404 (si aún no está subido - usará poster)
```

---

## 💡 Mejor Práctica a Futuro

Para archivos grandes:

1. **Imágenes < 500KB:** ✅ Git
2. **Imágenes > 500KB:** ⚠️ CDN o Git LFS
3. **Videos cualquier tamaño:** ⚠️ CDN o Git LFS
4. **Archivos dinámicos:** ⚠️ CDN siempre

---

## ✅ Resumen

- ✅ El código está listo para producción
- ✅ El Hero funciona (con poster mientras no hay video)
- ⏳ El video debe subirse por separado
- 🚀 Deploy puede proceder sin problemas

**El sitio funcionará perfectamente**, solo que el video no se verá hasta que lo subas mediante una de las opciones arriba.

---

¡El push a producción puede continuar! 🎉
