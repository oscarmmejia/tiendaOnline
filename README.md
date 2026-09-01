# OKYDOKY

## Configuración del clima

El widget del navbar obtiene la ubicación del navegador y consulta la API de clima actual de OpenWeather mediante Axios.

### Desarrollo local

1. Copia `.env.example` como `.env.local`.
2. Sustituye el valor de ejemplo por tu API key:

```env
VITE_OPENWEATHER_API_KEY=tu_api_key_real
```

3. Reinicia `npm run dev` después de crear o cambiar la variable.
4. Al abrir la web, concede el permiso de ubicación al navegador.

### Vercel

El archivo `.env.local` no se sube al repositorio. En Vercel hay que configurar la misma variable por separado:

1. Abre el proyecto en Vercel y entra en **Settings > Environment Variables**.
2. Crea `VITE_OPENWEATHER_API_KEY` con la API key como valor.
3. Actívala para **Production** y **Preview**.
4. Guarda el cambio y vuelve a desplegar la aplicación. Las variables nuevas no se añaden a despliegues anteriores.
5. En la URL de Vercel, concede de nuevo el permiso de ubicación; el permiso de `localhost` no se comparte con ese dominio.

Si aparece `Clave pendiente o no válida`, comprueba que no haya espacios en el valor. Una API key nueva de OpenWeather puede tardar hasta dos horas en activarse. Prueba la URL del despliegue directamente en otra pestaña, porque un preview incrustado puede bloquear la geolocalización.

> Las variables que empiezan por `VITE_` quedan incluidas en el JavaScript del navegador. Para una aplicación de producción, conviene ocultar la clave tras una función serverless.
