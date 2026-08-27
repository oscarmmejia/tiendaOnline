# Cielo abierto

Consulta el clima actual de cualquier ciudad usando OpenWeatherMap.

## Configuración local

1. Copia `.env.example` como `.env.local`.
2. Añade tu clave en `VITE_OPENWEATHER_API_KEY`.
3. Ejecuta `npm.cmd run dev`.

`.env.local` está excluido por `.gitignore`; nunca subas ese archivo a GitHub.

> Importante: las variables `VITE_*` se incluyen en el JavaScript del navegador. Esto evita publicar la clave en el repositorio, pero no la hace secreta para quienes visiten la aplicación. Para protegerla también en producción, usa un endpoint backend o una función serverless que haga la consulta a OpenWeatherMap.

## Scripts

- `npm.cmd run dev`: inicia el servidor de desarrollo.
- `npm.cmd run build`: genera la versión de producción.
- `npm.cmd run lint`: revisa el código.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.
You can also try [the experimental native React Compiler support in plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md#rust-react-compiler) by using `compiler: true` in the plugin options instead of using the Babel plugin.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
