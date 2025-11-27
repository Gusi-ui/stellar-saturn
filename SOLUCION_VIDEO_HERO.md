# Solución Video del Hero - Error 403

## 🐛 Problema Identificado

El video de Mixkit está devolviendo un error **403 Forbidden**:

```
Failed to load resource: the server responded with a status of 403 ()
mixkit-people-with-disabilities-having-fun-playing-43365-large.mp4
```

**Causa**: Mixkit bloquea el hotlinking directo de sus videos.

---

## ✅ Solución Implementada

He cambiado la fuente del video a URLs que permiten hotlinking:

1. **Pixabay** (primera opción)
2. **Pexels** (fallback)
3. **Poster image** de Unsplash (mientras carga)

### Nuevo Código:

```astro
<video id="hero-video" poster="https://images.unsplash.com/photo-1529390079861-591de354faf5">
  <source
    src="https://cdn.pixabay.com/video/2023/04/24/159595-820929096_large.mp4"
    type="video/mp4"
  />
  <source
    src="https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4"
    type="video/mp4"
  />
</video>
```

---

## 🎥 Opción Recomendada: Video Local

Para tener control total y mejor rendimiento, descarga y usa un video local:

### Paso 1: Descargar Video

Opciones gratuitas:

**A) Pexels (Recomendado):**

1. Ve a: https://www.pexels.com/search/videos/inclusion/
2. Busca videos de personas con diversidad funcional
3. Descarga en calidad 1920x1080 o menor
4. Guarda como `public/hero-video.mp4`

**B) Pixabay:**

1. Ve a: https://pixabay.com/videos/
2. Busca "inclusion" o "diversity"
3. Descarga gratis
4. Guarda como `public/hero-video.mp4`

**C) Unsplash (Solo imágenes):**

- Para imagen estática de respaldo

### Paso 2: Optimizar el Video (Opcional pero Recomendado)

Si tienes FFmpeg instalado:

```bash
# Reducir tamaño del video manteniendo calidad
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow \
       -vf scale=1920:-1 -c:a aac -b:a 128k \
       public/hero-video.mp4

# O más comprimido (menor calidad, menor tamaño)
ffmpeg -i input.mp4 -c:v libx264 -crf 32 -preset faster \
       -vf scale=1280:-1 -c:a aac -b:a 96k \
       public/hero-video.mp4
```

### Paso 3: Actualizar el Código

Una vez descargado el video local:

```astro
<video
  id="hero-video"
  class="absolute top-0 left-0 w-full h-full object-cover hidden md:block"
  autoplay
  muted
  loop
  playsinline
  preload="auto"
  aria-hidden="true"
  poster="/hero-fallback.jpg"
>
  <source src="/hero-video.mp4" type="video/mp4" />
  <source src="/hero-video.webm" type="video/webm" />
</video>
```

---

## 🎬 Videos Sugeridos (Temática de Inclusión)

### Pexels - Videos Gratuitos de Alta Calidad

1. **Personas en actividades grupales:**
   - https://www.pexels.com/video/3209828/
   - https://www.pexels.com/video/5495789/

2. **Talleres y terapias:**
   - https://www.pexels.com/video/6893884/
   - https://www.pexels.com/video/6195321/

3. **Comunidad y diversidad:**
   - https://www.pexels.com/video/5263734/
   - https://www.pexels.com/video/3571264/

### Pixabay - Alternativas

1. Busca: "happy people", "community", "therapy"
2. Todos los videos son libres de derechos
3. No requiere atribución

---

## 📦 Alternativa: Video Placeholder Animado

Si no encuentras el video ideal, puedes usar un degradado animado:

```astro
<div
  id="hero-background"
  class="absolute top-0 left-0 w-full h-full hidden md:block animate-gradient"
  style="background: linear-gradient(45deg, #ff6b6b, #f06595, #cc5de8, #845ef7, #5c7cfa, #339af0, #22b8cf, #20c997);"
>
</div>

<style>
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .animate-gradient {
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
  }
</style>
```

---

## 🚀 Ventajas del Video Local

### ✅ Pros:

- **Rendimiento**: Carga más rápido desde tu servidor
- **Control**: Puedes editar, cortar y optimizar
- **Sin errores 403**: Hosting propio
- **Offline**: Funciona sin conexión externa
- **Privacidad**: No depende de servicios terceros

### ❌ Contras:

- Ocupa espacio en el servidor
- Necesitas encontrar/crear el video
- Más trabajo inicial

---

## 🔧 Solución Temporal Actual

Mientras consigues un video local, he configurado:

1. **Pixabay** como fuente principal (permite hotlinking)
2. **Pexels** como fallback
3. **Poster image** para mostrar mientras carga
4. **Imagen estática** en móviles

El video debería funcionar ahora, pero **te recomiendo encarecidamente** conseguir un video local para:

- Mejor rendimiento
- Control total
- Sin depender de servicios externos

---

## 📝 Checklist

- [x] Cambiar URL del video a una que permita hotlinking
- [ ] Descargar video apropiado de Pexels/Pixabay
- [ ] Optimizar video con FFmpeg (opcional)
- [ ] Guardar en `public/hero-video.mp4`
- [ ] Actualizar src en HeroSection.astro
- [ ] Crear imagen poster en `public/hero-fallback.jpg`
- [ ] Probar en diferentes navegadores

---

## 🎯 Resultado Esperado

Después de implementar un video local:

- ✅ Video carga rápido (< 3s)
- ✅ Sin errores 403
- ✅ Parallax funcionando suavemente
- ✅ Responsive (imagen en móvil, video en desktop)
- ✅ Accesible (respeta prefers-reduced-motion)

---

## 💡 Consejos Finales

1. **Tamaño del video**: Entre 2-10 MB máximo
2. **Resolución**: 1920x1080 o 1280x720
3. **Duración**: 10-30 segundos en loop
4. **Formato**: MP4 (H.264) para mejor compatibilidad
5. **Compresión**: CRF 28-32 con FFmpeg

¡El video ahora debería funcionar! 🎉
