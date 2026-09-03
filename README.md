<div align="center">

```
╔═══════════════════════════════════════════════╗
║   ▓▓▓  O K Y D O K Y  ▓▓▓                       ║
║   > el marketplace del mañana                   ║
╚═══════════════════════════════════════════════╝
```

# ⛧ OKYDOKY

### `// catálogo neón · hardware · moda · muebles · calzado`

Tienda online con estética **cyberpunk**: fondos casi negros, tipografía monoespaciada y acentos cian/magenta. Un catálogo vivo servido desde una API externa, filtros por categoría y una experiencia de _marketplace_ del futuro. Proyecto de bootcamp.

<br>

[![▶ DEMO EN VIVO](https://img.shields.io/badge/▶_DEMO_EN_VIVO-05070d?style=for-the-badge&logo=vercel&logoColor=22d3ee)](https://tienda-online-okydoky.vercel.app/)

[![React 19](https://img.shields.io/badge/React-19-22d3ee?style=flat-square&logo=react&logoColor=05070d)](https://react.dev/)
[![Vite 8](https://img.shields.io/badge/Vite-8-ff007a?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![React Router 7](https://img.shields.io/badge/React_Router-7-22d3ee?style=flat-square&logo=reactrouter&logoColor=05070d)](https://reactrouter.com/)
[![Axios](https://img.shields.io/badge/Axios-1.20-ff007a?style=flat-square&logo=axios&logoColor=white)](https://axios-http.com/)
[![Licencia](https://img.shields.io/badge/licencia-académica-334155?style=flat-square)](#-licencia)

</div>

---

## ⌁ Índice

- [Descripción](#-descripción)
- [Demo](#-demo)
- [Capturas](#-capturas)
- [Características](#-características)
- [Estética del sistema](#-estética-del-sistema)
- [Stack tecnológico](#-stack-tecnológico)
- [Arquitectura del proyecto](#-arquitectura-del-proyecto)
- [Mapa de rutas](#-mapa-de-rutas)
- [Requisitos previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Variables de entorno](#-variables-de-entorno)
- [Comandos disponibles](#-comandos-disponibles)
- [Integraciones y datos](#-integraciones-y-datos)
- [Despliegue](#-despliegue)
- [Equipo](#-equipo)
- [Licencia](#-licencia)

---

## ▚ Descripción

**OKYDOKY** es una SPA (_single page application_) construida con **React 19** y **Vite 8** como proyecto de bootcamp. Presenta un catálogo de productos consumido en tiempo real desde una API externa, con filtrado por categorías, páginas informativas sobre la marca y un widget de clima opcional basado en geolocalización.

Toda la interfaz gira en torno a una identidad visual coherente: superficies oscuras, rejilla de tarjetas, tipografías `Sora` + `Space Mono` y dos acentos neón (cian y magenta) que atraviesan botones, bordes y estados. La navegación se gestiona con **React Router** sobre un layout compartido, y cada vista maneja sus propios estados de carga, éxito y error.

---

## ▚ Demo

| Recurso | Enlace |
| --- | --- |
| 🌐 Aplicación desplegada | **[tienda-online-okydoky.vercel.app](https://tienda-online-okydoky.vercel.app/)** |
| 💾 Repositorio | **[github.com/oscarmmejia/tiendaOnline](https://github.com/oscarmmejia/tiendaOnline)** |

---

## ▚ Capturas

> Imágenes tomadas sobre la aplicación en ejecución.

### `> INICIO`
Hero principal, productos destacados y acceso a las categorías del catálogo.

![Página de inicio de OKYDOKY](public/screenshots/home.png)

### `> CATÁLOGO`
Encabezado, selector de categoría y rejilla de resultados en vivo.

![Catálogo de productos de OKYDOKY](public/screenshots/products.png)

### `> NUESTRA HISTORIA`
Narrativa de marca y evolución de sus protocolos.

![Página Nuestra historia de OKYDOKY](public/screenshots/our-story.png)

### `> USUARIOS`
Perfiles de la comunidad conectada a OKYDOKY.

![Página de usuarios de OKYDOKY](public/screenshots/users.png)

### `> EQUIPO`
Los cinco integrantes que construyen el sistema.

![Equipo de OKYDOKY](public/screenshots/team.png)

---

## ▚ Características

- 🛰️ **Catálogo en vivo** — productos obtenidos desde la Platzi Fake Store API y normalizados antes de pintarse.
- 🔍 **Filtrado por categoría** — selector sincronizado con parámetros de URL (`?categoryId=`).
- ✨ **Catálogo curado** — descarta productos con imágenes _placeholder_ o descripciones demasiado cortas, dejando solo fichas de calidad.
- 🏆 **Destacados** — selección de los productos de mayor precio para el _hero_ de inicio.
- 🧩 **Tarjetas reutilizables** — imagen, categoría, descripción y precio en un componente único.
- 📖 **Nuestra historia** — página editorial con el origen y la evolución de la marca.
- 👥 **Usuarios** — perfiles de la comunidad servidos desde la API externa.
- 🛠️ **Equipo** — presentación de los cinco integrantes y sus roles.
- 🌦️ **Widget de clima opcional** — geolocalización + OpenWeather, activable por variable de entorno.
- ♻️ **Peticiones cancelables** — `AbortController` + axios evitan actualizar componentes desmontados.
- ⏳ **Estados asíncronos** — `loading` / `ready` / `error` gestionados de forma centralizada.
- 🧭 **Layout compartido** — header, footer y _scroll-to-top_ automático al cambiar de ruta.
- 🚫 **Página 404** — fallback para cualquier ruta no definida.
- 📱 **Responsive** — la rejilla y el _padding_ se adaptan por _breakpoints_.

---

## ▚ Estética del sistema

La identidad visual vive en `src/index.css` como _design tokens_. Esta es la paleta que define el mundo OKYDOKY:

| Token | Hex | Rol |
| --- | --- | --- |
| `--colorBackground` | `#05070d` | Fondo base (casi negro) |
| `--colorSurface` | `#0f172a` | Superficies y tarjetas |
| `--colorBorder` | `#334155` | Bordes y separadores |
| `--colorText` | `#ffffff` | Texto principal |
| `--colorTextMuted` | `#8a95a5` | Texto secundario |
| `--colorCyan` | `#22d3ee` | Acento primario (neón cian) |
| `--colorMagenta` | `#ff007a` | Acento secundario (neón magenta) |

**Tipografías:** `Sora` para display · `Space Mono` para código y detalles técnicos.

---

## ▚ Stack tecnológico

| Capa | Tecnología |
| --- | --- |
| **UI** | React 19 · React DOM 19 |
| **Enrutado** | React Router DOM 7 |
| **Build / Dev** | Vite 8 |
| **HTTP** | Axios 1.20 (cliente centralizado) |
| **Compilación** | React Compiler vía Babel + Rolldown |
| **Estilos** | CSS modular por componente + tokens globales |
| **Calidad** | ESLint 10 |
| **Lenguaje** | JavaScript (ES Modules) |

**APIs externas:** [Platzi Fake Store API](https://api.escuelajs.co/api/v1) · [OpenWeather API](https://openweathermap.org/api)

---

## ▚ Arquitectura del proyecto

```text
src/
├── assets/                 # Recursos estáticos (hero background)
├── components/
│   ├── atoms/              # Piezas base reutilizables
│   ├── molecules/          # Composiciones pequeñas
│   ├── organisms/          # Bloques complejos de interfaz
│   ├── templates/          # MainLayout (header + footer + outlet)
│   ├── header/             # Cabecera y navegación
│   ├── footer/             # Pie de página
│   ├── hero/               # Hero de inicio
│   ├── categoryCard/       # Tarjeta de categoría
│   ├── titleDescription…/  # Bloque de título + descripción
│   ├── users/              # Vista y tarjetas de usuarios
│   └── weather/            # Widget meteorológico
├── constants/
│   └── requestStatus.js    # Estados loading / ready / error
├── hooks/
│   ├── useProductCatalog.js
│   ├── useTopProducts.js
│   ├── useUsers.js
│   ├── useWeather.js
│   └── useScrollToTop.js
├── img/                    # Imágenes de historia y equipo
├── pages/
│   ├── homePage/
│   ├── productsPage/
│   ├── ourStoryPage/
│   ├── team/
│   └── notFoundPage/
├── routes/
│   └── routePaths.js       # Rutas centralizadas
├── services/
│   ├── httpClient.js       # Instancia axios + helper de cancelación
│   ├── productsApi.js      # Productos y categorías (curado + normalizado)
│   ├── userService.js      # Usuarios
│   └── weatherService.js   # OpenWeather
├── styles/                 # Estilos compartidos
├── App.jsx                 # Configuración del router
├── main.jsx                # Punto de entrada
└── index.css               # Tokens y estilos base
```

**Flujo de datos:** `service` (axios) → `hook` (estado + cancelación) → `page` / `component` (render por estado). Los servicios devuelven datos ya **normalizados**, de modo que la capa visual solo se preocupa de pintar.

---

## ▚ Mapa de rutas

| Ruta | Vista | Descripción |
| --- | --- | --- |
| `/` | Inicio | Hero, destacados y categorías |
| `/productos` | Catálogo | Todos los productos |
| `/productos?categoryId=1` | Catálogo filtrado | Resultados por categoría |
| `/nuestra-historia` | Nuestra historia | Narrativa de marca |
| `/usuarios` | Usuarios | Perfiles de la comunidad |
| `/equipo` | Equipo | Integrantes y roles |
| `*` | 404 | Fallback de ruta no encontrada |

---

## ▚ Requisitos previos

- **Node.js** 18 o superior
- **npm** 9 o superior
- Conexión a internet (los datos provienen de APIs externas)

---

## ▚ Instalación

```bash
# 1 · Clona el repositorio
git clone https://github.com/oscarmmejia/tiendaOnline.git

# 2 · Entra en el proyecto
cd tiendaOnline

# 3 · Instala las dependencias
npm install

# 4 · Arranca el entorno de desarrollo
npm run dev
```

Vite mostrará una URL local (por defecto **http://localhost:5173**). Ábrela en el navegador y el sistema estará online. ⚡

---

## ▚ Variables de entorno

El widget de clima es **opcional**. Para activarlo, crea un archivo `.env` en la raíz:

```env
VITE_OPENWEATHER_API_KEY=tu_api_key_de_openweather
```

> Sin esta clave, la tienda funciona con total normalidad; el widget simplemente indicará que la API no está configurada. **Nunca subas tu `.env` al repositorio.**

---

## ▚ Comandos disponibles

| Comando | Acción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con Vite |
| `npm run build` | Compilación de producción en `dist/` |
| `npm run preview` | Sirve localmente la _build_ de producción |
| `npm run lint` | Análisis de código con ESLint |

---

## ▚ Integraciones y datos

**Platzi Fake Store API** — `https://api.escuelajs.co/api/v1`
Productos, categorías y usuarios. La capa de servicios **filtra y normaliza** la respuesta: descarta imágenes _placeholder_, exige una descripción mínima y limita el catálogo a las categorías destacadas — **Ropa · Electrónica · Muebles · Zapatos · Misceláneos**.

**OpenWeather API** — widget meteorológico opcional.
Solicita permiso de geolocalización al navegador y consulta el clima con la variable `VITE_OPENWEATHER_API_KEY`, devolviendo solo temperatura, descripción e icono.

Todas las peticiones pasan por un **cliente axios centralizado** (`httpClient.js`) y son cancelables mediante `AbortController`, evitando fugas de estado al desmontar componentes.

---

## ▚ Despliegue

Optimizado para **Vercel** como aplicación Vite:

1. Importa el repositorio en Vercel.
2. Comando de compilación: `npm run build`.
3. Directorio de salida: `dist`.
4. (Opcional) Añade `VITE_OPENWEATHER_API_KEY` en las variables de entorno.
5. El `vercel.json` incluido reescribe todas las rutas a `index.html`, de modo que React Router funciona incluso al recargar en rutas internas.

---

## ▚ Equipo

> `> 5 nodos conectados al sistema`

- **Jesús González Gómez**
- **Juan Camilo Piamba Uribe**
- **Oscar Mauricio de Jesús Mejía Pernía**
- **Moisés García Sanz**
- **Cristina Rodríguez López**

---

## ▚ Licencia

Proyecto **académico** desarrollado para el bootcamp. Todos los derechos del código pertenecen a sus autores.

<div align="center">

```
╔═══════════════════════════════════════════════╗
║   ▓▓  OKYDOKY · sistema en línea · 2026  ▓▓     ║
╚═══════════════════════════════════════════════╝
```

</div>
