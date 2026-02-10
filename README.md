# Ratio Analytics - Website

Sitio web moderno y dinámico para Ratio Analytics, especializado en análisis de datos y automatización de procesos.

## 🚀 Características

- ✨ Diseño moderno y tech con animaciones fluidas
- 📱 Totalmente responsive (móvil, tablet, desktop)
- 🎨 Colores basados en el logo corporativo (#5B7EFF)
- ⚡ Optimizado para performance
- 🎯 SEO-friendly
- ♿ Accesible (WCAG 2.1)
- 🌐 Navegación multipágina real

## 📁 Estructura del Proyecto

```
ratio-analytics-website/
│
├── index.html                 # Página principal
│
├── assets/
│   ├── css/
│   │   ├── main.css          # Estilos principales y variables
│   │   ├── animations.css    # Animaciones
│   │   ├── responsive.css    # Media queries
│   │   └── components/       # Componentes CSS
│   │       ├── navbar.css
│   │       ├── buttons.css
│   │       ├── cards.css
│   │       ├── forms.css
│   │       └── footer.css
│   │
│   ├── js/
│   │   ├── main.js           # JavaScript principal
│   │   ├── animations.js     # Control de animaciones
│   │   ├── navigation.js     # Menú y navegación
│   │   └── form-validation.js # Validación de formularios
│   │
│   ├── images/
│   │   └── logo/
│   │       └── ratio-analytics-logo.png
│   │
│   └── fonts/                # Fuentes personalizadas (opcional)
│
└── pages/
    ├── soluciones.html       # Página de soluciones (por crear)
    ├── nosotros.html         # Página sobre nosotros (por crear)
    └── contacto.html         # Página de contacto dedicada (opcional)
```

## 🎨 Paleta de Colores

- **Primary**: #5B7EFF (Azul/Violeta del logo)
- **Primary Dark**: #4A6AE8
- **Primary Light**: #7B9AFF
- **Accent**: #00D9FF (Cyan)
- **Secondary**: #1a1a2e (Oscuro)

## 🛠️ Tecnologías Utilizadas

- HTML5
- CSS3 (Variables CSS, Flexbox, Grid)
- JavaScript (ES6+)
- Font Awesome 6.4.0 (iconos)
- Google Fonts (Inter & Space Grotesk)

## 📦 Cómo Usar

### Opción 1: Abrir localmente

1. Descarga todos los archivos
2. Abre `index.html` en tu navegador
3. ¡Listo!

### Opción 2: Servidor local (recomendado)

Si tienes Python instalado:

```bash
# Python 3
python -m http.server 8000

# O con Python 2
python -m SimpleHTTPServer 8000
```

Luego abre: `http://localhost:8000`

### Opción 3: VS Code Live Server

1. Instala la extensión "Live Server" en VS Code
2. Click derecho en `index.html`
3. Selecciona "Open with Live Server"

## ✏️ Personalización

### Cambiar Colores

Edita las variables CSS en `assets/css/main.css`:

```css
:root {
    --color-primary: #5B7EFF;  /* Cambia aquí */
    --color-accent: #00D9FF;   /* Y aquí */
}
```

### Modificar Textos

Todos los textos están en `index.html`. Busca y reemplaza según necesites:

- **Hero**: Línea ~85-100
- **Servicios**: Línea ~150-250
- **Casos de Éxito**: Línea ~260-400
- **Contacto**: Línea ~420-500

### Actualizar Información de Contacto

En la sección de contacto (línea ~445):

```html
<a href="mailto:TU_EMAIL">contacto@ratioanalytics.com</a>
<a href="tel:TU_TELEFONO">+1 (234) 567-890</a>
```

## 📝 Próximos Pasos

### Páginas por crear:

1. **Soluciones** (`pages/soluciones.html`)
   - Detalle de cada servicio
   - Casos de uso
   - Pricing (opcional)

2. **Nosotros** (`pages/nosotros.html`)
   - Historia de la empresa
   - Equipo
   - Valores y misión

3. **Blog** (opcional)
   - Artículos sobre análisis de datos
   - Tutoriales
   - Novedades

### Mejoras técnicas sugeridas:

- [ ] Integrar formulario con backend (NodeJS, PHP, etc.)
- [ ] Agregar Google Analytics
- [ ] Implementar SEO tags completos
- [ ] Crear sitemap.xml
- [ ] Optimizar imágenes
- [ ] Implementar lazy loading para imágenes
- [ ] Agregar meta tags Open Graph para redes sociales
- [ ] Configurar robots.txt

## 🔧 Integración del Formulario

Actualmente el formulario simula el envío. Para conectarlo a un backend:

### Opción 1: EmailJS (Gratis, sin backend)

```javascript
// En form-validation.js, reemplaza submitFormData():
async function submitFormData(data) {
    return emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', data)
        .then(() => ({ success: true }));
}
```

### Opción 2: Formspree (Gratis hasta 50 envíos/mes)

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Opción 3: Backend propio (NodeJS + Express)

```javascript
async function submitFormData(data) {
    const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return response.json();
}
```

## 🌐 Deploy

### Netlify (Recomendado - Gratis)

1. Crea cuenta en netlify.com
2. Arrastra la carpeta del proyecto
3. ¡Listo! Tu sitio estará en línea

### Vercel

```bash
npm i -g vercel
vercel
```

### GitHub Pages

1. Sube el proyecto a un repo de GitHub
2. Settings → Pages
3. Selecciona la rama main
4. ¡Publicado!

## 📱 Testing

- **Desktop**: Chrome, Firefox, Safari, Edge
- **Mobile**: iOS Safari, Chrome Android
- **Tablet**: iPad, Android tablets

## 🐛 Troubleshooting

### Las animaciones no funcionan
- Verifica que los archivos JS estén cargando correctamente
- Abre la consola del navegador (F12) y busca errores

### El menú móvil no abre
- Revisa que navigation.js esté cargando
- Verifica los IDs en HTML: `hamburger` y `nav-menu`

### Formulario no envía
- Primero completa la integración con un servicio de email
- El código actual solo simula el envío

## 📞 Soporte

Para dudas o sugerencias:
- Email: contacto@ratioanalytics.com
- [Tu información de contacto]

## 📄 Licencia

Este proyecto fue desarrollado específicamente para Ratio Analytics.

---

**Hecho con ❤️ para Ratio Analytics**

Última actualización: Febrero 2026
