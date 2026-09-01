<div align="center">

# OKYDOKY

### El marketplace del mañana

Catálogo online de hardware, moda, muebles, calzado y productos misceláneos con una experiencia visual inspirada en el cyberpunk y la tecnología futurista.

[![Demo en Vercel](https://img.shields.io/badge/demo-Vercel-000000?logo=vercel&logoColor=white)](https://tienda-online-okydoky.vercel.app/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=111111)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)

</div>

## Descripción

OKYDOKY es una tienda online desarrollada como proyecto de bootcamp. La aplicación presenta un catálogo de productos consumido desde una API externa, permite filtrar por categorías y reúne distintas páginas informativas sobre la marca, su historia y el equipo que la construye.

El diseño combina fondos oscuros, tipografías monoespaciadas, acentos neón y tarjetas de producto para crear una identidad de marketplace tecnológico. La interfaz es responsive y cuenta con navegación mediante React Router.

## Demo

- **Aplicación desplegada:** [tienda-online-okydoky.vercel.app](https://tienda-online-okydoky.vercel.app/)
- **Repositorio:** [github.com/oscarmmejia/tiendaOnline](https://github.com/oscarmmejia/tiendaOnline)

## Capturas

Las imágenes se tomaron sobre la aplicación en ejecución y muestran el contenido principal de cada vista.

### Inicio

Hero de OKYDOKY, selección de los cinco productos destacados y categorías principales.

![Página de inicio de OKYDOKY](public/screenshots/home.png)

### Catálogo de productos

Vista de productos con encabezado, selector de categoría y zona de resultados.

![Catálogo de productos de OKYDOKY](public/screenshots/products.png)

### Nuestra historia

Hero editorial, origen de la marca y evolución de sus protocolos.

![Página Nuestra historia de OKYDOKY](public/screenshots/our-story.png)

### Usuarios

Perfiles de usuarios conectados a la comunidad OKYDOKY.

![Página de usuarios de OKYDOKY](public/screenshots/users.png)

### Equipo

Presentación visual de los cinco integrantes del proyecto y sus responsabilidades.

![Equipo de OKYDOKY](public/screenshots/team.png)

## Funcionalidades

- Página de inicio con hero principal, propuesta de valor, productos destacados y categorías.
- Catálogo con productos obtenidos desde la API de Platzi Fake Store.
- Filtrado del catálogo por categoría mediante selector y parámetros de URL.
- Tarjetas reutilizables con imagen, categoría, descripción y precio.
- Página «Nuestra historia» con narrativa de marca y sección de evolución de protocolos.
- Página «Usuarios» con perfiles obtenidos desde la API externa.
- Página «Equipo» con los cinco integrantes y sus roles.
- Página de secciones en construcción para «Vendedores».
- Página 404 para rutas no encontradas.
- Widget de clima basado en geolocalización y OpenWeather, activado al configurar su API key.
- Header, footer y navegación compartidos en todas las páginas.
- Scroll automático al cambiar de ruta.
- Estados de carga y error para las peticiones asíncronas.

## Rutas disponibles

| Ruta | Vista |
| --- | --- |
| `/` | Inicio |
| `/productos` | Catálogo completo |
| `/productos?categoryId=1` | Catálogo filtrado por categoría |
| `/nuestra-historia` | Historia y evolución de protocolos |
| `/usuarios` | Usuarios de la comunidad |
| `/equipo` | Integrantes del equipo |
| `/vendedores` | Sección en construcción |
| Cualquier otra ruta | Página 404 |

## Tecnologías

- React 19
- React DOM 19
- React Router DOM 7
- Vite 8
- JavaScript (ES modules)
- CSS modular por componente
- ESLint 10
- React Compiler mediante Babel/Rolldown
- [Platzi Fake Store API](https://api.escuelajs.co/api/v1) para productos, categorías y usuarios
- [OpenWeather API](https://openweathermap.org/api) para el widget meteorológico opcional

## Requisitos previos

- Node.js 18 o superior
- npm 9 o superior
- Conexión a internet para cargar los datos de las APIs externas

## Instalación

1. Clona el repositorio:

	```bash
	git clone https://github.com/oscarmmejia/tiendaOnline.git
	cd tiendaOnline
	```

2. Instala las dependencias:

	```bash
	npm install
	```

3. (Opcional) Configura el widget del clima. Crea un archivo `.env` en la raíz del proyecto y añade:

	```env
	VITE_OPENWEATHER_API_KEY=tu_api_key_de_openweather
	```

	Sin esta variable, la tienda continúa funcionando y el widget mostrará que la API no está configurada.

4. Inicia el servidor de desarrollo:

	```bash
	npm run dev
	```

5. Abre la URL que indique Vite, normalmente [http://localhost:5173](http://localhost:5173).

## Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo con Vite |
| `npm run build` | Genera la compilación de producción en `dist/` |
| `npm run preview` | Sirve localmente la compilación de producción |
| `npm run lint` | Ejecuta ESLint sobre el proyecto |

## Estructura del proyecto

```text
src/
├── assets/              # Recursos usados por componentes
├── components/
│   ├── atoms/           # Elementos básicos reutilizables
│   ├── molecules/       # Composiciones pequeñas
│   ├── organisms/       # Bloques complejos de interfaz
│   ├── pages/           # Vistas asociadas a rutas
│   ├── templates/       # Layout compartido
│   ├── users/           # Componentes de usuarios
│   └── weather/         # Widget meteorológico
├── constants/           # Estados y valores compartidos
├── hooks/               # Hooks de datos y navegación
├── img/                 # Imágenes de historia y equipo
├── routes/              # Rutas centralizadas
├── services/            # Acceso y transformación de APIs
├── styles/              # Estilos globales y específicos
├── App.jsx              # Configuración del enrutador
├── index.css            # Estilos base
└── main.jsx             # Punto de entrada
```

## Datos e integraciones

Los productos y categorías se consultan desde `https://api.escuelajs.co/api/v1`. Los hooks cancelan las peticiones cuando el componente se desmonta y exponen estados de carga, éxito y error para que cada vista pueda mostrar una respuesta adecuada.

La vista de usuarios usa el endpoint `/users`. El widget meteorológico solicita permiso de geolocalización al navegador y consulta OpenWeather con la variable `VITE_OPENWEATHER_API_KEY`. Las claves deben permanecer en variables de entorno y no deben subirse al repositorio.

## Despliegue

El proyecto está preparado para desplegarse en Vercel como aplicación Vite:

1. Importa el repositorio en Vercel.
2. Mantén `npm run build` como comando de compilación.
3. Usa `dist` como directorio de salida.
4. Añade `VITE_OPENWEATHER_API_KEY` en las variables de entorno si quieres activar el clima.
5. Configura una regla de fallback a `index.html` si el proveedor no la añade automáticamente, para que las rutas de React Router funcionen al recargar.

## Equipo

- **Jesús González Gómez**
- **Juan Camilo Piamba Uribe**
- **Oscar Mauricio de Jesús Mejía Pernía**
- **Moisés García Sanz**
- **Cristina Rodríguez López**

## Licencia

Proyecto académico desarrollado para el bootcamp. Todos los derechos del código pertenecen a sus autores.
